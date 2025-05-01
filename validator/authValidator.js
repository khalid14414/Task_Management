import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().required().min(3),
  password: Joi.string().required().min(5),
});

