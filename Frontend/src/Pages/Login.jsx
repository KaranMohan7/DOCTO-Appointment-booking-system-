import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {appcontext} from '../Context/Appcontext'
import axios from "axios";
import { toast } from "react-toastify";
import Loading from '../Components/Loading'

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false)
  const {backendurl,authuser,setauthuser} = useContext(appcontext)
  const navigate = useNavigate();

  const handlelogin = async(e) => {
    e.preventDefault()
    setloading(true)
      try {
        const {data} = await axios.post(`${backendurl}/user/login`, {email,password}, {
          withCredentials: true
        })
        if(data.success){
          setauthuser(true)
          setloading(false)
          navigate("/")
          toast.success(data.message)
        }else{
          setauthuser(false)
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

  if(loading){
     return <div className="flex items-center justify-center w-full h-screen">
      <Loading />
     </div>
  }
  
  return (
    <>
      <div className="w-full h-screen flex justify-center">
        <form onSubmit={handlelogin} className="w-full md:w-[70%] lg:w-[50%] ">
          <h1 className=" font-semibold text-3xl lg:text-4xl px-8 py-5">
            Sign in
          </h1>
          <div className="flex flex-col justify-center gap-6 px-8 ">
            <div className="flex flex-col justify-center  ">
              <p className="font-semibold">Email Address</p>
              <input
                onChange={(e) => setemail(e.target.value)}
                name="email"
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
                name="password"
                value={password}
                className="outline-none bg-zinc-200   px-3 py-2 rounded-lg "
                type="password"
                placeholder="Enter Your password"
              />
            </div>
          </div>
          <div className="flex items-center justify-end py-6 px-6">
            <button className="bg-black font-semibold text-white px-3 py-2 rounded-md tracking-wider ">
              Login
            </button>
          </div>
          <hr className="m-auto border-zinc-300 mt-2 w-[80%]" />
          <div className="flex justify-center items-center py-5">
            <Link
              to={"/create"}
              className="bg-gray-300 text-gray-800 font-semibold  py-3 px-5 rounded-full "
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
