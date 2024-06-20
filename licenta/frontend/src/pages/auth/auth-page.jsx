import { useState } from 'react'
import LoginForm from '../../components/auth/login-form/login-form'
import RegisterForm from '../../components/auth/register-form/register-form'
import ForgotPasswordForm from '../../components/auth/forgot-password-form/forgot-password-form'

export default function AuthPage() {
    const [showLoginForm, setShowLoginForm] = useState(true)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    function handleBackToLogin() {
        setShowLoginForm(true)
        setShowForgotPassword(false)
    }

    return (
        <>
            <img src="/books-logo.svg" alt="logo" className="books-logo" />
            <h1>biblioteca.ro</h1>

            {showForgotPassword
                ? <ForgotPasswordForm handleBackToLogin={handleBackToLogin}/>
                : showLoginForm
                    ? <LoginForm setShowForgotPassword={setShowForgotPassword} setShowLoginForm={setShowLoginForm}/>
                    : <RegisterForm setShowLoginForm={setShowLoginForm}/>}
        </>
    )
}
