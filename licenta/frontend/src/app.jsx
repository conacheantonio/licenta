import './app.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './context/context'
import { getToken } from './utils/jwt'
import { getUserRoleFromServer } from './api/auth'

import NewBookForm from './components/book/new-book-form/new-book-form'
import Header from './components/header/header'
import Footer from './components/footer/footer'

import AuthPage from './pages/auth/auth-page'
import OrdersPage from './pages/orders-page/orders-page'
import UsersPage from './pages/users-page/users-page'
import BooksPage from './pages/books-page/books-page'
import PageNotFound from './pages/404/404'

export default function App() {
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState(null)
    const [status, setStatus] = useState('')


    useEffect(() => {
        getUserRoleFromServer(getToken(), setRole, setUserId, setStatus)
    })

    function getElement(route) {
        switch(role) {
            case 'ADMIN': 
                switch(route) {
                    case '/':
                        return <UsersPage />
                    case '/carti':
                        return <BooksPage isAdmin={true}/>
                    case '/adauga':
                        return <NewBookForm />
                    case '/comenzi':
                        return <OrdersPage isAdmin={true} />
                    default: 
                        return <PageNotFound />
                }
            case 'READER':
                if (status === 'WAITING FOR APPROVE') {
                    return (
                        <div className="status-page">
                            <img src="/pending.svg" alt="pending" />
                            <p>Un administrator trebuie sa iti aprobe cererea de inscriere. Te rugam sa revii mai tarziu.</p>
                        </div>
                    )
                } else if (status === 'ACTIVE') {
                    switch(route) {
                        case '/':
                            return <BooksPage />
                        case '/comenzi':
                            return <OrdersPage />
                        default: 
                            return <PageNotFound />
                    }
                } else if (status === 'BANNED') {
                    return (
                        <div className="status-page">
                            <img src="/banned.svg" alt="banned" />
                            <p>Contul tau a fost inchis permanent.</p>
                        </div>
                    )
                } else {
                    return <p>Nu ar fi trebuit sa ajungi aici</p>
                }
            default:
                if (route === '/') {
                    return <AuthPage />
                } else {
                    return <PageNotFound />
                }
        }
    }

    return (
        <UserContext.Provider value={{ role, setRole, userId, setUserId, status, setStatus }}>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={getElement('/')} />
                    <Route path='/carti' element={getElement('/carti')} />
                    <Route path='/adauga' element={getElement('/adauga')} />
                    <Route path='/comenzi' element={getElement('/comenzi')} />
                    <Route path='*' exact={true} element={<PageNotFound />} />
                </Routes>
            </main>
            <Footer />
        </UserContext.Provider>
    )
}
