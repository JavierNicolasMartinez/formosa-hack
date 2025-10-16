import { body, param } from "express-validator";
import UserModel from "../../models/user.model.js";

export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Debe ingresar un nombre de usuario")
    .isString()
    .withMessage("El nombre de usuario debe ser texto")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) throw new Error("El nombre de usuario ya está en uso");
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("Debe ingresar un email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) throw new Error("El email ya está registrado");
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage("La contraseña debe tener mayúscula, minúscula y número"),
];

export const updateProfileValidation = [
  body("profile.firstName")
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("profile.lastName")
    .optional()
    .isString()
    .withMessage("El apellido debe ser texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("profile.biography")
    .optional()
    .isString()
    .withMessage("La biografía debe ser texto")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("Debe ser una URL válida")
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/)
    .withMessage(
      "El avatar debe ser una imagen válida (jpg, jpeg, png, gif, webp)",
    ),

  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("Debe ser una fecha válida (ISO8601)")
    .toDate(),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe enviar un ID")
    .isMongoId()
    .withMessage("ID inválido")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) throw new Error("Usuario no encontrado");
      return true;
    }),

  body("username")
    .optional()
    .isString()
    .withMessage("El nombre de usuario debe ser texto")
    .isLength({ min: 3, max: 20 })
    .withMessage("Debe tener entre 3 y 20 caracteres")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({
        username: value,
        _id: { $ne: req.params.id },
      });
      if (user) throw new Error("El nombre de usuario ya está en uso");
      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({
        email: value,
        _id: { $ne: req.params.id },
      });
      if (user) throw new Error("El email ya está registrado");
      return true;
    }),
];
