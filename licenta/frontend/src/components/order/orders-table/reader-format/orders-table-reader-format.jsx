import OrderReader from '../../order-row/reader-format/order-reader-format'

export default function OrdersTableReader({ orders }) {
    return (
        !!orders?.length ?<div className="orders-container">
            <span className="table-head-row">Numar</span>
            <span className="table-head-row">Titlu</span>
            <span className="table-head-row">Autor</span>
            <span className="table-head-row">Statusul comenzii</span>
            <span className="table-head-row">Data plasarii comenzii</span>
            <span className="table-head-row">Data inceperii</span>
            <span className="table-head-row">Statusul prelungirii</span>
            <span className="table-head-row">Data returului</span>
            <span className="table-head-row">Intarziere?</span>
            <span className="table-head-row">Actiuni</span>
            {orders.map((order, index) => <OrderReader key={index} index={index} {...order} />)}
        </div> : <p>Inca nu ai plasat nicio comanda...</p>
    )
}
