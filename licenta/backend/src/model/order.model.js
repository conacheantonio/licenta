const { ORDER_STATUSES } = require('../db/constants')
const { database } = require('../db/db')
const { getDbTimestampFormat, throwNewError } = require('../utils/utils')

class OrderModel {
    async readAll(userId) {
        const result = await database.connection.query(`
            SELECT orders.id, orders.date_created, order_contents.ISBN,
                users.email,
                book_details.title, book_details.author,
                order_statuses.\`status\` AS order_status,
                extend_statuses.\`status\` AS extend_status,
                order_contents.start_date, order_contents.return_date,
                TIMEDIFF(order_contents.return_date, order_contents.start_date) > (
                    IF (extend_statuses.\`status\` = "APPROVED", "672:00:00", "504:00:00")
                ) AS is_late
            FROM order_contents
                LEFT JOIN orders
                ON order_contents.order_id = orders.id
                LEFT JOIN users
                ON orders.user_id = users.id
                LEFT JOIN books
                ON order_contents.ISBN = books.ISBN
                LEFT JOIN book_details
                ON books.book_id = book_details.id
                LEFT JOIN order_statuses
                ON order_contents.order_status_id = order_statuses.id
                LEFT JOIN extend_statuses
                ON order_contents.extension_status_id = extend_statuses.id
            ${userId ? 'WHERE orders.user_id = '  + userId : ''}
            ;`
        )
        return result?.[0] || null
    }

    async readAllForUser(id) {
        const result = await database.connection.query(`
            SELECT orders.id, orders.user_id, orders.date_created, order_contents.ISBN,
                book_details.title, book_details.author,
                order_statuses.\`status\` AS order_status,
                extend_statuses.\`status\` AS extend_status,
                order_contents.start_date, order_contents.return_date,
                TIMEDIFF(order_contents.return_date, order_contents.start_date) > (
                    IF (extend_statuses.\`status\` = "APPROVED", "672:00:00", "504:00:00")
                ) AS is_late
            FROM order_contents
                LEFT JOIN orders
                ON order_contents.order_id = orders.id
                LEFT JOIN books
                ON order_contents.ISBN = books.ISBN
                LEFT JOIN book_details
                ON books.book_id = book_details.id
                LEFT JOIN order_statuses
                ON order_contents.order_status_id = order_statuses.id
                LEFT JOIN extend_statuses
                ON order_contents.extension_status_id = extend_statuses.id
            WHERE orders.user_id = ${id}
            ;`
        )
        return result?.[0] || null
    }

    // count, not read
    async readAllInProgressForUser(id) {
        const result = await database.connection.query(`
            SELECT orders.id, orders.user_id, orders.date_created, order_contents.ISBN,
                book_details.title, book_details.author,
                order_statuses.\`status\` AS order_status,
                extend_statuses.\`status\` AS extend_status,
                order_contents.start_date, order_contents.return_date
            FROM order_contents
                LEFT JOIN orders
                ON order_contents.order_id = orders.id
                LEFT JOIN books
                ON order_contents.ISBN = books.ISBN
                LEFT JOIN book_details
                ON books.book_id = book_details.id
                LEFT JOIN order_statuses
                ON order_contents.order_status_id = order_statuses.id
                LEFT JOIN extend_statuses
                ON order_contents.extension_status_id = extend_statuses.id
            WHERE orders.user_id = ${id} AND
                (order_statuses.\`status\` = "PROCESSING" OR
                    (order_statuses.\`status\` = "APPROVED" AND order_contents.return_date IS NULL)
                )
            ;`
        )
        return result?.[0] || null
    }

    // approve/deny
    updateOrderStatus(id, approved) {
        let result
        if (approved) {
            result = database.connection.query(`
                UPDATE order_contents
                SET
                    order_status_id = (SELECT order_statuses.id FROM order_statuses WHERE order_statuses.\`status\` = "APPROVED"),
                    start_date = "${getDbTimestampFormat()}"
                WHERE order_contents.order_id = ${id}
            ;`)
        } else {
            result = database.connection.query(`
                UPDATE order_contents
                SET
                    order_status_id = (SELECT order_statuses.id FROM order_statuses WHERE order_statuses.\`status\` = "DENIED")
                WHERE order_contents.order_id = ${id}
            ;`)
        }
        return result || null
    }

    // waiting, approved, denied
    updateOrderExtension(id, status) {
        const result = database.connection.query(`
            UPDATE order_contents
            SET
                extension_status_id = (SELECT extend_statuses.id FROM extend_statuses WHERE extend_statuses.\`status\` = "${status}")
            WHERE order_contents.order_id = ${id}
        ;`)
        return result || null
    }

    updateOrderReturnDate(id) {
        const result = database.connection.query(`
            UPDATE order_contents
            SET
                return_date = "${getDbTimestampFormat()}"
            WHERE order_contents.order_id = ${id}
        ;`)
        return result || null
    }

    async createOrder(userId, bookId) {
        const currentDateString = getDbTimestampFormat()
        const result = await database.connection.query(`
            INSERT INTO orders
            SET
                user_id = ${userId},
                date_created = "${currentDateString}"
            ;
            INSERT INTO order_contents
            SET
                order_id = (SELECT orders.id FROM orders WHERE user_id = ${userId} AND date_created = "${currentDateString}" ORDER BY orders.id DESC LIMIT 1),
                ISBN = (SELECT books.ISBN FROM books WHERE books.book_id = ${bookId} LIMIT 1),
                order_status_id = (SELECT order_statuses.id FROM order_statuses WHERE order_statuses.\`status\` = "${ORDER_STATUSES.processing}");
        ;`)
        return result || null
    }
}

const orderModel = new OrderModel()

module.exports = {
    orderModel
}
