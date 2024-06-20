const Joi = require('joi')

const idSchema = Joi.object({
    id: Joi.number().required()
})

const createOrderSchema = Joi.object({
    userId: Joi.number().required(),
    bookIds: Joi.array().min(1).max(3).items(Joi.number())
})

module.exports = {
    createOrderSchema,
    idSchema
}
