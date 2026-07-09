import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import {User} from 'lucide-react'

const Navbar = () => {

  return (
    <nav className='w-full border-b border-[#E8DED1] bg-[#F5F1EA]'>
        <div className='max-w-7xl mx-auto h-20 px-8 flex items-center justify-between'>
            <h1 className='font-serif text-4xl tracking-[0.25em] text-[#2E2621]'>Layrd</h1>
            <div className='flex items-center gap-12 text-[17px] text-[#4B4138]'>
                <Link to='/library'
                className="hover:text-[#2E2621] transition-colors">Library</Link>
                <Link to='/canvas'
                className="hover:text-[#2E2621] transition-colors">Canvas</Link>
                <Link to='/ai'
                className="hover:text-[#2E2621] transition-colors">AI Stylist</Link>
            </div>
            <div className='flex items-center gap-6'>
            <button>
                <User size={18} className='text-[#2E2621]'/>
            </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar