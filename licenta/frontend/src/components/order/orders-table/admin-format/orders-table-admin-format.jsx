import OrderAdmin from '../../order-row/admin-format/order-admin-format'

export default function OrdersTableAdmin({ orders }) {
    return (
        !!orders?.length ? <div className="orders-container orders-container-admin">
            <span className="table-head-row">Numar</span>
            <span className="table-head-row">Email</span>
            <span className="table-head-row">ISBN</span>
            <span className="table-head-row">Titlu</span>
            <span className="table-head-row">Autor</span>
            <span className="table-head-row">Statusul comenzii</span>
            <span className="table-head-row">Plasata pe</span>
            <span className="table-head-row">Data inceperii</span>
            <span className="table-head-row">Statusul prelungirii</span>
            <span className="table-head-row">Data returului</span>
            <span className="table-head-row">Intarziere?</span>
            <span className="table-head-row">Actiuni</span>
            {orders.map((order, index) => <OrderAdmin key={index} index={index} {...order} />)}
        </div> : <p>Inca nu exista comenzi plasate...</p>
    )
}
