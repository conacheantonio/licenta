import UserRow from '../user-row/user-row'

export default function UsersTable({ users }) {
    return (
        users?.length ? <div className="users-container">
            <span className="table-head-row">Numar</span>
            <span className="table-head-row">Nume</span>
            <span className="table-head-row">Email</span>
            <span className="table-head-row">Telefon</span>
            <span className="table-head-row">Rol</span>
            <span className="table-head-row">Statusul contului</span>
            <span className="table-head-row">Intarzieri</span>
            <span className="table-head-row">Actiuni</span>
            {users.map((user, index) => <UserRow key={index} index={index} {...user} />)}
        </div> : <p>Inca nu exista utilizatori...</p>
    )
}
