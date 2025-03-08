import express from 'express';
import { addDoctor, adminlogin, checkauthadmin,adminlogout, alldoctorsadmin, allappointment, cancelappointment, admindashboard, doctordelete } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js'
import adminauth from '../middlewares/adminauth.js'
import { checkavailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post("/add-doctor",adminauth, upload.single("image") , addDoctor);
adminRouter.post("/login", adminlogin);
adminRouter.get("/checkauth", adminauth , checkauthadmin);
adminRouter.get("/alldoctors", adminauth, alldoctorsadmin);
adminRouter.get("/logout",adminlogout);
adminRouter.post("/availablity",adminauth, checkavailability);
adminRouter.get("/allappointments",adminauth, allappointment);
adminRouter.post("/cancelappointment",adminauth,cancelappointment);
adminRouter.get("/admindashboard",adminauth, admindashboard);
adminRouter.delete("/doctordelete/:id",adminauth, doctordelete);

export default adminRouter