import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'
// import React from 'react'

const DoctorDashboard = () => {


    const { dashData, getDashData, dToken , completeAppointment , cancelAppointment } = useContext(DoctorContext)

    const { slotDateFormat } = useContext(AppContext)

    useEffect(() => {

        if (dToken) {
            getDashData()
        }

    }, [dToken])


    return dashData && (
        <div className='m-5'>

            <div className="flex flex-wrap max-sm:w-10 gap-3">

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">

                    <img className='w-18' src={assets.earning_icon} />

                    <div className="">

                        <p className='text-xl font-semibold text-gray-600' >{dashData.earnings} $</p>
                        <p className='text-gray-400'>Earnings</p>

                    </div>

                </div>


                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">

                    <img className='w-18' src={assets.appointment_icon} />

                    <div className="">

                        <p className='text-xl font-semibold text-gray-600' >{dashData.appointments}</p>
                        <p className='text-gray-400' >Appointments</p>

                    </div>

                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">

                    <img className='w-18' src={assets.patients_icon} />
                    <div className="">

                        <p className='text-xl font-semibold text-gray-600' >{dashData.patient}</p>
                        <p className='text-gray-400'>Students</p>

                    </div>

                </div>

            </div>


            <div className=" bg-white ">

                <div className=" flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border ">

                    <img src={assets.list_icon} />
                    <p className='font-semibold' >Latest Bookings</p>

                </div>

                <div className="pt-4 border border-t-0 ">
                    {
                        dashData && dashData.latestAppointments.map((item, index) => (

                            <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 ">

                                <img className='w-10 rounded-full' src={item.userData.image} />

                                <div className="flex-1 text-sm">

                                    <p className='text-gray-800 font-medium' >{item.userData.name}</p>
                                    <p className='text-gray-600 ' >{slotDateFormat(item.slotDate)}</p>

                                </div>

                                {item.cancelled ?

                                    <p className='text-red-400 text-xs font-medium '>Cancelled</p>
                                    : item.isCompleted
                                        ? <p className='text-green-500 text-xs font-medium ' >Completed</p>
                                        :

                                        <div className="flex ">

                                            <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} />
                                            <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} />

                                        </div>

                                }


                            </div>
                        ))
                    }

                </div>
            </div>



        </div>
    )
}

export default DoctorDashboard





