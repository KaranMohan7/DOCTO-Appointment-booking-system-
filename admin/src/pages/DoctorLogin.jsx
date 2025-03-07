import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Doctorcontext} from '../context/Doctorcontext'
import { Admincontext } from "../context/Admincontext";

const Adminlogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const {backendurl,setdoctorpass} = useContext(Doctorcontext)
  const {token, settoken} = useContext(Admincontext)

  const navigate = useNavigate()

  const handlelogin = async(e) => {
         e.preventDefault()
         try {
           const {data} = await axios.post(`${backendurl}/doctor/logindoctor`,{email,password},{
            withCredentials: true
           })
           if(data.success){
            toast.success(data.message)
            setdoctorpass(true)
            settoken(false)
            navigate("/doctordashboard")
           }else{
            toast.error(data.message)
           }

         } catch (error) {
            toast.error(error.message)
         }
  }

  return (
    <>
      <div className="w-full h-screen  flex justify-center py-40">
        <form onSubmit={handlelogin} className="w-full md:w-[70%] lg:w-[50%] ">
          <h1 className=" font-semibold text-3xl lg:text-4xl px-8 py-5">
            Sign in [ Doctor ]
          </h1>
          <div className="flex flex-col justify-center gap-6 px-8 ">
            <div className="flex flex-col justify-center  ">
              <p className="font-semibold">Email Address</p>
              <input
                onChange={(e) => setemail(e.target.value)}
                required
                value={email}
                className="outline-none bg-zinc-200  px-3 py-2 rounded-lg"
                type="text"
                placeholder="Enter Your email"
              />
            </div>

            <div className="flex flex-col justify-center ">
              <p className=" font-semibold">Password</p>
              <input
                onChange={(e) => setpassword(e.target.value)}
                required
                value={password}
                className="outline-none bg-zinc-200   px-3 py-2 rounded-lg "
                type="password"
                placeholder="Enter Your password"
              />
            </div>
          </div>
          <div className="flex items-center justify-end py-5 px-6">
            <button className="bg-black font-semibold text-white px-3 py-2 rounded-md tracking-wider ">
              Login
            </button>
          </div>
          <div className="flex items-center justify-end  px-6">
           <Link to={'/'} className="font-semibold text-blue-500">Admin Login ?</Link>
          </div>
          
        </form>
      </div>
    </>
  );
};

export default Adminlogin;
