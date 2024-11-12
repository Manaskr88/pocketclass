import React, { useContext } from 'react'
import Login from './Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { AppContext } from './context/AppContext';
import { AdminContext } from './context/AdminContext';
import Nabar from './components/Nabar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import Home from './pages/Home';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)


  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>

      
      <ToastContainer />
      <Nabar/>

      <div className="flex items-start">
        
        <Sidebar/>

        <Routes>
            {/* admin  */}
          <Route path='/' element={<Home/>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointment/>} />
          <Route path='/add-teacher' element={<AddDoctor/>} />
          <Route path='/teacher-list' element={<DoctorsList/>} />


              {/* doctor  */}
          <Route path='/teacher-dashboard' element={<DoctorDashboard/>} />
          <Route path='/teacher-appointments' element={<DoctorAppointment/>} />
          <Route path='/teacher-profile' element={<DoctorProfile/>} />




        </Routes>

      </div>

    </div>
  ) :
    (
      <>
        <Login />

        <ToastContainer />
      </>
    )
}

export default App
