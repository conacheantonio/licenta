import './users-page.css'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../api/users'
import UsersTable from '../../components/user/users-table/users-table'

export default function UsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers(setUsers)
    }, [])

    return (
        <UsersTable users={users}/>
    )
}
