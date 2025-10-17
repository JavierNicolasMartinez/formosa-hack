import { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

export default function useVoiceCommands() {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const commands = [
    {
      command: ["ir al inicio", "volver al inicio", "inicio"],
      callback: () => navigate("/"),
    },
    {
      command: ["ir a cursos", "volver al cursos", "cursos"],
      callback: () => navigate("/courses"),
    },
    {
      command: ["ir al panel de estudiante", "abrir dashboard"],
      callback: () => navigate("/dashboard"),
    },
    {
      command: ["ir al panel de tutor", "abrir tutor"],
      callback: () => navigate("/tutor-dashboard"),
    },
    {
      command: ["completar perfil", "ir a completar perfil"],
      callback: () => navigate("/complete-profile"),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    const startListening = () =>
      SpeechRecognition.startListening({ continuous: true, language: "es-AR" });

    startListening();

    return () => SpeechRecognition.stopListening();
  }, [browserSupportsSpeechRecognition]);

  // Reiniciar buffer de audio cada vez que se reconoce un comando
  useEffect(() => {
    if (!transcript) return;

    // Pausa momentánea
    SpeechRecognition.stopListening();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      resetTranscript(); // limpia el transcript
      SpeechRecognition.startListening({ continuous: true, language: "es-AR" });
    }, 5000); // pausa 800ms para limpiar el buffer
  }, [transcript, resetTranscript]);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "es-AR" });
  const stopListening = () => SpeechRecognition.stopListening();

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  };
}
