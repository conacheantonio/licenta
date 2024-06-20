const { orderModel } = require('../model/order.model')
const { userModel } = require('../model/user.model')
const { throwNewError } = require('../utils/utils')

class UsersService {
    viewAllUsers() {
        return userModel.readAll()
    }

    async makeUserAdmin(id) {
        console.log('---', id)
        const ordersInProgress = await orderModel.readAllForUser(id)
        console.log(ordersInProgress)
        if (ordersInProgress?.length) {
            throwNewError('Utilizatorul are comenzi active sau in procesare si nu poate deveni admin...', 409)
        }

        await userModel.updateOneRole(id)
        const user = await userModel.readOne(id)
        return user
    }

    async approveUser(id) {
        await userModel.updateOneStatusApprove(id)
        const user = await userModel.readOne(id)
        return user
    }

    async banUser(id) {
        await userModel.updateOneStatusBan(id)
        const user = await userModel.readOne(id)
        return user
    }
}

const usersService = new UsersService()

module.exports = {
    usersService
}
