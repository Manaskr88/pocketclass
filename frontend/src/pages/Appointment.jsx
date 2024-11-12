import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../context/Context'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDcotors from '../components/RelatedDcotors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {


  const navigate = useNavigate()
  const { docId } = useParams()

  const { doctors, backendUrl, token, getDoctorsData } = useContext(Context)
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']



  const [docInfo, setDocInfo] = useState(null)

  const [slots, setSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState(' ')

  const fetchDoc = async () => {

    const docInfo = doctors.find(doc => doc._id === docId)

    if (!docInfo) {
      console.error(`No doctor found with id: ${docId}`);
  }

    setDocInfo(docInfo)


  }
  // console.log(docInfo);


  const availableSlots = async () => {

   

    setSlots([])  // to make it blank

    let today = new Date()   // current date 

    for (let i = 0; i < 7; i++) {  // getting date with index 

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of date

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)   // three zeroes for hour minute zeroes , 21 means 9'O clock


      // setting hours

      if (today.getDate() === currentDate.getDate()) {

        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)   // jis time se shuru h slot tbhi se dikhaenge

        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)  // getting 30 minutes interval

      }

      else {

        currentDate.setHours(10);
        currentDate.setMinutes(0)

      }

      let timeSlots = []

      while (currentDate < endTime) {

        let formatted = currentDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formatted

        const isSlotAvailable = !docInfo.slots_booked[slotDate] || !docInfo.slots_booked[slotDate].includes(slotTime)


        if (isSlotAvailable) {

          // adding slots to array 

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formatted
          })
        }




        // increment timwe by 30 minutes 

        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }

      setSlots(prev => ([...prev, timeSlots]))


    }

  }

   

  const bookAppointment = async () => {

    if (!token) {
      toast.warn("Login to book ");
      return navigate('/login');
    }

    try {
      // Check if slots is defined and slotIndex is within bounds

      if (!slots) {
        console.error("Invalid slots or slotIndex");
        return;
      }

      // Access the selected slot

      const selectedSlot = slots[slotIndex][0];


      // Ensure selectedSlot is an object with a datetime property

      if (!selectedSlot || !selectedSlot.datetime) {

        console.error("Invalid slot selected:", selectedSlot);
        toast.error("Invalid slot selected.");
        return;
      }

      // Use the datetime property as the date

      const date = selectedSlot.datetime;

      // Log the date value
      // console.log("Using date:", date);

      let day = date.getDate();
      let month = date.getMonth() + 1; // Months are zero-based
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });


      if (data.success) {
        toast.success(data.message);
        getDoctorsData(); // Assuming this function updates your doctor data
        navigate('/my-appointment');

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Error booking appointment:", error); // Log the error for debugging
      toast.error(error.message || "An error occurred while booking the appointment.");
    }
  };

  useEffect(() => {

    fetchDoc()

  }, [docId, doctors])


  useEffect(() => {

    availableSlots()

  }, [docInfo])

  useEffect(() => {

    console.log(slots);


  }, [slots])






  return docInfo && (
    <div>

      {/* details  */}

      <div className="flex flex-col sm:flex-row gap-4">

        <div className="">

          <img className='bg-slate-900 w-full sm:max-w-72 rounded-lg' src={docInfo.image} />

        </div>

        <div className=" flex-1 border border-gray-700 rounded-lg p-8 py-7">
          {/* info  */}

          <p className='text-3xl flex text-center gap-2'> {docInfo.name} <img src={assets.verified_icon} /> </p>

          <div className="flex items-center mt-2  flex-col  sm:flex-row gap-4">

            <p className=' text-gray-600 '> {docInfo.degree} - {docInfo.speciality}</p>

            <button className='bg-blue-100 rounded-full px-2'> {docInfo.experience}</button>

          </div>

          {/* about  */}

          <div className=" ">

            <p className='flex flex-col sm:flex-row text-sm mt-4 md:flex-row font-bold gap-2 mb-1'> About <img className='max-w-10' src={assets.info_icon} /></p>

            <p className='text-gray-700 leading-tight'> {docInfo.about}</p>

            <p className='flex flex-col sm:flex-row mt-4 gap-2'> Booking Fee :  </p>
            <p className='font-bold '> {docInfo.fees} $ </p>

          </div>



        </div>
      </div>



      {/* booking  */}

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>

        <div className=" flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            slots.length && slots.map((item, index) => (

              <div onClick={() => setSlotIndex(index)} key={index} className={`sm:text-center px-6 p-2 min-w-16 rounded-full ${slotIndex === index ? "bg-slate-900 text-white " : 'border border-gray-200'} cursor-pointer`}>

                <p className='md:font-medium'>{item[0] && days[item[0].datetime.getDay()]}</p>

                <p>{item[0] && item[0].datetime.getDate()}</p>

              </div>
            ))
          }
        </div>

        <div className=" flex items-center gap-3 w-full overflow-x-scroll mt-4">

          {slots.length && slots[slotIndex].map((item, index) => (

            <p onClick={() => setSlotTime(item.time)} className={` text-sm font-light flex-shrink-0 px-5 py-2 cursor-pointer  rounded-full  ${item.time === slotTime ? "bg-slate-900 text-white" : " text-gray-400 border border-gray-300"} `} key={index} >
              {item.time.slice(11).toLowerCase()}
            </p>
          ))}


        </div>

        <button onClick={bookAppointment} className='bg-slate-900 text-white text-sm font-light px-10 py-3 rounded-full my-6 ' >Book an meeting</button>
      </div>

      <RelatedDcotors docId={docId} speciality={docInfo.speciality} />

    </div>
  )
}

export default Appointment
