import './header.css'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/context'
import LogoutButton from './logout-button/logout-button'
import Navbar from './navbar/navbar'
import { placeOrder } from '../../api/orders'

export default function Header() {
    const { role, userId } = useContext(UserContext)
    const [menuToggled, setMenuToggled] = useState(false)

    async function handlePlaceOrderClicked() {
        const books = ((localStorage.getItem('books') || '').split(',')).filter(Boolean)
        if (books.length) {
            const res = await placeOrder(userId, books)
            if (res?.length) {
                alert(res)
            } else {
                localStorage.setItem('books', '')
                window.location.reload()
            }
        } else {
            alert('Comanda trebuie sa contina cel putin o carte...')
        }
    }

    return (
        role && <header>
            <img src="/books-logo.svg" alt="books"/>
            <Navbar menuToggled={menuToggled}/>

            <div className="buttons-container">
                <div className="actions-container">
                    {role === 'READER' &&
                        <button className="place-order-button" onClick={handlePlaceOrderClicked}>
                            <img src="/cart.png" alt="cart" /> Plaseaza comanda
                        </button>
                    }

                    {role && <LogoutButton />}
                </div>

                <button className="menu" onClick={() => setMenuToggled((old) => !old)}><img src="/menu.svg" alt="menu" /></button>
            </div>

        </header>
    )
}