const express = require('express')
const booksController = express.Router()
const { verifyAdmin, verifyUserAuthenticated } = require('../middlewares/verify')
const { booksService } = require('../service/books.service')
const { validate, decodeToken } = require('../utils/utils')
const { addBookSchema, ISBNSchema, changeDescriptionSchema, increaseStockSchema } = require('../validators/book.validator')
const { USER_ROLES } = require('../db/constants')

booksController.get('/', verifyUserAuthenticated, async (req, res) => {
    const key = req?.query?.key
    const value = req?.query?.value
    const tokenValue = req?.headers?.cookie?.split('token=')?.[1]
    const { role } = decodeToken(tokenValue)
    let books
    if (role === USER_ROLES.admin) {
        books = await booksService.viewAllIndividual(key, value)
    } else if (role === USER_ROLES.reader) {
        books = await booksService.viewAllBooksGeneral(key, value)
    }
    res.json({ message: books }) // try catch
})

// add new book
booksController.post('/', verifyAdmin, async (req, res) => {
    const { ISBN, title, author, description, year, pages, genre } = req?.body
    try {
        validate(addBookSchema, { ISBN, title, author, description, year, pages, genre })
        await booksService.addBook(ISBN, title, author, description, year, pages, genre)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

// increase stock
booksController.post('/increaseBookStock', verifyAdmin, async (req, res) => {
    const idQuery = req?.query?.id
    const id = Number(idQuery)
    const { ISBN, year, pages } = req?.body
    try {
        validate(increaseStockSchema, { id, ISBN, year, pages })
        await booksService.addISBN(id, ISBN, year, pages)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

// change description
booksController.patch('/changeDescription', verifyAdmin, (req, res) => {
    const idQuery = req?.query?.id
    const id = Number(idQuery)
    const { description } = req?.body
    try {
        validate(changeDescriptionSchema, { id, description })
        booksService.updateDescription(id, description)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

// remove book
booksController.delete('/', verifyAdmin, async (req, res) => {
    const { ISBN } = req?.query
    try {
        validate(ISBNSchema, { ISBN })
        await booksService.removeBook(ISBN)
        res.status(204).end()
    } catch (error) {
        res.status(error.code).json({ message: error.message })
    }
})

module.exports = {
    booksController
}
