import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets_frontend/assets'
import { Context } from '../context/Context'
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyProfile = () => {

  // const [userData, setUserData] = useState({
  //   name: "John Carlos",
  //   image: assets.profile_pic,
  //   email: 'johncarloss@gmail.com',
  //   phone: ' +1 987 223 6787',
  //   address: {
  //     line1: "56th Cross Road Sydney",
  //     line2: "Chuch road , Austrailia"
  //   },
  //   gender: 'Male',
  //   dob: '1998-02-06'
  // })

  const { userData, setUserData, token, backendUrl, loadUser } = useContext(Context)


  const [edit, setEdit] = useState(false)
  const [image, setImage] = useState(false)


  const updateUserProfile = async () => {

    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)  // we can leave this data to update 


      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {

        toast.success(data.message)
        await loadUser()
        setEdit(false)
        setImage(false)

      }
      else {
        toast.error(data.message)
      }




    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }

  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm '>

      {
        edit ?
          <label htmlFor='image'>

            <div className="inline-block cursor-pointer relative">

              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} />
              <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} />

            </div>

            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />

          </label> :
          <img className='w-36 rounded' src={userData.image} />
      }



      {edit ?
        <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 ' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />

        : <p className='font-medium text-3xl text-neutral-800  mt-4 '>{userData.name}</p>


      }


      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div className="  ">

        <p className='text-neutral-500 underline mt-3'> CONTACT INFORMATION</p>

        <div className=" grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800 ">

          <p className='font-medium '>Email id :</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'> Phone:</p>

          {edit ?
            <input className='bg-gray-100 max-w-52' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />

            : <p className='text-blue-500'>{userData.phone}</p>


          }

          <p className='font-medium'>Address:</p>
          {
            edit ?
              <p>
                <input className='bg-gray-100' type="text" value={userData.address.line1} onChange={e => setUserData(prev => ({ ...prev.address, line1: e.target.value }))} />
                <br />
                <input className='bg-gray-100' type='text' value={userData.address.line2} onChange={e => setUserData(prev => ({ ...prev.address, line2: e.target.value }))} />
              </p>
              :
              <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>

      </div>

      <div className="">

        <p className='text-neutral-500 underline mt-3' >BASIC INFORMATION</p>

        <div className=" grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-800">
          <p className='font-medium'>Gender:</p>

          {edit ?

            <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}>

              <option value="Male">Male</option>
              <option value="Female">Female</option>

            </select>

            : <p className='text-gray-500'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {edit ?
            <input className='bg-gray-100 max-w-28' type='date' value={userData.dob} onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} />

            : <p className='text-gray-500'>{userData.dob}</p>
          }



        </div>


      </div>


      <div className=" mt-10 ">
        {edit ?
          <button className='border hover:bg-primary transition-all hover:text-white border-primary px-8 py-2 rounded-full' onClick={updateUserProfile}>Save information</button>
          :
          <button className='border hover:bg-primary transition-all hover:text-white border-primary px-8 py-2 rounded-full' onClick={() => setEdit(true)}>Edit </button>
        }
      </div>









    </div>
  )
}

export default MyProfile
