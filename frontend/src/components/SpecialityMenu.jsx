import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800' >
      {/* <h1 className='text-3xl font-medium'>
        Find by Speciality
      </h1>

      <p className='w-1/3 text-center text-sm'>
      Simply browse through our extensive list of trusted teachers, schedule your appointment hassle-free.
      </p>

      <div className="flex gap-4 sm:justify-center pt-5 w-full overflow-scroll ">
        
        {specialityData.map((item , index)=>(

          <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-300' key={index} to={`/doctors/${item.speciality}`}>

            <img className='w-10 sm:w-24 mb-2' src={item.image} />
            <p> {item.speciality} </p>

          </Link>

        ))}

      </div> */}
      
    </div>
  )
}

export default SpecialityMenu
