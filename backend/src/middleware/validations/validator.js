import { validationResult } from "express-validator";
import { param } from "express-validator";

export const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        campo: err.path,
        mensaje: err.msg,
      })),
    });
  }

  next();
};

export const mongoIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Debe enviar un ID")
    .isMongoId()
    .withMessage("El ID no es válido"),
];
