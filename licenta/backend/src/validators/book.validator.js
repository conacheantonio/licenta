const Joi = require('joi')

const addBookSchema = Joi.object({
    ISBN: Joi.number().min(9_780_000_000_000).max(9_799_999_999_999).required(), // https://en.wikipedia.org/wiki/ISBN - assume only 13 digit standard
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.number().min(2007).max(new Date(Date.now()).getFullYear()).required(), // 13 digit standard was adopted in 2007
    pages: Joi.number().min(1).max(50000).required(),
    genre: Joi.string().required()
})

const ISBNSchema = Joi.object({
    ISBN: Joi.number().min(9_780_000_000_000).max(9_799_999_999_999).required()
})

const changeDescriptionSchema = Joi.object({
    id: Joi.number().required(),
    description: Joi.string().required()
})

const increaseStockSchema = Joi.object({
    id: Joi.number().required(),
    ISBN: Joi.number().min(9_780_000_000_000).max(9_799_999_999_999).required(),
    year: Joi.number().min(2007).max(new Date(Date.now()).getFullYear()).required(),
    pages: Joi.number().min(1).max(50000).required(),
})

module.exports = {
    addBookSchema,
    ISBNSchema,
    changeDescriptionSchema,
    increaseStockSchema
}
