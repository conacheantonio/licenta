export default function AdminNavbar({ getClass, menuToggled }) {
    return (
        <nav className={`${menuToggled ? 'toggled' : ''}`}>
            <ul>
                <li><a href="/" className={getClass('/')}>Utilizatori</a></li>
                <li><a href="/carti" className={getClass('/carti')}>Carti</a></li>
                <li><a href="/adauga" className={getClass('/adauga')}>Adauga o carte</a></li>
                <li><a href="/comenzi" className={getClass('/comenzi')}>Comenzi</a></li>
            </ul>
        </nav>
    )
}
