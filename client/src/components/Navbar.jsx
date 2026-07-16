import React, { useContext,useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {CircleUser, User} from 'lucide-react'
import AuthContext from '../context/AuthContext'

const Navbar = () => {

    const {token,user,logout} = useContext(AuthContext)
    const [showDropDown, setShowDropDown] = useState(false)
    const navigate = useNavigate()

    const handleLogout = ()=>{
        logout();
        setShowDropDown(false);
        navigate('/login')
    }

  return (
    <nav className='w-full border-b border-[#E8DED1] bg-[#F5F1EA]'>
        <div className='max-w-7xl mx-auto h-20 px-8 flex items-center justify-between'>
            <h1 className='font-serif text-4xl tracking-[0.25em] text-[#2E2621]'>Layrd</h1>
            <div className='flex items-center gap-12 text-[17px] text-[#4B4138]'>
                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        `relative px-1 pb-2 text-[#4B4138] hover:text-[#2E2621] ${
                        isActive ? "text-[#2E2621]" : ""
                        }`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        Library
                        <span
                            className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all duration-200 ${
                            isActive ? "w-full opacity-100" : "w-0 opacity-0"
                            }`}
                        />
                        </>
                    )}
                </NavLink>
                <NavLink
                    to="/canvas"
                    className={({ isActive }) =>
                        `relative px-1 pb-2 text-[#4B4138] hover:text-[#2E2621] ${
                        isActive ? "text-[#2E2621]" : ""
                        }`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        Canvas
                        <span
                            className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all duration-200 ${
                            isActive ? "w-full opacity-100" : "w-0 opacity-0"
                            }`}
                        />
                        </>
                    )}
                </NavLink>
                <NavLink
                    to="/wardrobe"
                    className={({ isActive }) =>
                        `relative px-1 pb-2 text-[#4B4138] hover:text-[#2E2621] ${
                        isActive ? "text-[#2E2621]" : ""
                        }`
                    }
                    >
                    {({ isActive }) => (
                        <>
                        Wardrobe
                        <span
                            className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all duration-200 ${
                            isActive ? "w-full opacity-100" : "w-0 opacity-0"
                            }`}
                        />
                        </>
                    )}
                </NavLink>
            </div>
            <div className='relative'>
                <button onClick={()=> token ? setShowDropDown(!showDropDown) : navigate('/login')}>
                    <CircleUser size={35} className='text-[#2E2621] cursor-pointer'/>
                </button>
            </div>
            {showDropDown && token && (
                <div className='absolute right-0 top-15 w-48 bg-white border border-[#E8DED1] rounded-xl shadow-lg py-2 z-50'>
                    <p className='px-4 py-2 text-sm text-[#8A8072] border-b border-[#E8DED1]'>{user?.name}</p>
                    <button onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-sm text-[#2E2621] hover:bg-[#F8F4EE] transition-colors cursor-pointer'>
                        Logout
                    </button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar