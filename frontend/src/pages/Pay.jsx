import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Pay = () => {
    const navigate = useNavigate()

    return (
        <div className=''>


            <img onClick={()=> navigate('/my-appointment') } className=' cursor-pointer w-12 mt-2 px-2 py-2' src={assets.arrow_icon} />

            <div className="flex flex-col  items-center justify-center mt-4 px-2 py-2">
                 <h1 className='font-bold  text-xl '>Pay Here</h1>
                <img className=' flex items-center justify-center mt-2 px-2 py-2 sm:w-[250px]' src={assets.pay} />
            </div>
        </div>
    )
}

export default Pay
