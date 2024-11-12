import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className=''>

      <h1 className='text-3xl font-medium text-center text-slate-900 mt-4'>CONTACT <span className='text-blue-500'> US</span></h1>

      <div className="mt-4 p-16   flex">

        <div className="px-4 ">

        {/* <img className='w-[500px] hidden md:block'  src={assets.contact_image} /> */}
        </div>

        <div className="flex-col flex gap-4  ml-8">
          <p className='text-bold font-medium text-xl '>OUR OFFICE</p>
          <p className='text-sm text-gray-500  mt-10'>54709 Willms Station <br/>
          Suite 350, Washington, USA</p>

          <p className='text-sm text-gray-500 leading-3 mt-12'>Tel: (415) 555‑0132</p>
          <p className='text-sm text-gray-500 leading-3'>Email: pocketclass@gmail.com</p>

          <p className='text-bold font-medium text-xl mt-8 '>Careers at POCKETCLASS</p>

          <p className='text-sm text-gray-500 leading-3 mb-4 mt-2'>Learn more about our teams and job openings</p>

          <button className='bg-blue-100 p-4 text-sm '>Explore Jobs</button>
        </div>
      </div>


    </div>
  )
}

export default Contact
