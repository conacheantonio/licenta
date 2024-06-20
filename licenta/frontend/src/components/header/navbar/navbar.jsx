import './navbar.css'
import { useContext } from 'react'
import { UserContext } from '../../../context/context'
import ReaderNavbar from './reader-navbar/reader-navbar'
import AdminNavbar from './admin-navbar/admin-navbar'

export default function Navbar({ menuToggled }) {
    const { role } = useContext(UserContext)

    function getClass(href) {
        return window.location.pathname === href ? 'selected' : ''
    }

    return (
        <>
            {role === 'ADMIN' && <AdminNavbar getClass={getClass} menuToggled={menuToggled} /> }
            {role === 'READER' && <ReaderNavbar getClass={getClass} menuToggled={menuToggled} /> }
        </>
    )
}
