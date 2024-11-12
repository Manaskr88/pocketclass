import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets';

// import { assets } from '../../assets/assets_frontend/assets.js'
import { AdminContext } from './context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from './context/DoctorContext.jsx'


const login = () => {

    const [state, setState] = useState('Admin')
    const { setAToken, backendUrl } = useContext(AdminContext)

    const { setDToken } = useContext(DoctorContext)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // console.log(backendUrl);


    const submitHandler = async (event) => {

        event.preventDefault();

        try {

            if (state === 'Admin') {

                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })

                if (data.success) {
                    // console.log(data.token);
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                }
                else{
                    toast.error(data.message)
                }



            }

            else {
                

                const {data} = await axios.post(backendUrl + '/api/teacher/login' , {email , password})
                if (data.success) {
                    // console.log(data.token);
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    console.log(data.token);
                    
                }
                else{
                    toast.error(data.message)
                }


            }

        }

        catch (error) {

        }
    }



    return (

        <form onSubmit={submitHandler} className='min-h-[80vh] flex items-center'>

            <div className="flex flex-col gap-4 m-auto items-start p-8 shadow-lg min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm ">

                <p className='text-2xl font-semibold m-auto'>  <span className='text-slate-900'>{state}  </span> Login </p>

                {/* <span className='text-primary'>{state} Login </span> */}

                <div className='w-full '>
                    <p>Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='border w-full text-black border-[#DADADA] rounded p-2 m-1 ' type='email' required />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='border text-black w-full border-[#DADADA] rounded p-2 m-1 ' type='password' required />
                </div>

                <button className='bg-slate-900 w-full py-2 rounded-md  text-white'>Login</button>

                {state === 'Admin' ?
                    <p>Teacher Login ? <span onClick={() => setState('Teacher')} className='text-slate-900 underline cursor-pointer font-semibold'>Click here</span></p>
                    : <p>Admin Login ?  <span onClick={() => setState('Admin')} className='text-slate-900 underline cursor-pointer font-semibold'>Click here</span></p>
                }




            </div>



        </form>
    )
}

export default login;
