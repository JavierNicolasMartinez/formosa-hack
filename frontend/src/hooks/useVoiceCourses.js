import { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

export default function useVoiceCourses(courses) {
  const navigate = useNavigate();
  const speakingRef = useRef(false);
  const silenceTimeoutRef = useRef(null);
  const [buffer, setBuffer] = useState("");

  const speak = (text) => {
    speechSynthesis.cancel();
    speakingRef.current = true;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-AR";
    utterance.onend = () => {
      speakingRef.current = false;
    };
    speechSynthesis.speak(utterance);
  };

  // Comandos a ejecutar según el buffer
  const processBuffer = (text) => {
    const lower = text.toLowerCase();

    // Mostrar cursos
    if (
      lower.includes("mostrar cursos") ||
      lower.includes("cursos") ||
      lower.includes("lista")
    ) {
      const courseList = courses.map((c) => c.title).join(", ");
      speak(
        `Los cursos disponibles son: ${courseList}. Puedes decir "entrar a" seguido del nombre del curso para acceder.`,
      );
    }

    // Entrar a un curso
    const entrarMatch = lower.match(
      /entrar a (.+)|abrir curso (.+)|quiero entrar a (.+)/,
    );
    if (entrarMatch) {
      const courseName = entrarMatch[1] || entrarMatch[2] || entrarMatch[3];
      const course = courses.find((c) =>
        c.title.toLowerCase().includes(courseName.trim()),
      );
      if (course) {
        speak(`Accediendo al curso ${course.title}`);
        navigate(`/courses/${course.id}`);
      } else {
        speak(`No encontré ningún curso llamado ${courseName}`);
      }
    }

    // Cortar
    if (
      lower.includes("cortar") ||
      lower.includes("detener") ||
      lower.includes("parar")
    ) {
      speechSynthesis.cancel();
      speakingRef.current = false;
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands: [], clearCommandsOnListen: false });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Tu navegador no soporta reconocimiento de voz");
      return;
    }

    // Empezar a escuchar continuamente
    SpeechRecognition.startListening({ continuous: true, language: "es-AR" });

    return () => SpeechRecognition.stopListening();
  }, [browserSupportsSpeechRecognition]);

  // Acumular transcript en buffer y procesar tras silencio
  useEffect(() => {
    if (!transcript) return;

    // Acumula en buffer
    setBuffer((prev) => (prev ? prev + " " + transcript : transcript));

    // Resetear timeout
    clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(() => {
      if (buffer) {
        console.log("Procesando buffer:", buffer);
        processBuffer(buffer);
        setBuffer(""); // limpiar buffer después de procesar
        resetTranscript();
      }
    }, 3000); // espera 3 segundos de silencio antes de procesar
  }, [transcript, buffer, resetTranscript]);

  return { transcript, listening, speaking: speakingRef.current };
}
