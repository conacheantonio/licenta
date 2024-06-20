import './orders-page.css'
import { useEffect, useState } from 'react'
import { getOrders } from '../../api/orders'
import OrdersTableAdmin from '../../components/order/orders-table/admin-format/orders-table-admin-format'
import OrdersTableReader from '../../components/order/orders-table/reader-format/orders-table-reader-format'

export default function OrdersPage({ isAdmin }) {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const params = isAdmin ? window.location.search?.split('userId=')?.[1] : ''
        getOrders(setOrders, isAdmin, params)
    }, [])

    return (isAdmin ? <OrdersTableAdmin orders={orders} /> : <OrdersTableReader orders={orders}/>)
}
