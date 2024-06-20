const express = require('express')
const app = express()
const cors = require('cors')

const { database } = require('./db/db')
const { authController } = require('./controller/auth.controller')
const { usersController } = require('./controller/users.controller')
const { booksController } = require('./controller/books.controller')
const { orderController } = require('./controller/order.controller')

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' 
}))
app.use(express.json())

app.use('/', authController)
app.use('/users', usersController)
app.use('/books', booksController)
app.use('/order', orderController)

app.listen(5000, async () => {
    try {
        await database.init()
        await database.populate()
        console.log('server started on port 5000, listening...')
    } catch (e) {
        console.log('DB error:', e.message)
    }
})

