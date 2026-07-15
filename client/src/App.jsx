import React from 'react'
import {Route , Routes , Navigate} from 'react-router-dom'
import Login from './pages/Login'
import { useState } from 'react'
import Register from './pages/Register'
import Library from './pages/Library'
import Canvas from './pages/Canvas'
import Wardrobe from './pages/Wardrobe'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({children})=>{
    const {token} = useContext(AuthContext);

    if(!token){
      return <Navigate to='/login' />
    }
    return children;
  }
  

const App = () => {
  return (
    <>
      <Toaster position="top-right"/>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/library' element={<Library />}/>
        <Route path='/canvas' element={
          <ProtectedRoute>
            <Canvas />
          </ProtectedRoute>
        }
        />
        <Route path='/wardrobe' element={
          <ProtectedRoute>
            <Wardrobe />
          </ProtectedRoute>
        }
        />
      </Routes>
    </>
  )
}

export default App