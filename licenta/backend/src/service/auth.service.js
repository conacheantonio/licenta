const bcrypt = require('bcrypt')
const saltRounds = 10

const { throwNewError } = require('../utils/utils')
const { userModel } = require('../model/user.model')
const { generateTokenAfterLogin } = require('../utils/utils')

const internalServerErrorMessage = 'Ceva nu a mers bine pe server. Va rugam sa reveniti mai tarziu...'

class AuthService {
    async login(email, password) {
        const lowerCaseEmail = email.toLowerCase()
        const foundUser = await userModel.readOneByEmail(lowerCaseEmail)

        if (!foundUser) {
            throwNewError('Utilizatorul nu a fost gasit...', 404)
        }

        let match
        try {
            match = await bcrypt.compare(password, foundUser.password)
        } catch (e) { 
            throwNewError(internalServerErrorMessage, 500) 
        }
        if (!match) {
            throwNewError('Parola incorecta...', 401)
        }

        return {
            token: generateTokenAfterLogin(foundUser.id, foundUser.role, foundUser.status),
            role: foundUser.role,
            status: foundUser.status
        }
    }

    async register(nameSurname, email, password, phoneNumber, pin) {
        const lowerCaseEmail = email.toLowerCase()

        let hashedPassword, hashedPin
        try {
            hashedPassword = await bcrypt.hash(password, saltRounds)
            hashedPin = await bcrypt.hash(pin, saltRounds)
        } catch (e) {
            console.log(e.message)
            throwNewError(internalServerErrorMessage, 500) // Internal Server Error
        }

        try {
            await userModel.createOne({
                nameSurname,
                email: lowerCaseEmail,
                phoneNumber,
                password: hashedPassword,
                pin: hashedPin,
            })
        } catch (e) {
            throwNewError('Emailul sau numarul de telefon sunt deja asociate unui cont... ', 409)
        }

        const user = await userModel.readOneByEmail(lowerCaseEmail)

        return {
            token: generateTokenAfterLogin(user.id, user.role, user.status),
            role: user.role,
            status: user.status
        }
    }

    async resetPassword(email, newPassword, phoneNumber, pin) {
        const lowerCaseEmail = email.toLowerCase()
        const foundUser = await userModel.readOneByEmail(lowerCaseEmail)

        if (!foundUser || foundUser.phone !== phoneNumber || !(await bcrypt.compare(pin, foundUser.pin))) {
            throwNewError('Utilizatorul nu exista...', 404)
            return
        }

        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(newPassword, saltRounds)
        } catch (e) {
            console.log(e.message)
            throwNewError(internalServerErrorMessage, 500)
        }

        await userModel.updateOnePassword({
            email: lowerCaseEmail,
            password: hashedPassword
        })

        return {
            token: generateTokenAfterLogin(foundUser.id, foundUser.role, foundUser.status),
            role: foundUser.role,
            status: foundUser.status
        }
    }

    async checkForChanges(id, role, status) {
        const foundUser = await userModel.readOne(id)
        const newData = {}

        if (foundUser.role !== role) {
            newData.newRole = foundUser.role
        }
        if (foundUser.status !== status) {
            newData.newStatus = foundUser.status
        }

        return newData
    }
}

const authService = new AuthService()

module.exports = {
    authService
}
