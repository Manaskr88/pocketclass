import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const { token, setToken, backendUrl } = useContext(Context)

  const navigate = useNavigate()


  const onSubmitt = async (event) => {

    event.preventDefault()

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }

        else {
          toast.error(data.message)
        }

      }

      else {
        // login 
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }

        else {
          toast.error(data.message)
        }


      }

    } catch (error) {

      toast.error(error.message)

    }

  }

  useEffect(()=>{
     if(token){
      navigate('/')
     }
  },[token])


  return (
    <form onSubmit={onSubmitt} className='min-h-[80vh] flex items-center'>


      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[300px] sm:min-w-96 border rounded-xl text-zinc-500 text-sm shadow-lg">
        <p className='text-2xl font-semibold text-slate-900' >{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please  {state === 'Sign Up' ? "sign up" : "log in"} to book appointment </p>

        {
          state === 'Login' ? '' :
            <div className="w-full">
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" placeholder='Enter your name' value={name} required onChange={(e) => setName(e.target.value)} />
            </div>
        }



        <div className="w-full">
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" placeholder='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" placeholder='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type='submit'  className='bg-primary text-white py-3 text-base rounded w-full'>{state === 'Sign Up' ? " Create Account" : "Login"}</button>
        {
          state === 'Sign Up' ?
            <p>Already have an account ? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login Here</span></p>
            :
            <p>Create a new account ? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click Here</span></p>
        }
      </div>






      ``
    </form>
  )
}

export default Login
