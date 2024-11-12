import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {


    const [docImage, setDocImage] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('! Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Violin')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')



    const { aToken, backendUrl } = useContext(AdminContext);

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            if (!docImage) {

                return toast.error('Image not selected')
            }


            const formData = new FormData();

            formData.append('image' , docImage )
            formData.append('name' , name )
            formData.append('email' , email )
            formData.append('password' , password )
            formData.append('experience' , experience )
            formData.append('fees' , Number(fees) )
            formData.append('about' , about )
            formData.append('speciality' , speciality )
            formData.append('degree' , degree )
            formData.append('address' , JSON.stringify({line1 : address1 , line2: address2}) )

            // form data

            formData.forEach((value , key)=>{
                console.log(`${key} : ${value} `);
                
            })

            // saving data to database

            const {data} = await axios.post(backendUrl + '/api/admin/add-teacher' , formData , {headers:{aToken}} )
            
            if(data.success){
                toast.success("Teacher added")

                setDocImage(false)
                setName('')
                setPassword('')
                setAddress1('')
                setAddress2('')
                setAbout('')
                setEmail('')
                setFees('')
                setDegree('')
                
            }
            else{
                toast.error(data.message)
            }


        }
         catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }




    }








    return (
        <form onSubmit={submitHandler} className='m-5 w-full'>
            <p className='text-lg  mb-3 font-medium'>Add Teacher</p>

            <div className=" bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">

                <div className=" flex items-center gap-4 mb-8 text-gray-600">

                    <label htmlFor='doc-img'>
                        <img className='w-16  bg-gray-100 cursor-pointer rounded-full' src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} />
                    </label>

                    <input type='file' onChange={(e) => setDocImage(e.target.files[0])} hidden id='doc-img' />

                    <p>Upload teacher <br />  picture</p>

                </div>


                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className=" w-full lg:flex-1 flex flex-col gap-4">

                        <div className=" flex-1 flex flex-col gap-1">
                            <p>Teacher name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Name' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Teacher Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type='email' placeholder='Email' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Teacher Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type='password' placeholder='Password' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Experience</p>

                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2'>
                                <option value="1 Year"> 1 Year</option>
                                <option value="2 Year"> 2 Year</option>
                                <option value="3 Year"> 3 Year</option>
                                <option value="4 Year"> 4 Year</option>
                                <option value="5 Year"> 5 Year</option>
                                <option value="6 Year"> 6 Year</option>
                                <option value="7 Year"> 7 Year</option>
                                <option value="8 Year"> 8 Year</option>
                                <option value="9 Year"> 9 Year</option>
                                <option value="10 Year"> 10 Year</option>


                            </select>
                        </div>


                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' placeholder='fees' required />
                        </div>



                    </div>


                    <div className="w-full lg:flex-1 flex flex-col gap-4 ">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>

                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
                                <option value="Violin"> Violin </option>
                                <option value="Basketball"> Basketball </option>
                                <option value="Swimming"> Swimming </option>
                                <option value="Football"> Football </option>
                                <option value="Golf"> Golf </option>
                                <option value="Volleyball"> Volleyball </option>
                                <option value="Piano"> Piano </option>


                            </select>
                        </div>



                        <div className="flex-1 flex flex-col gap-1">
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type='text' placeholder='Education' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type='text' placeholder='Address 1' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type='text' placeholder='Address 2' required />

                        </div>
                    </div>


                </div>



                <div className="">
                    <p className='mt-4 mb-2'>About teacher</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='About' rows={5} required />
                </div>

            </div>
            <button type='submit' className='text-sm bg-slate-900 text-white px-10 cursor-pointer py-3 mt-4 rounded-full'>Add teacher</button>




        </form>
    )
}

export default AddDoctor
