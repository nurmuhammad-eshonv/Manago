import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Cart from "./pages/Cart";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            token ? (
              <MainLoyaut>
                <Home />
              </MainLoyaut>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            token ? (
              <MainLoyaut>
                <Profile />
              </MainLoyaut>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/cart"
          element={
            token ? (
              <MainLoyaut>
                <Cart />
              </MainLoyaut>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/detailes"
          element={
            token ? (
              <MainLoyaut>
                <Detailes />
              </MainLoyaut>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dosc"
          element={
            token ? (
              <MainLoyaut>
                <Dosc />
              </MainLoyaut>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/folders"
          element={
            token ? (
              <MainLoyaut>
                <Folder />
              </MainLoyaut>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/message"
          element={
            token ? (
              <MainLoyaut>
                <Message />
              </MainLoyaut>
            ) : (
              <Navigate to="/login" />
            )
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
