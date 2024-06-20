const express = require('express')
const orderController = express.Router()
const { orderService } = require('../service/order.service')
const { verifyUserAuthenticated, verifyAdmin } = require('../middlewares/verify')
const { validate, decodeToken } = require('../utils/utils')
const { createOrderSchema, idSchema } = require('../validators/order.validator')
const { USER_ROLES, ACCOUNT_STATUSES } = require('../db/constants')

orderController.get('/', verifyAdmin, async (req, res) => {
    const userId = Number(req?.query?.userId)
    const orders = await orderService.viewAllOrders(!Number.isNaN(userId) ? userId : null)
    res.json(orders)
})

orderController.get('/list', verifyUserAuthenticated, async (req, res) => {
    const tokenValue = req?.headers?.cookie?.split('token=')?.[1]
    const { id, role, status } = decodeToken(tokenValue)
    let orders = []
    if (role === USER_ROLES.reader && status === ACCOUNT_STATUSES.active) {
        orders = await orderService.viewOrdersForUser(id)
    }
    res.json(orders)
})

orderController.post('/', verifyUserAuthenticated, async (req, res) => {
    const { userId, bookIds } = req?.body
    const bookIdsNumbers = bookIds.map((bookId) => Number(bookId))
    try {
        validate(createOrderSchema, { userId, bookIds: bookIdsNumbers })
        await orderService.createNewOrder(userId, bookIdsNumbers)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

orderController.patch('/approve', async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await orderService.approveOrder(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

orderController.patch('/deny', async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await orderService.denyOrder(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

orderController.patch('/approveExtend', async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await orderService.approveExtend(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

orderController.patch('/requestExtend', async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await orderService.requestExtend(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

orderController.patch('/denyExtend', async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await orderService.denyExtend(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

orderController.patch('/returnBook', async (req, res) => {
    const { id } = req?.query
    try {
        validate(idSchema, { id })
        await orderService.returnBook(id)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

module.exports = {
    orderController
}
