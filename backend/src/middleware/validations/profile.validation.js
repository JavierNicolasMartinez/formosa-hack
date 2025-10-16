import { body } from "express-validator";

export const createProfileValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("Debe ingresar un nombre")
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar 100 caracteres"),

  body("last_name")
    .notEmpty()
    .withMessage("Debe ingresar un apellido")
    .isString()
    .withMessage("El apellido debe ser texto")
    .isLength({ max: 100 })
    .withMessage("El apellido no puede superar 100 caracteres"),

  body("bio")
    .notEmpty()
    .withMessage("Debe ingresar una biografía")
    .isString()
    .withMessage("La biografía debe ser texto")
    .isLength({ max: 256 })
    .withMessage("La biografía no puede superar 256 caracteres"),
];
