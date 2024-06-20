const express = require('express')
const usersController = express.Router()
const { usersService } = require('../service/users.service')
const { verifyAdmin } = require('../middlewares/verify')
const { validate } = require('../utils/utils')
const { idSchema } = require('../validators/user.validator')

usersController.get('/', verifyAdmin, async (req, res) => {
    const users = await usersService.viewAllUsers()
    res.json({ users })
})

usersController.patch('/makeAdmin', verifyAdmin, async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await usersService.makeUserAdmin(id)
        res.status(204).end()
    } catch (error) {
        console.log('=====', error)
        res.status(error.code).json({ message: error.message })
    }
})

usersController.patch('/approveUser', verifyAdmin, async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await usersService.approveUser(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

usersController.patch('/banUser', verifyAdmin, async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await usersService.banUser(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

module.exports = {
    usersController
}
