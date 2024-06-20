import { useState } from 'react'
import { approveUser, banUser, makeAdmin } from '../../../api/users'
import { getEvenOddClass } from '../../../utils/classes'

export default function UserRow({ index, id, name_surname, email, phone, role, status, penalties }) {
    const [userRole, setRole] = useState(role)
    const [userStatus, setStatus] = useState(status)

    async function handleMakeAdminClicked() {
        const res = await makeAdmin(id)
        if (res?.length) {
            alert(res)
        } else {

            setRole('ADMIN')
        }
    }

    async function handleApproveUser() {
        await approveUser(id)
        setStatus('ACTIVE')
    }

    async function handleBanUser() {
        await banUser(id)
        setStatus('BANNED')
    }

    return (
        <>
            <span className="table-head-col">Numar</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{index + 1}</span>
            <span className="table-head-col">Nume</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{name_surname}</span>
            <span className="table-head-col">Email</span>
            <span className={`table-content-${getEvenOddClass(index)}`}><a href={`/comenzi?userId=${id}`}>{email}</a></span>
            <span className="table-head-col">Telefon</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{phone}</span>
            <span className="table-head-col">Rol</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{userRole}</span>
            <span className="table-head-col">Statusul contului</span>
            <span className={`table-content-${getEvenOddClass(index)} ${userStatus === 'WAITING FOR APPROVE' ? 'processing' : ''}`}>{userStatus}</span>
            <span className="table-head-col">Intarzieri</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>{penalties || 0}</span>
            <span className="table-head-col">Actiuni</span>
            <span className={`table-content-${getEvenOddClass(index)}`}>
                {userRole !== 'ADMIN' && userStatus === 'ACTIVE' && <button onClick={handleMakeAdminClicked}>Make admin</button>}
                {userRole !== 'ADMIN' && userStatus === 'ACTIVE' && <button onClick={handleBanUser}>Ban</button>}
                {userStatus === 'WAITING FOR APPROVE' && <button onClick={handleApproveUser}>Approve</button>}
            </span>
            <hr />
            <hr />
        </>
    )
}