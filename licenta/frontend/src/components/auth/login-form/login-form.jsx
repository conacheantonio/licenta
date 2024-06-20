import { useState } from 'react'
import { login } from '../../../api/auth'
import Error from '../../error/error'

export default function LoginForm({ setShowForgotPassword, setShowLoginForm }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    async function handleFormSubmit(event) {
        event.preventDefault()
        try {
            const loginResponse = await login(email, password)
            const json = await loginResponse.json()

            const status = loginResponse.status
            if (status !== 201) {
                setErrorMessage(json.message)
                return
            }
            document.cookie = `token=${json.token};max-age=${json.expirationDate * 1000}`
            window.location.reload()
        } catch (e) { 
            setErrorMessage('Ceva nu a mers. Te rugam sa revii mai tarziu.')
        }
    }

    return (
        <>
            <form onSubmit={(event) => handleFormSubmit(event)} className="login-form">
                <label>Email</label>
                <input type="email" onChange={(event) => setEmail(event.target.value)} placeholder="utilizator@email.com" required/>
                <label>Parola</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="parola" required/>
                <button type="button" onClick={() => setShowForgotPassword(true)} className="forgot-password-button">Am uitat parola</button>
                <button type="submit">Login</button>
                <p>Nu ai cont? <button type="button" onClick={() => setShowLoginForm(false)}>Inregistreaza-te!</button></p>
            </form>
            <Error message={errorMessage} />
        </>
    )
}
