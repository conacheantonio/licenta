const express = require('express')
const authController = express.Router()
const { authService } = require('../service/auth.service')
const { validate, decodeToken } = require('../utils/utils')
const { loginSchema, registerSchema, resetPasswordSchema } = require('../validators/user.validator')

authController.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        validate(loginSchema, { email, password })
        const data = await authService.login(email, password)
        res.status(201).json(data)
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

authController.post('/register', async (req, res) => {
    const { nameSurname, email, password, confirmedPassword, phoneNumber, pin } = req.body
    try {
        validate(registerSchema, { nameSurname, email, password, confirmedPassword, phoneNumber, pin })
        const data = await authService.register(nameSurname, email, password, phoneNumber, pin)
        res.status(201).json(data)
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

authController.patch('/resetPassword', async (req, res) => {
    const { email, newPassword, confirmedPassword, phoneNumber, pin } = req.body
    try {
        validate(resetPasswordSchema, { email, newPassword, confirmedPassword, phoneNumber, pin })
        const data = await authService.resetPassword(email, newPassword, phoneNumber, pin)
        res.status(200).json(data)
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

authController.get('/', (req, res) => {
    const tokenValue = req?.headers?.cookie?.split('token=')?.[1]
    const { id, role, status } = decodeToken(tokenValue)
    const { newRole, newStatus } = authService.checkForChanges(id, role, status)
    if (newRole || newStatus) {
        const expirationDate = (Date.now() / 1000) + (400 * 24 * 60 * 60)
        res.status(200).json({
            token: generateTokenAfterLogin(id, newRole || role, expirationDate, newStatus || status),
            role: newRole || role,
            expirationDate: expirationDate,
            status: newStatus || status,
            id: id
        })
        return
    }
    res.json({
        id: id,
        role: newRole || role || '',
        status: newStatus || status || ''
    })
})

module.exports = {
    authController
}
