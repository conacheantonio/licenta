const Joi = require('joi')

const emailSchema = Joi.object({
    email: Joi.string().email().required()
})

const idSchema = Joi.object({
    id: Joi.number().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required() // min 2 for demo purposes
})

const registerSchema = Joi.object({
    nameSurname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(), // min 2 for demo purposes
    confirmedPassword: Joi.string().valid(Joi.ref('password')).required(),
    phoneNumber: Joi.string().length(10).required(), // 0745 123 456 - assume only RO mobile
    pin: Joi.string().length(4).regex(/[0-9]\w+/i).required() // 0000 to 9999
})

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(2).max(30).required(), // min 2 for demo purposes
    confirmedPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
    phoneNumber: Joi.string().length(10).required(), // 0745 123 456 - assume only RO mobile
    pin: Joi.string().length(4).regex(/[0-9]\w+/i).required() // 0000 to 9999
})

module.exports = {
    emailSchema,
    idSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema
}
