import './increase-book-stock-form.css'
import { useState } from 'react'
import Error from '../../error/error'
import { increaseBookStock } from '../../../api/book'

export default function IncreaseBookStockForm({ id, setShowStockForm }) {
    const [ISBN, setISBN] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [pages, setPages] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleFormSubmit(event) {
        // prevent redirect before validations
        event.preventDefault()
        try {
            const response = await increaseBookStock({ id, ISBN: Number(ISBN), year: Number(year), pages: Number(pages) })

            const status = response.status
            if (status !== 204) {
                const json = await response.json()
                setErrorMessage(json.message)
                return
            }
            window.location.reload()
        } catch (e) { 
            setErrorMessage('Ceva nu a mers. Te rugam sa revii mai tarziu.')
        }
    }

    return (
        <>
            <div className="increase-book-form-modal">
                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <label>ISBN</label>
                    <input type="number" onChange={(event) => setISBN(event.target.value)} placeholder="13 cifre incepand cu 978" required/>
                    <label>An</label>
                    <input type="text" onChange={(event) => setYear(event.target.value)} placeholder="min 2007, max anul curent" required/>
                    <label>Numar de pagini</label>
                    <input type="text" onChange={(event) => setPages(event.target.value)} placeholder="numarul de pagini" required/>
                    <button type="submit">Adauga</button>
                    <button className="cancel" onClick={() => setShowStockForm(false)}>X</button>
                </form>
                <Error message={errorMessage} />
            </div>
        </>
    )
}
