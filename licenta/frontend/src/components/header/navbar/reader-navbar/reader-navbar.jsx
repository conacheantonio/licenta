export default function ReaderNavbar({ getClass, menuToggled }) {
    return (
        <nav className={`${menuToggled ? 'toggled' : ''}`}>
            <ul>
                <li><a href="/" className={getClass('/')}>Carti</a></li>
                <li><a href="/comenzi" className={getClass('/comenzi')}>Comenzile mele</a></li>
            </ul>
        </nav>
    )
}
