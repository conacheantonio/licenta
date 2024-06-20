import './books-page.css'
import { useEffect, useState } from 'react'
import { getAllBooks } from '../../api/book'
import BooksTableAdmin from '../../components/book/books-table/admin-format/books-table-admin-format'
import BooksTableReader from '../../components/book/books-table/reader-format/books-table-reader-format'

export default function BooksPage({ isAdmin }) {
    const [books, setBooks] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        getAllBooks(setBooks)
    }, [])

    function handleFilter(fieldToFilterBy) {
        getAllBooks(setBooks, filter, fieldToFilterBy)
    }

    return (isAdmin ?
        <>
            <div className="search-container-admin">
                <input type="text" placeholder="Cauta un titlu" onChange={(e) => setFilter(e.target.value)}/>
                <button onClick={() => handleFilter('title')}><img src="/search.png" alt="search" /></button>
            </div>
            <BooksTableAdmin books={books} />
        </> :
        <>
            <div className="search-container">
                <input type="text" placeholder="Cauta un gen sau un titlu" onChange={(e) => setFilter(e.target.value)}/>
                <button onClick={() => handleFilter('genre')}><img src="/search.png" alt="search" /></button>
            </div>
            <BooksTableReader books={books} />
        </>
    )
}
