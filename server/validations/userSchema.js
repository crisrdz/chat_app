import Joi from "joi";

const errorMessages = {
  email: {
    "string.empty": "Correo electrónico es requerido",
    "string.email": "Ingrese un correo electrónico válido"
  },
  username: {
    "string.empty": "Nombre de usuario es requerido",
    "string.min": "Nombre de usuario debe tener entre 3 y 16 caracteres",
    "string.max": "Nombre de usuario debe tener entre 3 y 16 caracteres",
    "string.alphanum": "Nombre de usuario debe contener sólo números y letras",
  },
  passwordOne: {
    "string.empty": "Contraseña es requerida",
    "string.min": "Contraseña debe tener, como mínimo, 6 caracteres",
    "string.max": "Contraseña debe tener, como máximo, 24 caracteres",
  },
  passwordTwo: {
    "any.only": "Las contraseñas no coinciden"
  },
  passwordOneUpdate: {
    "string.empty": "Nueva contraseña es requerida",
    "string.min": "Contraseña debe tener, como mínimo, 6 caracteres",
    "string.max": "Contraseña debe tener, como máximo, 24 caracteres",
  },
  passwordOldUpdate: {
    "string.empty": "Contraseña anterior es requerida",
  }
}

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required().messages(errorMessages.email),
  username: Joi.string().alphanum().min(3).max(16).required().messages(errorMessages.username),
  passwordOne: Joi.string().min(6).max(24).required().messages(errorMessages.passwordOne),
  passwordTwo: Joi.string().required().valid(Joi.ref("passwordOne")).messages(errorMessages.passwordTwo),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(16).required().messages(errorMessages.username),
  passwordOne: Joi.string().min(6).max(24).required().messages(errorMessages.passwordOneUpdate),
  passwordTwo: Joi.string().required().valid(Joi.ref("passwordOne")).messages(errorMessages.passwordTwo),
  passwordOld: Joi.string().required().messages(errorMessages.passwordOldUpdate)
});

export default {
  userCreateSchema,
  userUpdateSchema
};
