import { serverUrl } from '../constants'
import { getToken } from '../utils/jwt'

export async function getAllUsers(callback) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + '/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const json = await res.json()
    callback(json.users)
}

export async function makeAdmin(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/users/makeAdmin?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (res.status === 204) {
        return true
    } else {
        const { message } = await res.json()
        return message
    }
}

export async function approveUser(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/users/approveUser?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    return res.status === 204
}

export async function banUser(id) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/users/banUser?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    return res.status === 204
}

