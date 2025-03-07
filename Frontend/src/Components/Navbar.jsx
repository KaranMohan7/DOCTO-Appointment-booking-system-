import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router";
import { PiCaretDown } from "react-icons/pi";
import { CgMenuLeft } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { appcontext } from "../Context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";


const Navbar = () => {
  const navigate = useNavigate();
   const {authuser,setauthuser,profileDetails} = useContext(appcontext);
  const [open, setopen] = useState(false);

  const {backendurl} = useContext(appcontext)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const handlelogout = async() => {
      try {
        const {data} = await axios.get(`${backendurl}/user/logout`, {
          withCredentials: true,
         })
         if(data.success){
          toast.success(data.message)
          setauthuser(false)
         }else{
          toast.error(data.message)
         }
      } catch (error) {
         toast.error(error.message)
      }
  }



  return (
    <>
      <div className="flex justify-between md:justify-around lg:justify-around items-center px-7 py-7">
       <Link to={"/"}><img className="w-36 md:w-40 lg:w-44" src={assets.logo1} /></Link> 
        <div className="md:flex lg:flex items-center  md:gap-7 lg:gap-10  lg:text-lg font-semibold hidden">
          <NavLink to={"/"}>
            Home
            <hr className="m-auto w-6 border-zinc-900  hidden" />
          </NavLink>
          <NavLink to={"/doctors"}>
            All Doctors
            <hr className="m-auto w-6 border-zinc-900 hidden" />
          </NavLink>
          <NavLink to={"/about"}>
            About
            <hr className="m-auto w-6 border-zinc-900 hidden" />
          </NavLink>
          <NavLink to={"/contact"}>
            Contact
            <hr className="m-auto w-6 border-zinc-900 hidden" />
          </NavLink>
        </div>

        {open ? (
          <div className=" bg-white w-full h-screen fixed inset-0 bg-opacity-50 z-40 overflow-hidden ">
            <div className="flex items-center justify-between px-5 py-4">
              <img className="w-36 md:w-40 lg:w-44" src={assets.logo1} />
              <RxCross1 onClick={() => setopen(!open)} size={24} />
            </div>
            <div className="flex flex-col justify-center items-center py-7 text-xl gap-7">
              <NavLink
                to={"/"}
                onClick={() => setopen(false)}
                className=" rounded-md "
              >
                Home
              </NavLink>

              <NavLink  to={"/doctors"} onClick={() => setopen(false)}>
                All Doctors
              </NavLink>
              <NavLink  to={"/about"} onClick={() => setopen(false)}>
                About
              </NavLink>
              <NavLink  to={"/contact"} onClick={() => setopen(false)}>
                Contact
              </NavLink>
            </div>
          </div>
        ) : null}

        {authuser ? (
          <div className="flex items-center gap-6">
            <CgMenuLeft
              onClick={() => setopen(!open)}
              className="block md:hidden lg:hidden"
              size={30}
            />{" "}
            <div className="flex items-center gap-2 group relative z-10">
              <img
                className="w-9 rounded-full"
                src={profileDetails ? profileDetails.image : assets.upload_area}
                alt=""
              />
              <PiCaretDown />
              <div className="absolute top-0 right-0 pt-14 group-hover:block hidden">
                <div className=" min-w-48 flex flex-col bg-gray-200 p-5 gap-5 rounded-md">
                  <Link to={"/profile"}>Profile</Link>
                  <Link to={'/appointments'}>My Appointments</Link>
                  <p className="cursor-pointer" onClick={() => handlelogout()}>Logout</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <CgMenuLeft
              onClick={() => setopen(!open)}
              className="block md:hidden lg:hidden"
              size={30}
            />{" "}
            <button
              onClick={() => navigate("/login")}
              className=" hidden md:block lg:block md:px-2 md:py-2 md:w-28 md:text-sm lg:px-4 lg:py-3 lg:w-36 bg-zinc-900 text-white rounded-lg"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
