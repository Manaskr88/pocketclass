import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const [extend, setExtend] = useState(false)
    return (
        <div>


            <div className="md:hidden flex gap-4 text-center text-sm ">

                {
                    extend ?
                       

                            <img className='w-8 mt-2 mb-4  ' onClick={() => setExtend(false)} src={assets.cross_icon} />


                        :

                        <img onClick={() => setExtend(true)} className='w-8 mt-2 mb-4   ' src={assets.menu_icon} />

                }





                {
                    extend ? <ul className='md:hidden gap-5 items-start font-medium flex '>

                        <NavLink to='/'>
                            <li className=' py-1'>HOME</li>
                            <  hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                        </NavLink>

                        <NavLink to='/teachers'>
                            <li className='  py-1'>ALL TEACHERS</li>
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

                    </ul> : null
                }


            </div>


        </div>
    )
}

export default Sidebar
