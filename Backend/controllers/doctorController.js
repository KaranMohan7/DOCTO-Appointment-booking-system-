import doctorModel from "../models/doctorModel.js";
import { getalldoctors } from "../services/doctorService.js";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import mongoose from "mongoose";

const checkavailability = async(req,res) => {
    try {
         const {id} =  req.body;
         const doctor = await doctorModel.findById(id);
         if(!doctor) return res.json({success: false, message: "Doctor Not found"})
         await doctorModel.findOneAndUpdate({_id: id}, {available: !doctor.available}, {new: true})
          res.json({success: true, message: "Successfully updated" })
    } catch (error) {
        res.json({success: false, message: error.message})
        console.log(error.message)
    }
}
 
const alldoctorsdoctor = async(req,res) => {
    try {
    const doctors = await getalldoctors();
    if(!doctors) return res.json({success: false, message: "Doctors not Found"});
    res.json({success: true, doctors})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}

const doctorlogin = async(req,res) => {

     try {
        const {email,password} = req.body;
     if(!email || !password){
        return res.json({success:false, message: "please enter something"})
     }
     if(!validator.isEmail(email)){
          return res.json({success: false, message: "Something went wrong"})
     }
     if(password.length < 8){
        return res.json({success: false, message: "enter a longer password"})
     }
     const emaildoctor = await doctorModel.findOne({email: email})
     if(!emaildoctor) return res.json({success: false, message: "Doctor not found"})

      const passwordcheck = await bcrypt.compare(password, emaildoctor.password)
      if(!passwordcheck) return res.json({success: false, message: "Something went wrong"})

       const doctortoken =  jwt.sign({id: emaildoctor._id}, process.env.JWT_KEY,  { expiresIn: "3d" });
       res.cookie("doctortoken",doctortoken, { httpOnly: true, secure: process.env.NODE_ENV === "production", expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), })

       res.json({success: true, message: "Logged in successfully"})
     } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
     }
     
}

const logoutdoctor = async(req,res) => {
      res.cookie("doctortoken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
      })
      res.json({success: true, message: "Logout Successfully"});
}

const checkauthdoctor = async(req,res) => {
    res.json({success: true, message: "Authorized"})
}


const doctorappointments = async(req,res) => {
     const {id} = req.user;  
     const mainappointment = await appointmentModel.find({"docdata._id": new mongoose.Types.ObjectId(id)})
     if(!mainappointment) return res.json({success:false, message: "Appointment not found"})
        res.json({success: true, mainappointment})
}

const tickappointment = async (req, res) => {
    try {
        const { id } = req.body;
        const doctid = req.user.id; 

        const appointment = await appointmentModel.findOne({ _id: id});
        if (!appointment) return res.json({ success: false, message: "Appointment not found or unauthorized" });
       
        if(appointment.docid === doctid){
            await appointmentModel.findByIdAndUpdate(id, { iscompleted: true, payment: true }, { new: true });
            res.json({ success: true, message: "Appointment marked as completed" });
        }
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const cancelappointment = async(req,res) => {
    try {
        const { id } = req.body;
        const doctid = req.user.id; 

        const appointment = await appointmentModel.findOne({ _id: id});
        if (!appointment) return res.json({ success: false, message: "Appointment not found or unauthorized" });
                                      
        if(appointment.docid === doctid){
            await appointmentModel.findByIdAndUpdate(id, { cancelled: true }, { new: true });
            res.json({ success: true, message: "Appointment marked as completed" });
        }
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const doctordashboard = async(req,res) => {
     try {
        const {id} = req.user;
         const appointments = await appointmentModel.find({docid: id})
         if(!appointments) return res.json({success: false, message: "appointments not found"});

            let earnings = 0;
            appointments.map((item,index) => {
                if(item.payment || item.iscompleted){
                    earnings += item.fees
                }
            })
            let patients = [];
            appointments.map((item,index) => {
                if(!patients.includes(item.userid)){
                    patients.push(item.userid)
                }
            })
     
            const maindata = {
                totalappointments: appointments.length,
                earnings,
                patients: patients.length,
                latestappointments: [...appointments].reverse().slice(0,5)
            }

            res.json({success: true, maindata})

     } catch (error) {
        res.json({ success: false, message: error.message });
     }
}

const doctorprofile = async(req,res) => {
     try {
         const {id} = req.user;
         const maindoctor = await doctorModel.findOne({_id: id}).select("-password");
         if(!maindoctor) return res.json({success: false, message: "Doctor not found"});

         res.json({success: true, maindoctor}) 
     } catch (error) {
        res.json({ success: false, message: error.message });
     }
}

 const updatedoctor = async(req,res) =>  {
      try {
         const {id, fees, available,address} = req.body;
         if(!fees  || !address) return res.json({success: false, message: "Invalid crediantials"})
         await doctorModel.findOneAndUpdate({_id: id}, {fees, available, address}, {new: true});
        res.json({success: true, message: "Update Successfully"})
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
 }

export { checkavailability,alldoctorsdoctor,doctorlogin, logoutdoctor, checkauthdoctor,doctorappointments,tickappointment,cancelappointment, doctordashboard, doctorprofile, updatedoctor}