import './404.css'

export default function PageNotFound() {
    return (
        <div className="not-found-page">
            <img src="/404.png" alt="not found"/>
            <div>
                <div className="status-code">404</div>
                <p>Pagina pe care o cauti nu exista</p>
                <p>Inapoi la <a href='/'>pagina principala</a></p>
            </div>
        </div>
    )
}
