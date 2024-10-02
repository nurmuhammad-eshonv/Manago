// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Detailes from "./pages/Detailes";
// import MainLoyaut from "./loyauts/MainLoyaut";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { ThemeProvider } from "./context/ThemeContext";
// import Folder from "./pages/Folder";
// import Message from "./pages/Message";
// import Errorpages from "./pages/Errorpages";
// import Dosc from "./pages/Dosc";
// import Cart from "./pages/Cart";
// import { useAppStore } from "./zustand";

// function App() {
//   const user = useAppStore((state) => state.user);
//   console.log(user);

//   return (
//     <ThemeProvider>
//       {user ? (
//         <Routes>
//           <>
//             <Route
//               path="/"
//               element={
//                 <MainLoyaut>
//                   <Home />
//                 </MainLoyaut>
//               }
//             />

//             <Route
//               path="/profile"
//               element={
//                 <MainLoyaut>
//                   <Profile />
//                 </MainLoyaut>
//               }
//             />

//             <Route
//               path="/cart"
//               element={
//                 <MainLoyaut>
//                   <Cart />
//                 </MainLoyaut>
//               }
//             />

//             <Route
//               path="/detailes/:id"
//               element={
//                 <MainLoyaut>
//                   <Detailes />
//                 </MainLoyaut>
//               }
//             />

//             <Route
//               path="/dosc"
//               element={
//                 <MainLoyaut>
//                   <Dosc />
//                 </MainLoyaut>
//               }
//             />

//             <Route
//               path="/folders"
//               element={
//                 <MainLoyaut>
//                   <Folder />
//                 </MainLoyaut>
//               }
//             />

//             <Route
//               path="/message"
//               element={
//                 <MainLoyaut>
//                   <Message />
//                 </MainLoyaut>
//               }
//             />
//           </>

//           <Route
//             path="*"
//             element={
//               <MainLoyaut>
//                 <Errorpages />
//               </MainLoyaut>
//             }
//           />
//         </Routes>
//       ) : (
//         <Navigate to={"/login"} />
//       )}

//       {!user && (
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       )}
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { useAppStore } from "./zustand";

function App() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!user && currentPath !== "/register") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <ThemeProvider>
      {user ? (
        <Routes>
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
            path="/detailes/:id"
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
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
