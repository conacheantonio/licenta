const jwt = require('jsonwebtoken')
const { USER_ROLES } = require('../db/constants')
const jwtKey = 'this_is_a_random_private_key'

function verifyUserAuthenticated(req, res, next) {
    const tokenValue = req?.headers?.cookie?.split('token=')?.[1]
    if (tokenValue) {
        const decodedToken = jwt.decode(tokenValue, jwtKey)
        if (decodedToken?.data?.role) {
            next()
            return
        }
    }
    res.status(403).json({ message: 'user not authorized to view this' })
}

function verifyAdmin(req, res, next) {
    const tokenValue = req?.headers?.cookie?.split('token=')?.[1]
    if (tokenValue) {
        const decodedToken = jwt.decode(tokenValue, jwtKey)
        if (decodedToken?.data?.role === USER_ROLES.admin) {
            next()
            return
        }
    }
    res.status(403).json({ message: 'user not authorized to view this' })
}

module.exports = {
    verifyUserAuthenticated,
    verifyAdmin
}
