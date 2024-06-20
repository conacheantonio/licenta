const { ORDER_STATUSES } = require('../db/constants')
const { database } = require('../db/db')

class BookModel {
    async readAllGeneral(key, value) {
        if (key && value) {
            const result = await database.connection.query(`
                SELECT book_details.id, book_details.title, book_details.author, book_details.\`description\`,
                    genres.genre,
                    (select count(*) > 0 from book_details AS book_details_inner
                        JOIN books
                        ON book_details_inner.id = books.book_id
                        LEFT JOIN order_contents
                        ON books.ISBN = order_contents.ISBN
                        LEFT JOIN order_statuses
                        ON order_statuses.id = order_contents.order_status_id
                        WHERE
                        (
                            book_details_inner.id = book_details.id AND
                            (
                                order_contents.order_status_id IS NULL OR
                                (
                                    order_contents.order_status_id IN (select order_statuses.id from order_statuses where order_statuses.\`status\` <> "DENIED") AND
                                    order_contents.return_date IS NOT NULL
                                ) OR (
                                    SELECT COUNT(*) FROM order_contents
                                        WHERE order_contents.order_status_id IN (select order_statuses.id from order_statuses where order_statuses.\`status\` <> "DENIED")
                                        AND order_contents.return_date IS NOT NULL
                                    = 0
                                )
                            )
                        )
                    ) as in_stock
                FROM book_details
                    LEFT JOIN genres
                    ON book_details.genre_id = genres.id
                WHERE genres.genre = "${value}" OR book_details.title = "${value}"
            ;`)
            return result?.[0] || null
        } else {
            const result = await database.connection.query(`
                SELECT book_details.id, book_details.title, book_details.author, book_details.\`description\`,
                    genres.genre,
                    (select count(*) > 0 from book_details as book_details_inner
                        JOIN books
                        ON book_details_inner.id = books.book_id
                        LEFT JOIN order_contents
                        ON books.ISBN = order_contents.ISBN
                        LEFT JOIN order_statuses
                        ON order_statuses.id = order_contents.order_status_id
                        WHERE
                        (
                            book_details_inner.id = book_details.id AND
                            (
                                order_contents.order_status_id IS NULL OR
                                (
                                    order_contents.order_status_id IN (select order_statuses.id from order_statuses where order_statuses.\`status\` <> "DENIED") AND
                                    order_contents.return_date IS NOT NULL
                                ) OR (
                                    SELECT COUNT(*) FROM order_contents
                                        WHERE order_contents.order_status_id IN (select order_statuses.id from order_statuses where order_statuses.\`status\` <> "DENIED")
                                        AND order_contents.return_date IS NOT NULL
                                    = 0
                                )
                            )
                        )
                    ) as in_stock
                FROM book_details
                    LEFT JOIN genres
                    ON book_details.genre_id = genres.id
                ;`
            )
            return result?.[0] || null
        }
    }

    // admin view, ISBN and stuff
    async readAllIndividual(key, value) {
        if (key && value) {
            const result = await database.connection.query(`
                SELECT book_details.id, book_details.title, book_details.author, book_details.\`description\`,
                    genres.genre,
                    books.ISBN, books.\`year\`, books.pages
                FROM book_details
                    LEFT JOIN genres
                    ON book_details.genre_id = genres.id
                    RIGHT JOIN books
                    ON books.book_id = book_details.id
                WHERE ${key === 'genre' ? 'genres.genre = "' + value + '"' : 'book_details.title = "' + value + '"'}
                ORDER BY book_details.id
            ;`
            )
            return result?.[0] || null
        } else {
            const result = await database.connection.query(`
                SELECT book_details.id, book_details.title, book_details.author, book_details.\`description\`,
                    genres.genre,
                    books.ISBN, books.\`year\`, books.pages
                FROM book_details
                    LEFT JOIN genres
                    ON book_details.genre_id = genres.id
                    RIGHT JOIN books
                    ON books.book_id = book_details.id
                ORDER BY book_details.id
            ;`
            )
            return result?.[0] || null
        }
    }

    async readAllByGenre(genre) {
        const result = await database.connection.query(`
            SELECT book_details.title, book_details.author, book_details.\`description\`,
                genres.genre,
                books.ISBN, books.\`year\`, books.pages
            FROM book_details
                LEFT JOIN genres
                ON book_details.genre_id = genres.id
                RIGHT JOIN books
                ON books.book_id = book_details.id
            WHERE books.genre_id = (SELECT genres.id FROM genres WHERE genres.genre = "${genre}");`
        )
        return result?.[0] || null
    }

    async readOneByISBN(ISBN) {
        const result = await database.connection.query(`
            SELECT book_details.title, book_details.author, book_details.\`description\`,
                genres.genre,
                books.ISBN, books.\`year\`, books.pages
            FROM book_details
                LEFT JOIN genres
                ON book_details.genre_id = genres.id
                RIGHT JOIN books
                ON books.book_id = book_details.id
            WHERE books.ISBN = ${ISBN};`
        )
        return result?.[0] || null
    }

    async checkIfBookIsInStock(title, author) {
        const result = await database.connection.query(`
        select * from books
        JOIN book_details
            ON book_details.id = books.book_id
        LEFT JOIN order_contents
            ON books.ISBN = order_contents.ISBN
        LEFT JOIN order_statuses
            ON order_statuses.id = order_contents.order_status_id
        WHERE
            book_details.title = "${title}" and
            book_details.author = "${author}" and
            (
                order_contents.order_status_id IS NULL OR
                (
                    order_contents.order_status_id IN (select order_statuses.id from order_statuses where order_statuses.\`status\` <> "DENIED") AND
                    order_contents.return_date IS NOT NULL
                )
            )
        ;`)
        console.log(result?.[0]) // return first ISBN available
    }

    async createOne(title, author, description, genre, ISBN, year, pages) {
        const result = await database.connection.query(`
            BEGIN;
                INSERT INTO book_details
                SET
                    title = "${title}",
                    author = "${author}",
                    \`description\` = "${description}",
                    genre_id = (SELECT genres.id FROM genres where genres.genre = "${genre}");
                INSERT INTO books
                SET
                    ISBN = ${ISBN},
                    \`year\` = ${year},
                    pages = ${pages},
                    book_id = (SELECT id FROM book_details WHERE title = "${title}" AND author = "${author}");
            COMMIT;`
        )
        return result || null
    }

    async readBookIdFromDetails (title, author) {
        const result = await database.connection.query(`
            SELECT id FROM book_details WHERE title = "${title}" AND author = "${author}"
        `)
        return result?.[0]?.[0]?.id || null
    }

    async creatOneDetails(title, author, description, genre) {
        const result = await database.connection.query(`
            INSERT INTO book_details
            SET
                title = "${title}",
                author = "${author}",
                \`description\` = "${description}",
                genre_id = (SELECT genres.id FROM genres where genres.genre = "${genre}");`
        )
        return result || null
    }

    async createOneISBN(title, author, ISBN, year, pages) {
        const result = await database.connection.query(`
            INSERT INTO books
            SET
                ISBN = ${ISBN},
                \`year\` = ${year},
                pages = ${pages},
                book_id = (SELECT id FROM book_details WHERE title = "${title}" AND author = "${author}");`
        )
        return result || null
    }

    // only add ISBN, year, pages
    async increaseQuantity(id, ISBN, year, pages) {
        const result = await database.connection.query(`
            INSERT INTO books
            SET
                ISBN = ${ISBN},
                \`year\` = ${year},
                pages = ${pages},
                book_id = ${id};`
        )
        return result || null
    }

    async updateDescription(id, newDescription) {
        const result = await database.connection.query(`
            UPDATE book_details
            SET \`description\` = "${newDescription}"
            WHERE id = ${id};`
        )
        return result || null
    }

    // delete book by ISBN
    async deleteOne(ISBN) {
        const result = await database.connection.query(`
            DELETE FROM books
            WHERE ISBN = ${ISBN}
            AND (
                SELECT count(*) FROM order_contents
                WHERE ISBN = ${ISBN}
                AND return_date IS NULL
                AND order_status_id <> (select order_statuses.id from order_statuses where order_statuses.\`status\` = "${ORDER_STATUSES.denied}")
                ) = 0;
            `
        )
        return result || null
    }
}

const bookModel = new BookModel()

module.exports = {
    bookModel
}
