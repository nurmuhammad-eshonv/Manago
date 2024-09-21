import React from 'react'
<<<<<<< HEAD

function Home() {
  return (
    <div>
      Home
=======
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate();
  return (
    <div>
       <button className='p-3 rounded-lg  bg-amber-500' onClick={() => navigate("/profile")}>Profile</button>
>>>>>>> 19c933de68a70bd57abd822bf42cb82496393a1d
    </div>
  )
}

<<<<<<< HEAD
export default Home
=======
export default Home
>>>>>>> 19c933de68a70bd57abd822bf42cb82496393a1d
