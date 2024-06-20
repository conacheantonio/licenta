import BookReaderFormat from '../../book-row/reader-format/book-reader-format'

export default function BooksTableReader({ books }) {
    return (
        !!books?.length ? <div className="books-list-reader-format-container">
            {books.map((book, index) => <BookReaderFormat key={index} {...book} />)}
        </div> : <p>Inca nu exista carti...</p>
    )
}
