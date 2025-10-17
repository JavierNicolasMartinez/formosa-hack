export const authorizeRoles = (roles = []) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ ok: false, message: "No autenticado" });

    if (!roles.includes(req.user.role))
      return res.status(403).json({ ok: false, message: "Acceso denegado" });

    next();
  };
};

// Middleware específico para estudiantes
export const requireStudent = authorizeRoles(["student"]);
