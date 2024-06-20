import { useState } from 'react'
import { changeDescription, removeBook } from '../../../../api/book'
import IncreaseBookStockForm from '../../increase-book-stock-form/increase-book-stock-form'

export default function BookAdminFormat({ index, id, title, author, description, year, ISBN, pages, genre }) {
    const [shouldShow, setShouldShow] = useState(true)
    const [showStockForm, setShowStockForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [newDescription, setNewDescription] = useState(description)

    async function handleRemoveBook() {
        const res = await removeBook(ISBN)
        if (res === true) {
            setShouldShow(false)
        } else {
            alert(res)
        }
    }

    function handleChangeDescription(value) {
        setNewDescription(value)
    }

    async function handleSaveNewDescription() {
        const res = await changeDescription({ id, newDescription })
        if (res.status === 204) {
            setIsEditing(false)
            window.location.reload()
        } else {
            const json = await res.json()
            alert(json.message)
            return
        }
    }

    function handleCancel() {
        setNewDescription(description)
        setIsEditing(false)
    }

    return (
        shouldShow &&
        <>
            <span className="table-head-col">Numar</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{index + 1}</span>
            <span className="table-head-col">Titlu</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{title}</span>
            <span className="table-head-col">Autor</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{author}</span>
            <span className="table-head-col">Descriere</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'} edit`}>
                {!isEditing ? description : <input value={newDescription} onChange={(e) => handleChangeDescription(e.target.value)} />}
                {!isEditing ? <button onClick={() => setIsEditing(true)}><img src="/edit.svg" alt="edit" /></button>
                : <>
                    <button onClick={handleSaveNewDescription}><img src="/confirm.svg" alt="confirm" /></button>
                    <button onClick={handleCancel}><img src="/cancel.svg" alt="cancel" /></button>
                </>
            }
            </span>
            <span className="table-head-col">An</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{year}</span>
            <span className="table-head-col">ISBN</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{ISBN}</span>
            <span className="table-head-col">Pagini</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{pages}</span>
            <span className="table-head-col">Gen</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{genre}</span>
            <span className="table-head-col">Actiuni</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>
                {<button onClick={handleRemoveBook}>Sterge</button>}
                {!showStockForm && <button onClick={() => setShowStockForm(true)}>Mareste stocul</button>}
                {showStockForm && <IncreaseBookStockForm id={id} setShowStockForm={setShowStockForm}/>}
            </span>
            <hr />
            <hr />
        </>
    )
}
