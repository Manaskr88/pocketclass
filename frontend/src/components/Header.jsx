import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
    return (
        <div className='flex  flex-col md:flex-row flex-wrap rounded-lg bg-slate-900 px-6 md:px-10 lg:px-20'>

            {/* left  */}
            <div className=" md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] ">

                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>Improve Yourself by learning <br /> With Trusted Teachers </p>

                <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                    <img className='w-28' src={assets.group_profiles} />
                    <p>Simply browse through our extensive list of trusted teachers,
                        schedule your appointment hassle-free.</p>
                </div>
                <a className='  flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm md:m-0 hover:scale-105 transition-all duration-300 '
                 href="#speciality">Book meeting
                    <img className='w-3' src={assets.arrow_icon} /></a>
            </div>



            {/* right  */}

            <div className='md:w-1/2 relative gap-16 '>
                {/* <img className=' w-full md:absolute bottom-0  rounded-lg px-20' src="https://imgs.search.brave.com/oEuya5Y91kqAQs0PZxKbkdY9niyiksyumFWcIpneRIA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzEvRG9j/dG9yLVBORy5wbmc" /> */}
                <img className=' w-full md:absolute bottom-[150px]  rounded-lg ' src={assets.football} />
            
            </div>
        </div>
    )
}

export default Header
