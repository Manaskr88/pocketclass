import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className='flex  flex-col md:flex-row flex-wrap rounded-lg bg-slate-900 px-6 md:px-10 lg:px-20'>

            {/* left  */}
            <div className=" md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] ">

                <p className='text-3xl md:text-4xl mb-4 lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>Meet Our CEO <br /> who made this possible </p>

                
                <NavLink to='/about'  className='  flex items-center gap-2  bg-primary px-8 py-3 rounded-full text-white text-sm md:m-0 hover:scale-105 transition-all duration-300 '
                 >Learn More...
                    <img className='w-3' src={assets.arrow_icon} /></NavLink>
            </div>



            {/* right  */}

            <div className='md:w-1/2   relative gap-16 lg:w-[500px] '>
                <img className=' md:w-[68%] sm:w-[70%]   sm:absolute sm:bottom-0 sm:right-0  rounded-lg px-20' src={assets.manas1} />
            </div>
        </div>
  )
}

export default Banner
