import { serverUrl } from '../constants'
import { getToken } from '../utils/jwt'

export async function getAllBooks(callback, filter = '', fieldToFilterBy = '') {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/books${filter ? '?key=' + fieldToFilterBy + '&value=' + filter : ''}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const json = await res.json()
    callback(json.message)
}

export async function removeBook(ISBN) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/books?ISBN=${ISBN}`, {
        method: 'DELETE',
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

export async function createBook({ ISBN, title, author, description, year, pages, genre }) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/books`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ISBN, title, author, description, year, pages, genre }),
        credentials: 'include'
    })
    return res
}

export async function increaseBookStock({ id, ISBN, year, pages }) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/books/increaseBookStock?id=${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ISBN, year, pages }),
        credentials: 'include'
    })
    return res
}

export async function changeDescription({ id, newDescription }) {
    const token = getToken()
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl + `/books/changeDescription?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: newDescription }),
        credentials: 'include'
    })
    return res
}
