import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Detailes from "./pages/Detailes";
import MainLoyaut from "./loyauts/MainLoyaut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./context/ThemeContext";
import Folder from "./pages/Folder";
import Message from "./pages/Message";
import Errorpages from "./pages/Errorpages";
import Dosc from "./pages/Dosc";
import Cart from "./pages/Cart"

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <MainLoyaut>
              <Home />
            </MainLoyaut>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLoyaut>
              <Profile />
            </MainLoyaut>
          }
        />

        <Route
          path="/cart"
          element={
            <MainLoyaut>
              <Cart />
            </MainLoyaut>
          }
        />
        <Route
          path="/detailes"
          element={
            <MainLoyaut>
              <Detailes />
            </MainLoyaut>
          }
        />

        <Route
          path="/dosc"
          element={
            <MainLoyaut>
              <Dosc />
            </MainLoyaut>
          }
        />

        <Route
          path="/folders"
          element={
            <MainLoyaut>
              <Folder />
            </MainLoyaut>
          }
        />

        <Route
          path="/message"
          element={
            <MainLoyaut>
              <Message />
            </MainLoyaut>
          }
        />
        <Route
          path="*"
          element={
            <MainLoyaut>
              <Errorpages />
            </MainLoyaut>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
