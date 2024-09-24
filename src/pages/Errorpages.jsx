import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function Errorpages() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className='mx-auto w-[700px] p-20 flex flex-col gap-5 justify-center'>
      <h1 className='text-center text-[brown] text-[35px] '>There is no such page on our site!</h1>
      <p className='text-center text-[green] text-[28px]'>To go back, press the back button or click the logo of the site to return to the main page!</p>
      <button 
        onClick={handleGoBack} 
        className="btn btn-outline btn-success transition-all duration-1000 flex items-center w-40 mx-auto"
      >
        <BiArrowBack /> Back
      </button>
    </div>
  )
}

export default Errorpages;
