import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": 'O campo "name" é obrigatório.',
    "string.empty": 'O campo "name" não pode estar vazio.',
  }),
  email: Joi.string().email().required().messages({
    "any.required": 'O campo "email" é obrigatório.',
    "string.empty": 'O campo "email" não pode estar vazio.',
    "string.email": 'O campo "email" deve ter um formato de e-mail válido.',
  }),
  userPicture: Joi.string().required().messages({
    "any.required": 'O campo "userPicture" é obrigatório.',
    "string.empty": 'O campo "userPicture" não pode estar vazio.',
  }),
  bio: Joi.string().required().messages({
    "any.required": 'O campo "bio" é obrigatório.',
    "string.empty": 'O campo "bio" não pode estar vazio.',
  }),
  password: Joi.string().required().messages({
    "any.required": 'O campo "password" é obrigatório.',
    "string.empty": 'O campo "password" não pode estar vazio.',
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.required": 'O campo "confirmPassword" é obrigatório.',
    "string.empty": 'O campo "confirmPassword" não pode estar vazio.',
    "any.only": 'O campo "confirmPassword" deve ser igual ao campo "password".',
  }),
});

export default signUpSchema;