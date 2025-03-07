import express from 'express';
import doctorauth from '../middlewares/doctorauth.js'
import { alldoctorsdoctor, cancelappointment, checkauthdoctor, doctorappointments, doctordashboard, doctorlogin, doctorprofile, logoutdoctor, tickappointment, updatedoctor} from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.get("/alldoctors",alldoctorsdoctor);
doctorRouter.post("/logindoctor",doctorlogin);
doctorRouter.get("/logoutdoctor", logoutdoctor);
doctorRouter.get("/checkauthdoctor",doctorauth,checkauthdoctor)
doctorRouter.get("/doctorappointments",doctorauth, doctorappointments)
doctorRouter.post("/tickappointment",doctorauth,tickappointment)
doctorRouter.post("/cancelappointment",doctorauth,cancelappointment)
doctorRouter.get("/doctordashboard",doctorauth,doctordashboard)
doctorRouter.get("/profile", doctorauth, doctorprofile)
doctorRouter.post("/updateprofile", doctorauth, updatedoctor)

export default doctorRouter     