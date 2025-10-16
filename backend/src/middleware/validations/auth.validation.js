import { body } from "express-validator";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Debe ingresar un email")
    .isEmail()
    .withMessage("Debe ser un email válido"),

  body("password").notEmpty().withMessage("Debe ingresar la contraseña"),
];
