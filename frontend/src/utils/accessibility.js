// Lee un flag en localStorage para saber si el estudiante usa accesibilidad por voz
export function isBlindStudent() {
  try {
    return localStorage.getItem("al:isBlindStudent") === "true";
  } catch {
    return false;
  }
}

// Opcional: setters por si te sirven en el registro
export function setBlindStudent(enabled) {
  try {
    localStorage.setItem("al:isBlindStudent", enabled ? "true" : "false");
  } catch {}
}
