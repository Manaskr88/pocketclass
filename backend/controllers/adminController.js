import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"




// api for adding doctors


const addDoctor = async (req, res) => {
    try {

        const { name, email, speciality, about, address, fees, password, degree, experience } = req.body

        const imageFile = req.file

        // console.log( {name , email , speciality , about , address , fees , password , degree , experience ,imageFile });

        // checking for all data to doctor
        if (!name || !email || !password || !speciality || !about || !address || !fees || !degree || !experience) {

            return res.json({ success: false, message: "missing details" })
        }

        // validating email format

        if (!validator.isEmail(email)) {

            return res.json({ success: false, message: "please enter valid email" })
        }

        if (password.length < 8) {

            return res.json({ success: false, message: "please enter strong password" })
        }


        // bcrypting password
        // hashing doctor password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        // uploading image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url


        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()   // saving our doctor data in doctorModel 

        res.json({ success: true, message: "doctor added" })



    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// api for admin login

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {


            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            res.json({ success: true, token })



        }

        else {
            res.json({ success: false, message: "Invalid Credentials" })

        }


    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }

}


// api to get all doctors list in admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    }

    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


// api for get all appointment

const appointmentAdmin = async (req, res) => {

    try {

        const appointment = await appointmentModel.find({})
        res.json({ success: true, appointment })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// cancel appointment from admin

const appointmentCancel = async (req, res) => {

    try {

        const {  appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

     

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // releasing docSlots

        const {docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api for dashboard for admin

const adminDashboard = async(req,res)=>{

    try {

       const doctors = await doctorModel.find({})
       const users = await userModel.find({})
       const appointments = await appointmentModel.find({})

       const dashData = {
        doctors : doctors.length,
        appointments : appointments.length,
        patient: users.length,
        latestAppointments  : appointments.reverse().slice(0,5)
       }

       res.json({success:true , dashData})

         
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin, allDoctors , appointmentAdmin , appointmentCancel , adminDashboard }