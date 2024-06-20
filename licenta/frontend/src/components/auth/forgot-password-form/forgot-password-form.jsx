import { useEffect, useState } from 'react'
import Error from '../../error/error'
import { resetPassword } from '../../../api/auth'

export default function ForgotPasswordForm({ handleBackToLogin }) {
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [newPassword, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (newPassword && confirmedPassword && newPassword !== confirmedPassword) {
            setErrorMessage('Parola nu a fost confirmata!')
        } else {
            setErrorMessage('')
        }
    }, [newPassword, confirmedPassword])

    async function handleFormSubmit(event) {
        event.preventDefault()
        if (newPassword && confirmedPassword && newPassword === confirmedPassword) {
            try {
                const resetPasswordResponse = await resetPassword(email, newPassword, confirmedPassword, phoneNumber, pin)
                const json = await resetPasswordResponse.json()
                const status = resetPasswordResponse.status
                if (status !== 200) {
                    setErrorMessage(json.message)
                    return
                }

                alert('Parola resetata cu succes')

                document.cookie = `token=${json.token};max-age=${json.expirationDate * 1000}`
                window.location.reload()
            } catch (e) { 
                setErrorMessage('Ceva nu a mers. Te rugam sa revii mai tarziu.')
            }
        }
    }

    return (
        <>
            <form onSubmit={(event) => handleFormSubmit(event)}>
                <label>Email</label>
                <input type="email" onChange={(event) => setEmail(event.target.value)} placeholder="utilizator@email.com" required />
                <label>Pin</label>
                <input type="password" onChange={(event) => setPin(event.target.value)} placeholder="1234" required />
                <label>Telefon</label>
                <input type="tel" onChange={(event) => setPhoneNumber(event.target.value)} placeholder="0755123456" required />
                <label>Parola noua</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="parola puternica" required />
                <label>Repeta parola noua</label>
                <input type="password" onChange={(event) => setConfirmedPassword(event.target.value)} placeholder="parola puternica" required />
                <button type="submit">Reseteaza parola</button>
                <p><button type="button" onClick={handleBackToLogin}>Inapoi la login</button></p>
            </form>
            <Error message={errorMessage} />
        </>
    )
}
