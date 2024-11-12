import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointment = () => {

  const { backendUrl, token , getDoctorsData } = useContext(Context)
   const navigate = useNavigate()
  const [appointment, setAppointment] = useState([])


  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {

    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }





  const getUserAppointment = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointment', {
        headers: {
          token
        }

      });

      if (data.success && Array.isArray(data.appointment)) {
        setAppointment(data.appointment.reverse());
        console.log("Appointments fetched:", data.appointment);
      } else {
        console.log("No appointments found or data format is incorrect:", data);
      }

    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }

  }



  const cancelAppointment = async (appointmentId) => {


    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointment()
        getDoctorsData()
      }
      else {
        toast.error(data.message)
      }

    }
    catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  }



  useEffect(() => {

    if (token) {
      getUserAppointment()
    }

  }, [token ])

  return (
    <div>

      <p className='pb-3 mt-10 font-medium text-slate-900 bordeer-b'>My Bookings</p>

      <div className="">

        {appointment.map((item, index) => (

          <div key={index} className=" grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">

            <div className="">

              <img className='w-32 bg-slate-900 rounded-full' src={item.docData.image} />
            </div>

            <div className=" flex-1 text-sm text-slate-700">

              <p className='text-slate-900 font-semibold '>{item.docData.name}</p>
              <p className='underline text-slate-800'>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1 '>Address:</p>
              <p className='text-xs '>{item.docData.address.line1}</p>
              <p className='text-xs '>{item.docData.address.line2}</p>
              <p className='mt-2 text-xs'><span className='text-sm font-medium text-slate-700 mt-2'>Date & Time : </span> {slotDateFormat(item.slotDate)}| {item.slotTime} </p>

            </div>

            <div className="">

            </div>


            <div className=" flex flex-col gap-2 justify-end">
              { !item.cancelled && !item.isCompleted && <button onClick={()=>navigate('/pay')} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Booking</button>}
               
               {item.cancelled && !item.isCompleted &&  <button className='text-sm border border-red-500 py-2 text-red-700 sm:min-w-48'>Booking cancelled</button>}
                
                {item.isCompleted && <button className=' sm:min-w-48 py-2 border border-green-500 rounded  text-sm text-green-600 font-medium' >Completed</button> }
               </div>


          </div>



        ))}

      </div>

    </div>
  )
}

export default MyAppointment
