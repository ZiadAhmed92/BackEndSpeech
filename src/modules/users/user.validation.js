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
        .pattern(new RegExp('^(?=.*?[A-Z])?(?=.*?[a-z])?(?=.*?[0-9])?(?=.*?[#?!@$%^&*-])?.{5,18}$')),
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
        .pattern(new RegExp('^(?=.*?[A-Z])?(?=.*?[a-z])?(?=.*?[0-9])?(?=.*?[#?!@$%^&*-])?.{5,18}$')),
})
export let changePasswordSchema = Joi.object({
    _id: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])?(?=.*?[a-z])?(?=.*?[0-9])?(?=.*?[#?!@$%^&*-])?.{5,18}$')),
    confirmPassword: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])?(?=.*?[a-z])?(?=.*?[0-9])?(?=.*?[#?!@$%^&*-])?.{5,18}$')),
})