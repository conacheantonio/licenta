const { ACCOUNT_STATUSES, USER_ROLES } = require('../db/constants')
const { database } = require('../db/db')
const { throw500 } = require('../utils/utils')

class UserModel {
    async readAll() {
        try {
            const result = await database.connection.query(`
            SELECT users.id, users.email, users.name_surname, users.phone, roles.\`role\`, account_statuses.\`status\`,
                SUM(
                    TIMEDIFF(order_contents.return_date, order_contents.start_date) > (
                        IF (extend_statuses.\`status\` = "APPROVED", "672:00:00", "504:00:00")
                )) AS penalties
            FROM users
                LEFT JOIN roles
                ON users.role_id = roles.id
                LEFT JOIN account_statuses
                ON users.status_id = account_statuses.id
                LEFT JOIN orders
                ON orders.user_id = users.id
                LEFT JOIN order_contents
                ON order_contents.order_id = orders.id
                LEFT JOIN extend_statuses
                ON order_contents.extension_status_id = extend_statuses.id
            GROUP BY users.id;
            `)
            return result?.[0] || null
        } catch(e) { // if a simple read fails then probably db is dead
            throw500()
        }
    }

    async readOne(id) {
        const result = await database.connection.query(`
            SELECT users.id, users.email, users.phone, users.pin, users.password, roles.\`role\`, account_statuses.\`status\`
            FROM users
                LEFT JOIN roles
                ON users.role_id = roles.id
                LEFT JOIN account_statuses
                ON users.status_id = account_statuses.id
            WHERE users.id = ${id};`
        )
        return result?.[0]?.[0] || null
    }

    async readOneByEmail(email) {
        const result = await database.connection.query(`
            SELECT users.id, users.email, users.phone, users.pin, users.password, roles.\`role\`, account_statuses.\`status\`
            FROM users
                LEFT JOIN roles
                ON users.role_id = roles.id
                LEFT JOIN account_statuses
                ON users.status_id = account_statuses.id
            WHERE users.email = "${email}";`
        )
        return result?.[0]?.[0] || null
    }

    async createOne({ nameSurname, email, phoneNumber, password, pin }) {
        const result = await database.connection.query(`
            INSERT INTO users (name_surname, email, phone, \`password\`, pin, role_id, status_id)
            VALUES ("${nameSurname}", "${email}", "${phoneNumber}", "${password}", "${pin}",
                (SELECT roles.id FROM roles WHERE roles.\`role\` = "${USER_ROLES.reader}"),
                (SELECT account_statuses.id FROM account_statuses WHERE account_statuses.\`status\` = "${ACCOUNT_STATUSES.waiting}"));`)
        return result || null
    }

    async updateOnePassword({ email, password }) {
        const result = await database.connection.query(`
            UPDATE users
            SET password = "${password}"
            WHERE email = "${email}";`
        )
        return result || null
    }

    async updateOneRole(id) {
        const result = await database.connection.query(`
            UPDATE users
            SET role_id = (SELECT roles.id FROM roles WHERE roles.\`role\` = "${USER_ROLES.admin}")
            WHERE id = ${id};`
        )
        return result || null
    }

    async updateOneStatusApprove(id) {
        const result = await database.connection.query(`
            UPDATE users
            SET status_id = (SELECT account_statuses.id FROM account_statuses WHERE account_statuses.\`status\` = "${ACCOUNT_STATUSES.active}")
            WHERE id = ${id};`
        )
        return result || null
    }

    async updateOneStatusBan(id) {
        const result = await database.connection.query(`
            UPDATE users
            SET status_id = (SELECT account_statuses.id FROM account_statuses WHERE account_statuses.\`status\` = "${ACCOUNT_STATUSES.banned}")
            WHERE id = ${id};`
        )
        return result || null
    }
}

const userModel = new UserModel()

module.exports = {
    userModel
}
