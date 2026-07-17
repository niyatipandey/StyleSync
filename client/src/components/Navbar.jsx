import React, { useContext,useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {CircleUser, Menu, X} from 'lucide-react'
import AuthContext from '../context/AuthContext'

const Navbar = () => {

    const {token,user,logout} = useContext(AuthContext)
    const [showDropDown, setShowDropDown] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = ()=>{
        logout();
        setShowDropDown(false);
        navigate('/login')
    }

  return (
    <nav className='w-full border-b border-[#E8DED1] bg-[#F5F1EA]'>
        <div className='max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
            <h1 className='font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em]'>Layrd</h1>
            <div className='hidden md:flex items-center gap-12 text-[17px] text-[#4B4138]'>
                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                    `relative ${
                        isActive
                        ? "font-bold text-[#4B4138]"
                        : "text-[#2E2621] hover:text-[#E7C76A]"
                    }`}>
                    Library
                </NavLink>
                <NavLink
                    to="/canvas"
                    className={({ isActive }) =>
                    `relative ${
                        isActive
                        ? "font-bold text-[#4B4138]"
                        : "text-[#2E2621] hover:text-[#E7C76A]"
                    }`}>
                    Canvas
                </NavLink>
                <NavLink
                    to="/wardrobe"
                    className={({ isActive }) =>
                    `relative ${
                        isActive
                        ? "font-bold text-[#4B4138]"
                        : "text-[#2E2621] hover:text-[#E7C76A]"
                    }`}>
                    Wardrobe
                </NavLink>
            </div>
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden items-center">
                    {menuOpen ? (
                        <X size={30} className="text-[#2E2621]" />
                    ) : (
                        <Menu size={30} className="text-[#2E2621]" />
                    )}
                </button>
                <div className='relative'>
                    <button onClick={()=> token ? setShowDropDown(!showDropDown) : navigate('/login')}>
                        <CircleUser size={35} className='text-[#2E2621] cursor-pointer'/>
                    </button>
                </div>
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
        {menuOpen && (
            <div className="md:hidden border-t border-[#E8DED1] bg-[#F5F1EA]">
                <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">

                <NavLink
                    to="/library"
                    className="py-2 text-[#4B4138] hover:text-[#2E2621]"
                    onClick={() => setMenuOpen(false)}
                >
                    Library
                </NavLink>

                <NavLink
                    to="/canvas"
                    className="py-2 text-[#4B4138] hover:text-[#2E2621]"
                    onClick={() => setMenuOpen(false)}
                >
                    Canvas
                </NavLink>

                <NavLink
                    to="/wardrobe"
                    className="py-2 text-[#4B4138] hover:text-[#2E2621]"
                    onClick={() => setMenuOpen(false)}
                >
                    Wardrobe
                </NavLink>

                </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar