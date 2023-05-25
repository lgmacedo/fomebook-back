import Joi from "joi";

const postSchema = Joi.object({
  picture: Joi.string().required().messages({
    "any.required": 'O campo "foto" é obrigatório.',
    "string.empty": 'O campo "foto" não pode estar vazio.',
  }),
  description: Joi.string().required().messages({
    "any.required": 'O campo "descrição" é obrigatório.',
    "string.empty": 'O campo "descrição" não pode estar vazio.',
  }),
});

export default postSchema;