import React from 'react'
import { Route, Routes } from 'react-router-dom'
import "./App.css"
import Home from './pages/Home'
import Profile from './pages/Profile'
function App() {
  return (
    <div className="containerr">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </div>
  )
}

export default App