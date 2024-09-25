import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function MainLoyaut({ children }) {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-grow">
        <Header />
        <main className="">{children}</main>
      </div>
    </div>
  );
}

export default MainLoyaut;
