import { serverUrl } from '../constants'
// bcrypt? btoa?

export function login(email, password) {
    return fetch(serverUrl + '/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
}

export function register(nameSurname, email, password, confirmedPassword, phoneNumber, pin) {
    return fetch(serverUrl + '/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nameSurname,
            email,
            password,
            confirmedPassword,
            phoneNumber,
            pin
        })
    })
}

export function resetPassword(email, newPassword, confirmedPassword, phoneNumber, pin) {
    return fetch(serverUrl + '/resetPassword', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            newPassword,
            confirmedPassword,
            phoneNumber,
            pin
        })
    })
}

export async function getUserRoleFromServer(token, setRole, setUserId, setStatus) {
    if (!token) {
        return ''
    }
    const res = await fetch(serverUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const json = await res.json()

    setRole(json.role)
    setUserId(json.id)
    setStatus(json.status)
}
