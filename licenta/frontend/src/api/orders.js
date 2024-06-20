import { serverUrl } from '../constants'
import { getToken } from '../utils/jwt'

export async function getOrders(setOrders, isAdmin, userId) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/order${isAdmin ? '?userId=' + userId : '/list' }`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const orders = await res.json()
    setOrders(orders)
}

export async function placeOrder(userId, bookIds) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + '/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            userId,
            bookIds
        })
    })
    if (res.status === 204) {
        return true
    } else {
        const { message } = await res.json()
        return message
    }
}

export async function approveOrder(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/order/approve?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return res.status === 204
}

export async function denyOrder(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/order/deny?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return res.status === 204
}

export async function requestExtendOrder(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/order/requestExtend?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return res.status === 204
}

export async function approveExtendOrder(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/order/approveExtend?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return res.status === 204
}

export async function denyExtendOrder(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/order/denyExtend?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return res.status === 204
}

export async function returnBook(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/order/returnBook?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    return res.status === 204
}
