import Joi from "joi";

export let signUpSchema = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    gender: Joi.string()
        .alphanum()
        .min(3)
        .max(8)
        .required(),
    phone: Joi.string().regex(/^(002)?01[0125][0-9]{8}$/).required(),
    birthday: Joi.string().required(),
    email: Joi.string()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmEmail: Joi.boolean().default(false),
})
export let updateSchema = Joi.object({
    _id: Joi.string()
        .min(3)
        .max(30)
        .required(),
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    gender: Joi.string()
        .alphanum()
        .min(3)
        .max(8)
        .required(),
    phone: Joi.string().regex(/^(002)?01[0125][0-9]{8}$/).required(),
    birthday: Joi.string().required(),
})

export let signInSchema = Joi.object({
    email: Joi.string()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})
export let changePasswordSchema = Joi.object({
    _id: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})