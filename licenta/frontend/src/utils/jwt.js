export function getToken() {
    return document?.cookie?.split('token=')?.[1]
}

export function removeToken() {
    document.cookie = `token=;path=/;expires=${new Date(0)}`
}