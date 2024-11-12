import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from "react-toastify";

export const Context = createContext()

const ContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)


    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/teacher/list')
            if (data.success) {
                setDoctors(data.doctors)

            }
            else {
                toast.error(data.message)
            }



        } catch (error) {
            console.log(error);
            toast.error(error.message)


        }

    }


    const loadUser = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/user/get-profile', { headers: {token} })

            if (data.success) {
                setUserData(data.userData);

            }
            else {
                toast.error(data.message)
            }


        } catch (error) {

            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        token, setToken, backendUrl , userData , setUserData ,loadUser , getDoctorsData


    }

    useEffect(() => {
        getDoctorsData()
    }, [])


    useEffect(() => {
        if (token) {

            loadUser()
        }
        else{
            setUserData(false)
        }
    }, [token])

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider 