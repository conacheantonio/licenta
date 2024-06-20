const jwt = require('jsonwebtoken')

const generic500 = {
    errorMessage: 'Ceva nu a mers bine pe server. Te rugam sa revii mai tarziu...',
    statusCode: 500
}

function throw500() {
    throwNewError(generic500)
}

function throwNewError(errorMessage, statusCode = 500) {
    const error = new Error(errorMessage)
    error.code = statusCode
    throw error
}

function validate(schema, objectToValidate) {
    const validation = schema.validate(objectToValidate)
    validation?.error && throwNewError(validation.error?.details[0]?.message, 400)
}

function getDbTimestampFormat() {
    return new Date().toISOString().split('.')[0].replace('T', ' ')
}

const jwtKey = 'this_is_a_random_private_key'

function generateTokenAfterLogin(id, role, status) {
    const expirationDate = (Date.now() / 1000) + (400 * 24 * 60 * 60)

    return jwt.sign({

        exp: expirationDate,
        data: {
            id: id,
            role: role,
            status: status
        }
    }, jwtKey)
}

function decodeToken(tokenValue) {
    return jwt.decode(tokenValue, jwtKey)?.data
}

module.exports = {
    throwNewError,
    validate,
    getDbTimestampFormat,
    throw500,
    generateTokenAfterLogin,
    decodeToken
}
