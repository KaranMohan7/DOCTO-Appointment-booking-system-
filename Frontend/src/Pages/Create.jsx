import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {appcontext} from '../Context/Appcontext'
import { toast } from "react-toastify";
import Loading from "../Components/Loading";


const Create = () => {
    

   const [name,setname] = useState("");
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");
   const [loading,setloading] = useState(false)
   const {backendurl,authuser} = useContext(appcontext);

   const navigate = useNavigate()
  
    
   const createuser = async(e) => {
    e.preventDefault()
    setloading(true)
     
       try {
        const {data} = await axios.post(`${backendurl}/user/registeruser`, {name,email,password}, {
          withCredentials: true
        });
        if(data.success){
          setloading(false)
          toast.success(data.message);
          navigate("/login")
        }else{
          setloading(false)
          toast.error(data.message)   
        }
       } catch (error) {
        setloading(false)
         toast.error(error.message)
       }
   }

    useEffect(() => {
      if(authuser){
       navigate("/")
      }
     }, [])

     useEffect(() => {
      window.scrollTo(0,0)
     },[])

       useEffect(() => {
         if (loading) {
           document.body.style.overflow = "hidden";
         } else {
           document.body.style.overflow = "auto"; 
         }
       },[loading])
     
     

  return (
    <div className="w-full h-screen flex justify-center">
         {
        loading && <div className="flex fixed justify-center items-center w-full h-screen bg-[rgba(0,0,0,0.5)] z-[100] top-0 left-0 ">
        <Loading />
      </div>
      }
      <form onSubmit={createuser} className="w-full md:w-[70%] lg:w-[50%] ">
        <h1 className=" font-semibold text-3xl lg:text-4xl px-8 py-5">
          Create an Account
        </h1>
        <div className="flex flex-col justify-center gap-6 px-8 ">
          <div className="flex flex-col justify-center  ">
            <p className="font-semibold">FullName</p>
            <input
              className="outline-none bg-zinc-200  px-3 py-2 rounded-lg"
              name="name"
              type="text"
              placeholder="Enter Your name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-center  ">
            <p className="font-semibold">Email Address</p>
            <input
              className="outline-none bg-zinc-200  px-3 py-2 rounded-lg"
              name="email"
              type="text"
              placeholder="Enter Your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-center ">
            <p className=" font-semibold">Password</p>
            <input
              className="outline-none bg-zinc-200   px-3 py-2 rounded-lg "
              name="password"
              type="password"
              placeholder="Enter Your password"
              value={password}
              onChange={((e) =>  setpassword(e.target.value))}
            />
          </div>
        </div>
        <div className="flex items-center justify-end py-6 px-6">
          <div className="flex flex-col justify-center gap-2">
            <button className="bg-black font-semibold text-white py-2 rounded-md tracking-wider ">
              Create
            </button>
            <p>
              Already have an account?{" "}
              <Link to={'/login'} className="text-blue-500 font-semibold">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
