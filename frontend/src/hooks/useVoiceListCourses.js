// src/hooks/useVoiceListCourses.js
import { useEffect, useMemo, useRef, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function useVoiceListCourses(
  courses = [],
  { locale = "es-AR", autoStart = true } = {},
) {
  const lockRef = useRef(false);

  // ---- TTS robusto ----
  const voiceRef = useRef(null);
  const voicesReadyRef = useRef(false);
  const ttsQueueRef = useRef([]);
  const processingRef = useRef(false);

  const log = (...args) => console.log("[VoiceListCourses]", ...args);

  const pickVoice = useCallback((voices, lang) => {
    if (!voices?.length) return null;
    // exacta
    let v = voices.find((v) => v.lang?.toLowerCase() === lang.toLowerCase());
    if (v) return v;
    // preferidas
    const prefs = ["es-AR", "es-ES", "es-MX", "es-419", "es-US"];
    for (const pref of prefs) {
      v = voices.find((vo) =>
        vo.lang?.toLowerCase().startsWith(pref.toLowerCase()),
      );
      if (v) return v;
    }
    // cualquier español
    v = voices.find((vo) => vo.lang?.toLowerCase().startsWith("es"));
    if (v) return v;
    // fallback
    return voices[0] || null;
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      console.warn("[VoiceListCourses] speechSynthesis no disponible");
      return;
    }

    const load = () => {
      const list = window.speechSynthesis.getVoices();
      if (list?.length) {
        voiceRef.current = pickVoice(list, locale);
        voicesReadyRef.current = true;
        log(
          "Voces cargadas:",
          list.length,
          "→ usando:",
          voiceRef.current?.name,
          voiceRef.current?.lang,
        );
      } else {
        log("Aún sin voces, esperando voiceschanged…");
      }
    };

    load();
    const onVoices = () => load();
    window.speechSynthesis.addEventListener("voiceschanged", onVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
    };
  }, [locale, pickVoice]);

  const processQueue = useCallback(() => {
    if (processingRef.current) return;
    const item = ttsQueueRef.current.shift();
    if (!item) return;

    processingRef.current = true;

    const u = new SpeechSynthesisUtterance(item.text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.lang = voiceRef.current?.lang || locale;
    u.rate = 1.0;
    u.pitch = 1.0;
    u.volume = 1.0;

    u.onstart = () => log("TTS ▶︎", item.text);
    u.onend = () => {
      processingRef.current = false;
      processQueue();
    };
    u.onerror = (e) => {
      console.error("[VoiceListCourses] TTS error:", e);
      processingRef.current = false;
      processQueue();
    };

    window.speechSynthesis.speak(u);
  }, [locale]);

  const speak = useCallback(
    (text) => {
      if (!("speechSynthesis" in window) || !text?.trim()) {
        console.warn("[VoiceListCourses] TTS no disponible o texto vacío");
        return;
      }
      // No cancelamos para no interrumpir utterances anteriores; encolamos
      ttsQueueRef.current.push({ text: text.trim() });
      processQueue();
    },
    [processQueue],
  );

  // ---- Bloqueo corto (evita que el TTS vuelva a disparar el mismo comando) ----
  const lock = (ms = 1500) => {
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), ms);
  };

  // ---- Acción principal: listar cursos ----
  const listCourses = useCallback(() => {
    if (lockRef.current) {
      log("Ignorado (lock activo para evitar eco)");
      return;
    }
    lock();

    const titles = courses.map((c) => c.title);
    log("Comando detectado: LISTAR CURSOS →", titles);

    const message = titles.length
      ? `Cursos: ${titles.join(", ")}.`
      : "No hay cursos cargados.";

    // Si aún no hay voces, intentá hablar igual (Chrome usa voz por defecto)
    if (!voicesReadyRef.current) {
      log("Voces aún no listas, intento hablar con voz por defecto…");
    }
    speak(message);
  }, [courses, speak]);

  // ---- ÚNICO comando (variantes) ----
  const commands = useMemo(
    () => [
      {
        command: [
          "mostrar cursos",
          "mostrar los cursos",
          "listar cursos",
          "lista de cursos",
          "ver cursos",
          "ver la lista de cursos",
          "qué cursos hay",
          "que cursos hay",
          "mostra cursos",
        ],
        callback: listCourses,
      },
    ],
    [listCourses],
  );

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition({ commands, clearCommandsOnListen: false });

  // ---- Arranque STT ----
  useEffect(() => {
    log(
      "Soporte STT:",
      browserSupportsSpeechRecognition,
      "| autoStart:",
      autoStart,
      "| locale:",
      locale,
    );
    if (!browserSupportsSpeechRecognition) {
      console.warn(
        "[VoiceListCourses] Tu navegador no soporta reconocimiento de voz",
      );
      return;
    }
    if (!autoStart) return;

    log("startListening()");
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: locale,
    });

    return () => {
      try {
        log("stopListening() (cleanup)");
        SpeechRecognition.stopListening();
      } catch {}
    };
  }, [browserSupportsSpeechRecognition, autoStart, locale]);

  // ---- Logs útiles ----
  useEffect(() => {
    log("listening:", listening);
  }, [listening]);
  useEffect(() => {
    if (interimTranscript) log("📝 Interim:", interimTranscript);
  }, [interimTranscript]);
  useEffect(() => {
    if (finalTranscript) log("🎯 Final:", finalTranscript);
  }, [finalTranscript]);

  // ---- Mantener transcript corto ----
  useEffect(() => {
    const id = setInterval(() => {
      if (transcript) {
        log("resetTranscript() (higiene)");
        resetTranscript();
      }
    }, 2000);
    return () => clearInterval(id);
  }, [transcript, resetTranscript]);

  // ---- Activación manual (recomendado para “gesto de usuario”) ----
  const activateVoice = () => {
    log("activateVoice() → startListening()");
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: locale,
    });

    // Decí algo cortito para “desbloquear” audio en algunos navegadores
    setTimeout(() => {
      speak("Voz activada");
    }, 120);
  };

  return { activateVoice, listening, transcript };
}
