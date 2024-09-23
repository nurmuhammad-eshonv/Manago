import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate();
  return (
    <div>
       <button className='p-3 rounded-lg  bg-amber-500' onClick={() => navigate("/profile")}>Profile</button>
    </div>
  )
}

export default Home

