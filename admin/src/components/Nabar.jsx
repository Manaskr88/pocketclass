import React, { useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const Nabar = () => {

    const {aToken , setAToken} = useContext(AdminContext)

    const {dToken , setDToken} = useContext(DoctorContext)



    const logout = ()=>{
             navigate('/')
             aToken && setAToken('')
             aToken && localStorage.removeItem('aToken')
             dToken && setDToken('')
             dToken && localStorage.removeItem('dToken')
    }

    const navigate = useNavigate('')

  return (
    <div className='flex justify-between px-4 sm:px-10 py-3 border-b bg-white items-center'>

      <div className="flex items-center text-sm gap-2">

        <h1 onClick={()=>navigate('/')} className=' font-bold text-xl cursor-pointer' > PocketClass </h1>
        <p className='border px-2.5 py-0.6 rounded-full border-gray-500 text-gray-600 '>
           {aToken? 'Admin' : 'Doctor' }
        </p>

      </div>

      <button onClick={logout} className='bg-slate-900 text-sm px-10 py-2 rounded-full text-white'>Logout</button>

    </div>
  )
}

export default Nabar
