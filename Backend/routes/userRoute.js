import express from 'express';
import isLoggedin from '../middlewares/isLoggedin.js'
import { checkauthuser, loginuser, registeruser, logoutuser, profiledetails, editprofile, bookappointment, getappointmentdata, cancelappointment, paymentgateway, paymentverification } from '../controllers/userController.js';
import upload from '../middlewares/multer.js'




const userRouter = express.Router();

userRouter.post("/registeruser", registeruser);
userRouter.post("/login", loginuser);
userRouter.get("/logout",logoutuser);
userRouter.get("/checkauthuser", isLoggedin ,checkauthuser);
userRouter.get("/profiledetails",isLoggedin, profiledetails);
userRouter.post("/editprofiledetails",isLoggedin,upload.single("image"),editprofile);
userRouter.post("/bookappointment",isLoggedin,bookappointment);
userRouter.get("/getappointment",isLoggedin, getappointmentdata);
userRouter.post("/cancelappointment",isLoggedin,cancelappointment);
userRouter.post("/payment",isLoggedin,paymentgateway);
userRouter.post("/verification",isLoggedin,paymentverification);


export default userRouter