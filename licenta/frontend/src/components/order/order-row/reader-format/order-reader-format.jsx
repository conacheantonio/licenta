import { requestExtendOrder, returnBook } from '../../../../api/orders'
import { transformDate } from '../../../../utils/dates'
import { useState } from 'react'

export default function OrderReader({ index, id, title, author, order_status, date_created, extend_status, return_date, start_date, is_late }) {
    const [returnDate, setReturnDate] = useState(return_date)
    const [extendStatus, setExtendStatus] = useState(extend_status)

    async function handleReturnBook() {
        await returnBook(id)
        setReturnDate(new Date().toISOString().split('.')[0].replace('T', ' '))
    }

    async function handleExtendOrderRequested() {
        await requestExtendOrder(id)
        setExtendStatus('WAITING FOR APPROVE')
    }

    return (
        <>
            <span className="table-head-col">Numar</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{index + 1}</span>
            <span className="table-head-col">Titlu</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{title}</span>
            <span className="table-head-col">Autor</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{author}</span>
            <span className="table-head-col">Statusul comenzii</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'} ${order_status === 'PROCESSING' ? 'processing' : ''}`}>{order_status}</span>
            <span className="table-head-col">Data plasarii comenzii</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{transformDate(date_created)}</span>
            <span className="table-head-col">Data inceperii</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{transformDate(start_date)}</span>
            <span className="table-head-col">Statusul prelungirii</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'} ${extendStatus === 'PROCESSING' ? 'processing' : ''}`}>{extendStatus}</span>
            <span className="table-head-col">Data returului</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{transformDate(returnDate)}</span>
            <span className="table-head-col">Intarziere?</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>{is_late ? 'da' : ''}</span>
            <span className="table-head-col">Actiuni</span>
            <span className={`table-content-${index % 2 ? 'even' : 'odd'}`}>
                {order_status === 'APPROVED' && !return_date && <button onClick={handleReturnBook}>Returneaza</button>}
                {order_status === 'APPROVED' && !extendStatus && !return_date && <button onClick={handleExtendOrderRequested}>Prelungeste</button>}
            </span>
            <hr />
            <hr />
        </>
    )
}
