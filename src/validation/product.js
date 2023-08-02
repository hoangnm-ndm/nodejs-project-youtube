import Joi from "joi";

export const productValid = Joi.object({
  name: Joi.string().required().min(6).max(255),
  price: Joi.number().required(),
  description: Joi.string(),
});
