import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)


    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                name: profileData.name,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/teacher/update-profile', { updateData }, { headers: { dToken } });
            // Check if data is defined and contains the success property
            if (data && typeof data === 'object') {
                if (data.success) {
                    toast.success(data.message);
                    setIsEdit(false);
                    getProfileData(); // Fetch updated profile data
                } else {
                    toast.error(data.message || 'An error occurred while updating the profile.');
                }
            } else {
                toast.error('Unexpected response format from the server.');
            }

        } catch (error) {
            console.error('Error updating profile:', error); // Log the full error

            // Check if error.response exists and has a message
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to update profile. Please try again later.');
            }
        }
    };

    useEffect(() => {

        if (dToken) {
            getProfileData()
        }

    }, [dToken])

    return profileData && (
        <div>

            <div className="flex flex-col ml-10  gap-4 m-5">

                <div className="">

                    <img className='bg-slate-800/80 w-full  sm:max-w-64 rounded-lg' src={profileData.image} />

                </div>

                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
                        {isEdit ? <input onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} type="text" value={profileData.name} /> : profileData.name}</p>

                    <div className="flex items-center gap-2 mt-1 text-gray-500">

                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full' >{profileData.experience}</button>

                    </div>

                    <div className="">

                        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About :</p>
                        <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>
                            {isEdit ? <input onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type="text" value={profileData.about} /> : profileData.about}</p>


                    </div>

                    <p className='text-gray-600 font-medium mt-4 ' >Appointment fee: <span className='text-gray-800' >
                        {isEdit ? <input onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} type="number" value={profileData.fees} /> : profileData.fees} $ </span> </p>
{/* 
                    <div className="flex gap-2 py-2">
                        <p className='' >Address:</p>
                        <p className='text-sm' >
                            {isEdit ? <input onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))} type="text" value={profileData.address} /> : profileData.address}
                            <br />
                            {/* {profileData.address.line2} */}

                        {/* </p> */}
                    {/* </div> */} 


                    <div className="flex gap-1 pt-2 ">
                        <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" />
                        <label htmlFor='' >Available</label>
                    </div>

                    {
                        isEdit
                            ?
                            <button onClick={updateProfile} className='px-4 py-1 border border-slate-800 text-sm rounded-full mt-5 hover:bg-slate-800 hover:text-white transition-all ' >Save</button>
                            :

                            <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-slate-800 text-sm rounded-full mt-5 hover:bg-slate-800 hover:text-white transition-all ' >Edit</button>
                    }


                </div>

            </div>


        </div>
    )
}

export default DoctorProfile
