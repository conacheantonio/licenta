import { useState } from 'react'
import { approveExtendOrder, approveOrder, denyExtendOrder, denyOrder } from '../../../../api/orders'
import { transformDate } from '../../../../utils/dates'
import { getEvenOddClass } from '../../../../utils/classes'

export default function OrderAdmin({ index, id, email, ISBN, title, author, order_status, date_created, extend_status, return_date, start_date, is_late }) {
    const [orderStatus, setOrderStatus] = useState(order_status)
    const [extendStatus, setExtendStatus] = useState(extend_status)

    async function handleOrderApproved() {
        await approveOrder(id)
        setOrderStatus('APPROVED')
    }

    async function handleOrderDenied() {
        await denyOrder(id)
        setOrderStatus('DENIED')
    }

    async function handleExtendOrderApproved() {
        await approveExtendOrder(id)
        setExtendStatus('APPROVED')
    }

    async function handleExtendOrderDenied() {
        await denyExtendOrder(id)
        setExtendStatus('DENIED')
    }

    return (
        <>
            <span className="table-head-col">Numar</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{index + 1}</span>
            <span className="table-head-col">Email</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{email}</span>
            <span className="table-head-col">ISBN</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{ISBN}</span>
            <span className="table-head-col">Titlu</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{title}</span>
            <span className="table-head-col">Autor</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{author}</span>
            <span className="table-head-col">Statusul comenzii</span>
            <span className={`table-content-${getEvenOddClass(index)} ${orderStatus === 'PROCESSING' ? 'processing' : ''}`}>{orderStatus}</span>
            <span className="table-head-col">Plasata pe</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{transformDate(date_created)}</span>
            <span className="table-head-col">Data inceperii</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{transformDate(start_date)}</span>
            <span className="table-head-col">Statusul prelungirii</span>
            <span className={`table-content-${getEvenOddClass(index)}  ${extendStatus === 'PROCESSING' ? 'processing' : ''}`}>{extendStatus}</span>
            <span className="table-head-col">Data returului</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{transformDate(return_date)}</span>
            <span className="table-head-col">Intarziere?</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{is_late ? 'da' : ''}</span>
            <span className="table-head-col">Actiuni</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>
                {orderStatus === 'PROCESSING' && <>
                    <button onClick={handleOrderApproved}>Aproba</button>
                    <button onClick={handleOrderDenied}>Respinge</button>
                </>}
                {extendStatus === 'WAITING FOR APPROVE' && <>
                    <button onClick={handleExtendOrderApproved}>Aproba</button>
                    <button onClick={handleExtendOrderDenied}>Respinge</button>
                </>}
            </span>
            <hr />
            <hr />
        </>
    )
}