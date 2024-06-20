const { EXTEND_STATUSES } = require('../db/constants')
const { orderModel } = require('../model/order.model')
const { throwNewError, throw500 } = require('../utils/utils')

class OrderService {
    viewAllOrders(userId) {
        return orderModel.readAll(userId)
    }

    async viewOrdersForUser(id) {
        return await orderModel.readAllForUser(id)
    }

    async createNewOrder(userId, bookIds) {
        const ordersInProgress = await orderModel.readAllInProgressForUser(userId)
        if (ordersInProgress.length) {
            throwNewError('Comanda nu poate fi plasata, alta comanda este activa sau in procesare', 409)
        }
        const promises = bookIds.map((bookId) => orderModel.createOrder(userId, bookId))
        try {
            await Promise.all(promises)
        } catch (e) {
            throw500()
        }
    }

    approveOrder(id) {
        orderModel.updateOrderStatus(id, true)
    }

    denyOrder(id) {
        orderModel.updateOrderStatus(id, false)
    }

    requestExtend(id) {
        orderModel.updateOrderExtension(id, EXTEND_STATUSES.processing)
    }

    approveExtend(id) {
        orderModel.updateOrderExtension(id, EXTEND_STATUSES.approved)
    }

    denyExtend(id) {
        orderModel.updateOrderExtension(id, EXTEND_STATUSES.denied)
    }

    returnBook(id) {
        orderModel.updateOrderReturnDate(id)
    }
}

const orderService = new OrderService()

module.exports = {
    orderService
}
