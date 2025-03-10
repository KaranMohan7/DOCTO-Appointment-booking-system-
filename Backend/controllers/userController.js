import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import razorpay from 'razorpay'

const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message:
          "make the length of password longer and your password stronger",
      });
    }

    const emailfind = await userModel.findOne({ email: email });
    if (emailfind)
      return res.json({ success: false, message: "Already have an account" });

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const formdata = {
      name,
      email,
      password: hashedpassword,
      date: Date.now(),
    };

    const finaluser = new userModel(formdata);
    if (!finaluser)
      return res.json({ success: false, message: "Something went wrong" });
    await finaluser.save();
    res.json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

const loginuser = async (req, res) => {
   try {
    const { email, password } = req.body;

  if ((!email || !password)) {
    return res.json({ success: false, message: "Invalid Credentials" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Invalid Credentials" });
  }
  if (password.length < 8) {
    return res.json({
      success: false,
      message: "make the length of password longer and your password stronger",
    });
  }

  const emailcheck = await userModel.findOne({ email: email });
  if (!emailcheck)
    return res.json({ success: false, message: "Something went wrong" });

  const passwordcheck = await bcrypt.compare(password, emailcheck.password);
  if (!passwordcheck)
    return res.json({ success: false, message: "Something went wrong" });

  const token = jwt.sign({ id: emailcheck._id, role: emailcheck.role }, process.env.JWT_KEY);
  if (!token)
    return res.json({ success: false, message: "Something went wrong" });

  res.cookie("usertoken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  });

  console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);

  res.json({ success: true, message: "User Logged in Successfully" });

   } catch (error) {
     res.json({success: false, message: error.message})
   }
};

const logoutuser = async (req, res) => {
      try {
        res.cookie("usertoken", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          expires: new Date(0),
        });
        res.json({ success: true, message: "Logout Successfully" });
      } catch (error) {
        res.json({success: false, message: error.message})
      }
};

const checkauthuser = (req, res) => {
  res.json({ success: true, user: req.user, message: "user found" });
};

const profiledetails = async (req, res) => {
  try {
    const user = req.user.id;

    const userprofile = await userModel
      .findOne({ _id: user })
      .select("-password");
    if (!userprofile)
      return res.json({ success: false, message: "Doesnt get the profile" });
    res.json({ success: true, userprofile });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const editprofile = async (req, res) => {
  try {
    const { email, phone, address, gender, dob } = req.body;
    const profileimage = req.file;

    const userid = req.user.id;
    
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter your email Correctly",
      });
    }

    let imageupdate;
    let imageupdateurl;

    if(profileimage){
        imageupdate = await cloudinary.uploader.upload(profileimage.path, {
        resource_type: "image",
      });

      if (imageupdate && imageupdate.secure_url){
       imageupdateurl = imageupdate.secure_url;
      }
    }
  
    const updateduser = await userModel.findOneAndUpdate(
      { _id: userid },
      { email, phone, address, gender, dob, image: imageupdateurl },
      { new: true }
    );

    if (!updateduser)
      return res.json({ success: false, message: "Something went wrong" });

    res.json({ success: true, message: "User Updated Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

const bookappointment = async (req, res) => {
  try {
    const { docid, slotdate, slottime } = req.body;
    const userid = req.user.id;
    if(!slotdate || !slottime) return res.json({success: false, message: "Set date and time properly"})
    const docdata = await doctorModel
      .findOne({ _id: docid })
      .select("-password");
    if (!docdata.available)
      return res.json({ success: false, message: "Doctor Not Available" });

    let slotsbooked = docdata.slotsbooked;

    if (slotsbooked[slotdate]) {
      if (slotsbooked[slotdate].includes(slottime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slotsbooked[slotdate].push(slottime);
      }
    } else {
      slotsbooked[slotdate] = [];
      slotsbooked[slotdate].push(slottime);
    }

    const userdata = await userModel
      .findOne({ _id: userid })
      .select("-password");
    delete docdata.slotsbooked;

    const appointmentdata = {
      userid,
      docid,
      userdata,
      docdata,
      fees: docdata.fees,
      slottime,
      slotdate,
      date: Date.now(),
    };

    const newappointment = new appointmentModel(appointmentdata);
    if (!newappointment)
      return res.json({
        success: false,
        message: "something went wrong in appointment",
      });
    await newappointment.save();

    await doctorModel.findOneAndUpdate(
      { _id: docid },
      { slotsbooked },
      { new: true }
    );
    res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getappointmentdata = async (req, res) => {
  try {
    const userid = req.user.id;
    const appointdata = await appointmentModel.find({ userid: userid });
    if (!appointdata)
      return res.json({
        success: false,
        message: "Something went wrong in appointment data",
      });
    res.json({ success: true, appointdata });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const cancelappointment = async (req, res) => {
  try {
    const { id, userid } = req.body;

    const doctortobedeleted = await appointmentModel.findOne({ _id: id });


    if (req.user.id !== userid) {
      return res.json({ success: false, message: "User is unauthorized" });
    }
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
};

const razorpayinstance = new razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET
})

const paymentgateway = async(req,res) => {
           try {
            const {id} = req.body;

            const appointdatamain = await appointmentModel.findOne({_id: id});
            if(!appointdatamain || appointdatamain.cancelled) return res.json({success: false,message: "appointment cancelled or not found"})
         
             const options = {
               amount: appointdatamain.fees * 100,
               currency: process.env.CURRENCY,
               receipt: id
             }
         
             const order = await razorpayinstance.orders.create(options)
             res.json({success: true, order})
         
           } catch (error) {
            res.json({ success: false, message: error.message });
           }
}  

const paymentverification = async(req,res) => {
     try {
          const {razorpay_order_id} = req.body
     
          const orderinfo = await razorpayinstance.orders.fetch(razorpay_order_id);

          if(orderinfo.status === "paid"){
            await appointmentModel.findOneAndUpdate({_id: orderinfo.receipt}, {payment: true}, {new:true})
             res.json({success: true, message: "Successfully paid"})
          }else{
            res.json({success: false, message: "Payment unsuccessfully"})
          }

     } catch (error) {
      res.json({ success: false, message: error.message });
     }
}

export {
  registeruser,
  loginuser,
  checkauthuser,
  logoutuser,
  profiledetails,
  editprofile,
  bookappointment,
  getappointmentdata,
  cancelappointment,
  paymentgateway,
  paymentverification
};
