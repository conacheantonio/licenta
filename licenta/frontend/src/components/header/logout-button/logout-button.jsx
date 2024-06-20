import './logout-button.css'
import { removeToken } from '../../../utils/jwt'

export default function LogoutButton() {
    function handleLogOut() {
        removeToken()
        window.location.href = '/'
    }

    return (
        <button type="button" className="logout-button" onClick={handleLogOut}>Log out</button>
    )
}
