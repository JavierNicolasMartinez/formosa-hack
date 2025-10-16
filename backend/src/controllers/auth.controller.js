import UserModel from "../models/user.model.js";
import { matchedData } from "express-validator";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    data.password = await hashPassword(data.password);

    const user = await UserModel.create(data);

    res.status(201).json({
      ok: true,
      message: "Usuario creado",
      data: { id: user._id, email: user.email },
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const user = await UserModel.findOne({ email: data.email });

    if (!user)
      return res.status(401).json({ ok: false, message: "Email invalido" });

    const valid = await comparePassword(data.password, user.password);
    if (!valid)
      return res
        .status(401)
        .json({ ok: false, message: "Contraseña incorrecta" });

    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({
        ok: true,
        message: "Login exitoso",
        data: { id: user._id, username: user.username, email: user.email },
      });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ ok: true, message: "Logout exitoso" });
};

export const getProfile = async (req, res) => {
  res.status(200).json({ ok: true, data: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const updated = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $set: { profile: data } },
      { new: true, select: "-password" },
    );

    res.status(200).json({ ok: true, data: updated });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

export const verify = async (req, res) => {
  try {
    // Ya viene del middleware authenticate, sin contraseña
    const user = req.user;

    return res.status(200).json({
      ok: true,
      message: "Sesión activa",
      data: user,
    });
  } catch (error) {
    console.error("Error en verify:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};
