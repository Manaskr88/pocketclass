import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {


    const { doctors, getAllDoctors, aToken , changeAvailability } = useContext(AdminContext)

    useEffect(() => {

        if (aToken) {
            getAllDoctors()
        }

    }, [aToken ])

    return (

        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Teachers</h1>
            <div className=" flex flex-wrap w-full gap-4 pt-5 gap-y-6">
                {
                    doctors.map((doctor , index) => (

                        <div key={index} className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
                            <img className='bg-indigo-50 group-hover:bg-slate-900 transition-all duration-500' src={doctor.image} />
                            <div className="p-4">
                                <p className='text-neutral-900 text-lg font-medium'>{doctor.name}</p>
                                <p className='text-zinc-600 text-sm '>{doctor.speciality}</p>

                                <div className="mt-2 flex items-center gap-1 text-sm">
                                    <input onChange={()=>changeAvailability(doctor._id)} type='checkbox' checked={doctor.available} />
                                    <p>Available</p>
                                </div>

                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsList
