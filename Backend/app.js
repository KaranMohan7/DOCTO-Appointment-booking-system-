import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js';
import cookieParser from 'cookie-parser'
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const allowedOrigins = [
  process.env.FRONTEND_URL_USER, 
  process.env.FRONTEND_URL_ADMIN,
  'http://localhost:5173',
  'http://localhost:5174' 
];


app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));
  


app.get("/", (req,res) => {
    res.send("Working")
})

app.use("/admin", adminRouter);
app.use("/doctor",doctorRouter);
app.use("/user",userRouter);

app.listen(port, () => {
    console.log("server started successfully")
})