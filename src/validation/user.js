import Joi from "joi";

export const signUpValid = Joi.object({
  name: Joi.string().required().min(3).messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Email is invalid",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "confirmPassword is not matching",
    "string.empty": "confirmPassword is not empty",
    "any.required": "confirmPassword is required",
  }),
});

export const signInValid = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Email is invalid",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});
