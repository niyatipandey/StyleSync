import React from 'react'
import {Route , Routes , Navigate} from 'react-router-dom'
import Login from './pages/Login'
import { useState } from 'react'
import Register from './pages/Register'

const App = () => {
  
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default App