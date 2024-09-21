<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Detailes from "./pages/Detailes";
import MainLoyaut from "./loyauts/MainLoyaut";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <MainLoyaut>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detailes" element={<Detailes />} />
        </Routes>
      </MainLoyaut>
    </ThemeProvider>
  );
}

export default App;
=======
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
>>>>>>> 19c933de68a70bd57abd822bf42cb82496393a1d
