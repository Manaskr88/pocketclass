import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className="flex md:text-sm flex-cols sm:grid grid-cols-[3fr_1fr_1fr] gap-24 my-10 mt-30 text-sm">
                {/* left  */}

                <div className=" mb-10 hidden md:block   ">
                    {/* <img className='w-1/6' src={assets.logoo1} /> */}
                    <p className='font-bold text-lg ' >PocketClass</p>
                    {/* <p className='w-full leading-6 mt-2 text-gray-600'> we believe that everyone deserves access to exceptional healthcare. Our mission is to deliver compassionate, personalized care that addresses the unique needs of each patient. We strive to create a welcoming environment that fosters trust, respect, and open communication. Learn more about our mission and values. </p> */}
                </div>




                {/* center  */}

                <div className="mt-6">
                    <p className='text-xl font-medium mb-5' >COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>

                    </ul>
                </div>


                {/* right */}
                <div className="mt-6">
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1-212-456-7890</li>
                        <li>pocket@gmail.com</li>

                    </ul>


                </div>

            </div>

            <div className="">
                <hr />
                <p className='py-5 text-sm text-center'>Copyright © 2024 Pocket By Manas - All Right Reserved.</p>
            </div>

        </div>
    )
}

export default Footer
