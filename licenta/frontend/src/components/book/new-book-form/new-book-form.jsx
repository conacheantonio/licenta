import { useState } from 'react'
import Error from '../../error/error'
import { createBook } from '../../../api/book'

export default function NewBookForm() {
    const [ISBN, setISBN] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [pages, setPages] = useState(0)
    const [genre, setGenre] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    async function handleFormSubmit(event) {

        event.preventDefault()
        try {
            const response = await createBook({ ISBN: Number(ISBN), title, author, description, year: Number(year), pages: Number(pages), genre })

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
            <form onSubmit={(event) => handleFormSubmit(event)}>
                <label>ISBN</label>
                <input type="number" onChange={(event) => setISBN(event.target.value)} placeholder="13 cifre incepand cu 978" required/>
                <label>Titlu</label>
                <input type="text" onChange={(event) => setTitle(event.target.value)} placeholder="Titlul cartii" required/>
                <label>Autor</label>
                <input type="text" onChange={(event) => setAuthor(event.target.value)} placeholder="Autorul" required/>
                <label>Descriere</label>
                <input type="text" onChange={(event) => setDescription(event.target.value)} placeholder="Descriere scurta" required/>
                <label>An</label>
                <input type="number" onChange={(event) => setYear(event.target.value)} placeholder="min 2007, max anul curent" required/>
                <label>Numar de pagini</label>
                <input type="number" onChange={(event) => setPages(event.target.value)} placeholder="numarul de pagini" required/>
                <label>Gen</label>
                <input type="text" onChange={(event) => setGenre(event.target.value)} placeholder="genul literar" required/>
                <button type="submit">Adauga</button>
            </form>
            <Error message={errorMessage} />
        </>
    )
}
