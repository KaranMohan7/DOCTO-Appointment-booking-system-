import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Admincontext } from "../context/Admincontext";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Adminlogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [loading,setloading] = useState(true)

  const { backendurl, settoken } = useContext(Admincontext);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await axios.post(
        `${backendurl}/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Logged in Successfully");
        settoken(true)
        handleCookie();
      } else {
        toast.error(response.data.message);
        setloading(false)
        settoken(false)
      }
    } catch (error) {
      console.log(error.message);
      setloading(false)
      settoken(false)
    }
  };

  const handleCookie = async () => {
    setloading(true);
    try {
      const response = await axios.get(`${backendurl}/admin/checkauth`, {
        withCredentials: true,
      });
      if (response.data.success) {
        settoken(true)
      }else{
        if (document.cookie.includes("admintoken")) {
          toast.error("Session expired. Please log in again.");
        }
        settoken(false)
        setloading(false)
        navigate("/")
      }
    } catch (error) {
      console.log(error.message);
      setloading(false)
      settoken(false)
    }
  };

  useEffect(() => {
    handleCookie();
  }, []);


  if(loading){
    return <div className="w-full h-screen flex items-center justify-center"><Loading /></div>
  }


 

  return (
    <>
      <div className="w-full h-screen  flex justify-center py-40">
        <form onSubmit={handlesubmit} className="w-full md:w-[70%] lg:w-[50%] ">
          <h1 className=" font-semibold text-3xl lg:text-4xl px-8 py-5">
            Sign in [Admin]
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
            <Link to={"/doctorlogin"} className="font-semibold text-blue-500">
              Doctor Login ?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adminlogin;
