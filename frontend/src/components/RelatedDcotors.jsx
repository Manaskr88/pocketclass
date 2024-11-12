import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { useNavigate } from 'react-router-dom'

const RelatedDcotors = ({ docId, speciality }) => {

    const { doctors } = useContext(Context)
    const [related, setRelated] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        if (doctors.length > 0 && speciality) {
            const docData = doctors.filter((doc) => doc.speciality === speciality && doc._id != docId)

            setRelated(docData)

        }

    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 md:mx-10 text-gray-800' >
            <h1 className='text-3xl font-medium'>
                Related Teachers
            </h1>

            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted teachers
            </p>

            <div className="grid gap-4 grid-cols-4 sm:justify-center gap-y-6 px-3 sm:px-0 pt-5 w-full overflow-scroll ">

                {related.slice(0, 5).map((item, index) => (

                    <div key={index} onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className="gap-2 border text-white hover:text-black bg-slate-900  hover:bg-white border-black rounded  overflow-hidden cursor-pointer hover:translate-y-[-10px] duration-300 transition-all  items-center pt-4 ">

                        <img className='w-1/2  rounded-3xl' src={item.image} />

                        <div className="p-4 ">
                            <div className={`${item.available ? 'text-green-600' : 'text-red-600'} flex items-center   gap-2 text-sm text-center `}>

                                <p className={` ${item.available ? 'bg-green-500 ' : 'bg-red-500'}  w-2 h-2   rounded lg:flex text-center`}></p>
                                <p className='text-center'>{item.available ? "Available" : "Not Available"}</p>
                            </div>

                            <p className='text-lg font-medium' >{item.name}</p>
                            <p className='text-sm hover:text-gray-500' >{item.speciality}</p>

                        </div>
                    </div>

                ))}



            </div>

            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-slate-500 text-white px-12 py-3 rounded-full mt-10' >More</button>

        </div>
    )
}

export default RelatedDcotors
