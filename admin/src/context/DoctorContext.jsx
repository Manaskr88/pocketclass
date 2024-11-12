import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {




    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')

    const [appointments, setAppointments] = useState([])

    const [dashData , setDashData] = useState(false)

    const [profileData , setProfileData] = useState(false)


    const getAppointment = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/teacher/appointments', { headers: { dToken } })

            if (data.success) {
               
                setAppointments(data.appointments.reverse())
                console.log(data.appointments);
                
            }
            else {
                toast.error(data.message)

            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message)
        }

    }


    const completeAppointment = async (appointmentId) => {


        try {

            const { data } = await axios.post(backendUrl + '/api/teacher/complete-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {


                toast.success(data.message)
                getAppointment()

            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }

    }


    const cancelAppointment = async (appointmentId) => {


        try {

            const { data } = await axios.post(backendUrl + '/api/teacher/cancel-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {


                toast.success(data.message)
                getAppointment()

            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }

    }

    const getDashData = async()=>{
        try {

            const { data } = await axios.get(backendUrl + '/api/teacher/dashboard', { headers: { dToken } })

            if (data.success) {
                
                setDashData(data.dashData)
                console.log(data.dashData);

            }
            else {
                toast.error(data.message)
                console.error(data.message)

                
            }



            
        } catch (error) {
            toast.error(error.message)
            console.error(error.message)

            
        }
    }


    const getProfileData = async()=>{

        try {
            const { data } = await axios.get(backendUrl + '/api/teacher/profile', { headers: { dToken } })

            if (data.success) {
                
                setProfileData(data.profileData)
                console.log(data.profileData);

            }
            else {
                toast.error(data.message)
                console.error(data.message)

                
            }

            
        } catch (error) {

            toast.error(error.message)
            console.error(error.message)
            
        }
    }


    
    // const updateProfileData = async()=>{

    //     try {
    //         const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })

    //         if (data.success) {
                
    //             setProfileData(data.profileData)
    //             console.log(data.profileData);

    //         }
    //         else {
    //             toast.error(data.message)
    //             console.error(data.message)

                
    //         }

            
    //     } catch (error) {

    //         toast.error(error.message)
    //         console.error(error.message)
            
    //     }
    // }


    const value = {    // whatver we are passing it in here value , we cal access it anywhere
        dToken, setDToken, backendUrl , appointments , setAppointments, getAppointment , cancelAppointment , completeAppointment ,
         getDashData , dashData , setDashData , getProfileData , profileData , setProfileData
    }


    return (

        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )


}


export default DoctorContextProvider