
import { createContext } from 'react'

export const UserContext = createContext({
    role: '',
    setRole: () => {},
    userId: null,
    setUserId: () => {},
    status: '',
    setStatus: () => {}
})
