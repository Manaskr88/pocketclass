import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pay from './pages/Pay'

// import login from '../../admin/src/Login'



const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      

      <ToastContainer/>

      <Navbar/>

      <Routes>

       <Route path='/' element={<Home/>}   />

       <Route path='/teachers' element={<Doctors/>}   />
       <Route path='/teachers/:speciality' element={<Doctors/>}   />

       <Route path='/contact' element={<Contact/>}   />
       <Route path='/login' element={<Login/>}   />
       <Route path='/about' element={<About/>}   />
       <Route path='/my-profile' element={<MyProfile/>}   />
       <Route path='/my-appointment' element={<MyAppointment/>}   />

       <Route path='/appointment/:docId' element={<Appointment/>}  />

       <Route path='/pay' element={<Pay/>} />

       {/* <Route path='/login' element={<Login/>}  /> */}

      

       


      </Routes>
      
      <Footer/>
      
    </div>
  )
}

export default App
