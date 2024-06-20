import './book-reader-format.css'
import { useState } from 'react'

export default function BookReaderFormat({ id, title, author, description, genre, in_stock }) {
    const [isBookAdded, setIsBookAdded] = useState(isBookInCart())

    function isBookInCart() {
        const booksInCart = (localStorage.getItem('books') || '').split(',')
        return booksInCart.find(((bookId) => Number(bookId) === id))
    }

    function handleAddToCartClicked() {
        let booksInCart = localStorage.getItem('books') || ''
        if (isBookAdded) {
            const booksInCartArray = booksInCart.split(',')
            const bookIdIndex = booksInCartArray.findIndex((bookId) => Number(bookId) === id)
            booksInCartArray.splice(bookIdIndex, 1)
            localStorage.setItem('books', booksInCartArray.join(','))
            setIsBookAdded(false)
            return
        }

        const currentNumberOfBooks = booksInCart.split(',').filter(Boolean).length
        if (currentNumberOfBooks === 3) {
            alert('Ai deja 3 carti in cos, nu mai pot adauga altele')
            return
        }
        console.log('....', id)
        booksInCart += `${id},`
        localStorage.setItem('books', booksInCart)
        setIsBookAdded(true)
    }

    return (
        <div className="book-reader-format-container">
            <div className="main-info-container">
                <p className="title">{title}</p>
                <p className="author">{author}</p>
            </div>
            <div className="book-details">
                <p>{description}</p>
                <p className="genre">{genre}</p>
            </div>
            <button
                className={`${isBookAdded ? 'selected' : ''}`}
                disabled={!in_stock}
                onClick={handleAddToCartClicked}>
                    {!isBookAdded ? 'Adauga in cos' : 'Scoate din cos'}
            </button>
            {!in_stock && <p className="sorry-p">Ne pare rau, momentan cartea nu este in stoc</p>}
        </div>
    )
}
