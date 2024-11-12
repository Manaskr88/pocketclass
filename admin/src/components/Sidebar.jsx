import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)

    const { dToken } = useContext(DoctorContext)




    return (
        <div className='min-h-screen bg-white border-r'>
            { 
            aToken  && <ul className='text-[#515151] mt-5'>

                     <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/admin-dashboard'} >
                         <img src={assets.home_icon} />
                         <p className='hidden md:block' >Dashboard</p>
                     </NavLink>

                     <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/all-appointments'} >
                         <img src={assets.appointment_icon} />
                         <p className='hidden md:block' >Appointments</p>
                     </NavLink>

                     <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/add-teacher'}>
                         <img src={assets.add_icon} />
                         <p className='hidden md:block' >Add Teacher</p>
                     </NavLink>

                     <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/teacher-list'} >
                         <img  src={assets.people_icon} />
                         <p className='hidden md:block  ' >Teacher's List</p>
                     </NavLink>


            </ul>}

            { 
            dToken  && <ul className='text-[#515151]   mt-5'>

                     <NavLink className={({isActive})=> `flex ml-1 items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/teacher-dashboard'} >
                         <img src={assets.home_icon} />
                         <p className='hidden md:block'>Dashboard</p>
                     </NavLink>

                     <NavLink className={({isActive})=> `flex ml-1 items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/teacher-appointments'} >
                         <img src={assets.appointment_icon} />
                         <p className='hidden md:block'>Appointments</p>
                     </NavLink>

                     {/* <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/add-doctor'}>
                         <img src={assets.add_icon} />
                         <p>Add Doctor</p>
                     </NavLink> */}

                     <NavLink className={({isActive})=> `flex ml-2 items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${ isActive? 'bg-[#F2F3FF] border-r-4 border-slate-900' :'' }` } to={'/teacher-profile'} >
                         <img className=' ' src={assets.people_icon} />
                         <p className='hidden md:block'>Profile</p>
                     </NavLink>


            </ul>}
        </div>
    )
}

export default Sidebar
