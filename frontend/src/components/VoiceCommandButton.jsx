import React from "react";
import { Mic } from "lucide-react";
import useVoiceCommands from "../hooks/useVoiceCommands";

export default function VoiceCommandButton() {
  const { transcript, listening } = useVoiceCommands();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 9999,
        backgroundColor: listening ? "#22c55e" : "#3b82f6",
        color: "white",
        borderRadius: "9999px",
        padding: "0.75rem 1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        animation: listening ? "pulse 1s infinite" : "none",
      }}
    >
      <Mic className="w-5 h-5" />
      {listening ? "Escuchando..." : "Voz activa"}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(34,197,94, 0.7);}
            50% { transform: scale(1.1); box-shadow: 0 0 15px rgba(34,197,94, 0.7);}
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(34,197,94, 0.7);}
          }
        `}
      </style>
    </div>
  );
}
