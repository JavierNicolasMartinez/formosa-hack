import { verifyToken } from "../helpers/jwt.helper.js";
import UserModel from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ ok: false, message: "No token" });

    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ ok: false, message: "Usuario no encontrado" });

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ ok: false, message: "Token inválido" });
  }
};
