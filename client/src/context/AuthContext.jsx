import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (newToken,newUser)=>{
        localStorage.setItem('token',newToken);
        setToken(newToken);
        setUser(newUser)
    }
    const logout = ()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{user,token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext