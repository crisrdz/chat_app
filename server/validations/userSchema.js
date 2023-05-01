import Joi from "joi";

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  passwordOne: Joi.string().required(),
  passwordTwo: Joi.string().required().valid(Joi.ref("passwordOne")),
});

export const userUpdateSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  passwordOne: Joi.string().required(),
  passwordTwo: Joi.string().required().valid(Joi.ref("passwordOne")),
  passwordOld: Joi.string().required()
});

export default {
  userCreateSchema,
  userUpdateSchema
};
