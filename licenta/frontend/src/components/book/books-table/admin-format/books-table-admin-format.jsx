import BookAdminFormat from '../../book-row/admin-format/book-admin-format'

export default function BooksTableAdmin({ books,  }) {
    return (
        !!books?.length ? <div className="books-container">
            <span className="table-head-row">Numar</span>
            <span className="table-head-row">Titlu</span>
            <span className="table-head-row">Autor</span>
            <span className="table-head-row">Descriere</span>
            <span className="table-head-row">An</span>
            <span className="table-head-row">ISBN</span>
            <span className="table-head-row">Pagini</span>
            <span className="table-head-row">Gen</span>
            <span className="table-head-row">Actiuni</span>
            {books.map((book, index) => <BookAdminFormat key={index} index={index} {...book} />)}
        </div> : <p>Inca nu exista carti...</p>
    )
}
