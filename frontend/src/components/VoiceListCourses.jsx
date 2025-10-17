// src/components/VoiceListCourses.jsx
import useVoiceListCourses from "../hooks/useVoiceListCourses";

export default function VoiceListCourses({ courses, autoStart = false }) {
  const { activateVoice, listening } = useVoiceListCourses(courses, {
    autoStart,
  });

  return (
    <button onClick={activateVoice}>
      {listening ? "🎙️ Voz activada" : "Activar voz"}
    </button>
  );
}
