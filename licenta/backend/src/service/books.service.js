const { bookModel } = require('../model/book.model')
const { throwNewError, throw500 } = require('../utils/utils')

class BooksService {
    viewAllIndividual(key, value) {
        return bookModel.readAllIndividual(key, value)
    }

    viewAllBooksGeneral(key, value) {
        return bookModel.readAllGeneral(key, value)
    }

    viewBook(ISBN) {
        return bookModel.readOneByISBN(ISBN)
    }

    viewBooksFromGenre(genre) {
        return bookModel.readAllByGenre(genre)
    }

    async addBook(ISBN, title, author, description, year, pages, genre) {
        try {
            const bookId = await bookModel.readBookIdFromDetails(title, author)
            if (!bookId) {
                await bookModel.creatOneDetails(title, author, description, genre)
            }
            await bookModel.createOneISBN(title, author, ISBN, year, pages)
        } catch (e) {
            throwNewError(`Cartea cu ISBN-ul ${ISBN} exista deja...`, 409)
        }
    }

    async addISBN(id, ISBN, year, pages) {
        try {
            await bookModel.increaseQuantity(id, ISBN, year, pages)
        } catch (e) {
            throwNewError(`Cartea cu ISBN-ul ${ISBN} exista deja...`, 409)
        }
    }

    async removeBook(ISBN) {
        let res
        try {
            res = await bookModel.deleteOne(ISBN)
        } catch (e) {
            throw500()
        }
        if (!res?.[0]?.affectedRows) {
            throwNewError('Cartea face parte dintr-o comanda si nu poate fi stearsa...', 409)
        }
    }

    updateDescription(id, description) {
        bookModel.updateDescription(id, description)
    }
}

const booksService = new BooksService()

module.exports = {
    booksService
}
