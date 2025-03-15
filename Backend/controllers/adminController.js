import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import {getalldoctors} from '../services/doctorService.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      about,
      speciality,
      degree,
      fees,
      address,
      experience,
    } = req.body;
    const filename = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !about ||
      !speciality ||
      !degree ||
      !fees ||
      !address ||
      !experience
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const emailmain = await doctorModel.findOne({ email: email });

    if (emailmain) {
      return res.json({ success: false, message: "something went wrong" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Increase the length of passwored",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const imageupload = await cloudinary.uploader.upload(filename.path, {
      resource_type: "image",
    });
    const imageurl = imageupload.secure_url;

    const formmaindata = {
      name,
      email,
      password: hashedpassword,
      about,
      speciality,
      image: imageurl,
      degree,
      fees,
      address,
      experience,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(formmaindata);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Created Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error Happened" });
  }
};

const adminlogin = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
   
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const admintoken = jwt.sign({email: email, role: process.env.ADMIN_ROLE}, process.env.JWT_KEY,  { expiresIn: "3d" });
      if(!admintoken) return res.json({success: false, message: "Something went wrong"});
      res.cookie("admintoken", admintoken, { httpOnly: true, secure: process.env.NODE_ENV === "production" , sameSite: "None", expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) })
      res.json({success: true, message: "Logged in Successfully"})
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }

  } catch (error) {
    console.log(error.message);
  }
};

const checkauthadmin = (req,res) => {
      res.json({success: true, admin: req.user, message: "Admin found"})
}

const adminlogout = (req,res) => {
        res.cookie("admintoken","",
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            expires: new Date(0),
        });
        res.json({success: true, message: "Logout Successfully"});
}
 
const alldoctorsadmin = async(req,res) => {
  try {
      const doctors = await getalldoctors();
      if(!doctors) return res.json({success: false, message: "Doctors not found"});
      res.json({success: true, doctors});
  } catch (error) {
    res.json({success: false, message: error.message})
    console.log(error.message)
  }
}

const allappointment = async(req,res) => {
  try {
       const appointments = await appointmentModel.find();
       if(!appointments) return res.json({success: false, message: "No appointments available"})
       res.json({success: true, appointments}) 
  } catch (error) {
    res.json({success: false, message: error.message})
    console.log(error.message)
  }
}

const cancelappointment = async(req,res) => {
  try {
    const { id } = req.body;

    const doctortobedeleted = await appointmentModel.findOne({ _id: id });
    
    await appointmentModel.findOneAndUpdate(
      { _id: id },
      { cancelled: true },
      { new: true }
    );

    const { docid, slotdate, slottime } = doctortobedeleted;
    const doctordata = await doctorModel.findOne({ _id: docid });
    if (!doctordata) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    let slotsbooked = doctordata.slotsbooked;
    slotsbooked[slotdate] = slotsbooked[slotdate].filter(
      (value) => value !== slottime
    );
    await doctorModel.findOneAndUpdate(
      { _id: docid },
      { slotsbooked },
      { new: true }
    );

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const admindashboard = async(req,res) => {
  try {
    const allappointments = await appointmentModel.find();
    if(!appointmentModel) return res.json({success: false, message: "Appointments not found"});
    const alldoctors = await doctorModel.find();
    if(!doctorModel) return res.json({success:false, message: "Doctors not found"})
      const users = await userModel.find();
    if(!users) return res.json({success:false, message: "users not found"})
      
     const wholedata = {
    users: users.length,
    doctors: alldoctors.length,
    appointments: allappointments.length,
    latestappointments: allappointments.reverse().slice(0,5)
    }

      res.json({success: true, wholedata})
  } catch (error) {
    res.json({success: false, message: error.message})
  }

}

const doctordelete = async(req,res) => {
    try {
       const id = req.params.id;
       if(!id) return res.json({success: false, message:"Doctor not found"})
        const deletedoctor = await doctorModel.findOneAndDelete({_id: id});
      if(!deletedoctor) return res.json({success: false, message: "something wrong at delete requestt"})
        const appointmentdelete = await appointmentModel.findOneAndDelete({docid: id})
        res.json({success: true, message: "Deleted Successfully"})
    } catch (error) {
      res.json({success: false, message: error.message})
    }
}


export { addDoctor, adminlogin, checkauthadmin, adminlogout, alldoctorsadmin,allappointment,cancelappointment, admindashboard, doctordelete };
