import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

const Navbar = () => {

    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)
    // const [token, setToken] = useState(true)

    const { token, setToken, userData } = useContext(Context)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex text-center   items-center justify-between py-2 text-sm border-b border-b-gray-400  '>

            <Link to='/'>
                {/* <img className='w-24 cursor-pointer' src={assets.logoo1} /> */}
                <h1 className='cursor-pointer font-bold w-11 py-1 text-lg ' >PocketClass</h1>

            </Link>


            <ul className='md:flex gap-5 items-start font-medium hidden '>

                <NavLink to='/'>
                    <li className=' py-1'>HOME</li>
                    <  hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to='/teachers'>
                    <li className=' py-1'>ALL TEACHERS</li>
                    <  hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to='/about'>
                    <li className=' py-1'>ABOUT</li>
                    <  hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to='contact'>
                    <li className=' py-1'>CONTACT</li>
                    <  hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

{/*                 <NavLink to='https://medservee-admin.netlify.app/'>
                    <button className=' border border-gray-800 text-sm px-4 font-medium rounded-full py-1'>Admin panel</button>
                    <  hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink> */}

            </ul>

            <div className=" gap-4  flex items-center ">

                {/* checking token true so it will show other option on hover   */}

                {   /* using ternary operator  */
                    token ?

                        <div className=" flex gap-2 items-center cursor-pointer group relative ">
                            <img className='w-8 rounded-full ' src={userData.image} />
                            <img className='w-2.5 ' src={assets.dropdown_icon} />

                            {/* on hover it will show  */}

                            <div className=" md:absolute md:top-0   pt-14 text-base font-medium text-white hidden group-hover:block ">



                                <div className="  md:min-w-48 sm:pr-8 sm:text-sm  sm:w-4 bg-slate-500 rounded flex flex-col  gap-4 p-2 ">

                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>

                                    <p onClick={() => navigate('/my-appointment')} className='hover:text-black cursor-pointer'>My Booking</p>

                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>

                                </div>
                            </div>


                        </div>

                        //  if token is false it will show button 

                        : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 font-light  rounded-full hidden md:block'>
                            Create account
                        </button>
                }


            </div>

        </div>
    )
}

export default Navbar
