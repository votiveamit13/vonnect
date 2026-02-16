import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required(),  
  email: Joi.string()
    .email()
    .required(),

  username: Joi.string().required(),

  phone: Joi.string().optional(),

  password: Joi.string()
    .min(6)
    .max(50)
    .required(),

  role_id: Joi.number()
    .integer()
    .valid(1,2,3,4)   // adjust roles as needed
    .default(2)
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
