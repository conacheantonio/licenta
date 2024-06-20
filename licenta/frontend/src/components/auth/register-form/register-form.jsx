import { useEffect, useState } from 'react'
import { register } from '../../../api/auth'
import Error from '../../error/error'

export default function RegisterForm({ setShowLoginForm }) {
    const [nameSurname, setNameSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [pin, setPin] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (password && confirmedPassword && password !== confirmedPassword) {
            setErrorMessage('Parola nu a fost confirmata!')
        } else {
            setErrorMessage('')
        }
    }, [password, confirmedPassword])

    async function handleFormSubmit(event) {
        event.preventDefault()
        if (password && confirmedPassword && password === confirmedPassword) {
            // try catch again
            const registerResponse = await register(nameSurname, email, password, confirmedPassword, phoneNumber, pin)
            const json = await registerResponse.json()
            if (registerResponse.status !== 201) {
                setErrorMessage(json.message)
                return
            }
            document.cookie = `token=${json.token};max-age=${json.expirationDate * 1000}`
            window.location.reload()
        } else {
            setErrorMessage('Te rugam sa confirmi parola!')
        }
    }

    return (
        <>
            <form onSubmit={(event) => handleFormSubmit(event)}>
                <label>Nume si Prenume</label>
                <input type="text" onChange={(event) => setNameSurname(event.target.value)} placeholder="Ion Popescu" required />
                {/* set custom validity? title */}

                <label>Email</label>
                <input type="email" onChange={(event) => setEmail(event.target.value)} placeholder="utilizator@email.com" required />

                <label>Parola</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="parola puternica" required />

                <label>Confirma parola</label>
                <input type="password" onChange={(event) => setConfirmedPassword(event.target.value)} placeholder="parola puternica" required />

                <label>Numar de telefon</label>
                <input type="tel" onChange={(event) => setphoneNumber(event.target.value)} placeholder="0755123456" required />

                <label>Pin</label>
                <input type="password" onChange={(event) => setPin(event.target.value)} placeholder="1234" required />

                <button type="submit">Inregistreaza-te!</button>
                <p>Ai deja cont? <button type="button" onClick={() => setShowLoginForm(true)}>Inapoi la log in!</button></p>
            </form>
            <Error message={errorMessage}/>
        </>
    )
}
