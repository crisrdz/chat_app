import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string()
        .email()
        .required(),
  username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  password: Joi.string()
        .required(),
});

export default userSchema;