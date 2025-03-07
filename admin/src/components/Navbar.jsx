import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { Admincontext } from "../context/Admincontext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Doctorcontext } from '../context/Doctorcontext.jsx';


const Navbar = () => {
   
    const {token,settoken, backendurl} = useContext(Admincontext);
    const { setdoctorpass } = useContext(Doctorcontext)
    const navigate = useNavigate()

    const handlelogout = async() => {
        let response; 
     try {
        if(token){
             response  = await axios.get(`${backendurl}/admin/logout`, {
                withCredentials : true
            });
        } else {
          response  = await axios.get(`${backendurl}/doctor/logoutdoctor`, {
                withCredentials : true
            });
        }
        if(response.data.success){
            toast.success(response.data.message)
            setdoctorpass(false)         
            settoken(false)
            navigate("/")
        }
     } catch (error) {
         toast.error(error.message)
     }
    }
           
  return  (
    <div className='w-full flex items-center justify-between px-5 md:px-10 lg:px-12 py-6 border-b-[1px] border-zinc-300'>
        <div className='flex items-center gap-1'>
            <img  className="w-36 md:w-40 lg:w-44" src={assets.logo1} />
            <p className='rounded-xl border-[1px] border-black py-1 px-2'>{token ? "Admin" : "Doctor"}</p>
        </div>
         <button onClick={() => handlelogout()} className='bg-zinc-800 font-semibold text-white rounded-xl py-2 px-4 hover:bg-red-500  transition-all duration-300'>Logout</button>
    </div>
  )
}

export default Navbar