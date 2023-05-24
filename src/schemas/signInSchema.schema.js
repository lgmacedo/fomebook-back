import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": 'O campo "email" é obrigatório.',
    "string.empty": 'O campo "email" não pode estar vazio.',
    "string.email": 'O campo "email" deve ter um formato de e-mail válido.',
  }),
  password: Joi.string().required().messages({
    "any.required": 'O campo "password" é obrigatório.',
    "string.empty": 'O campo "password" não pode estar vazio.',
  }),
});

export default signInSchema;