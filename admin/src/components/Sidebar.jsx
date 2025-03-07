import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Admincontext } from "../context/Admincontext";
import { Doctorcontext } from "../context/Doctorcontext";

const Sidebar = () => {
  const { token } = useContext(Admincontext);
  const { doctorpass } = useContext(Doctorcontext);

  return (
    <div className="  w-full md:w-52 lg:w-62 lg:min-h-screen overflow-y-auto bg-zinc-100 font-semibold flex flex-row md:flex-col lg:flex-col justify-center md:justify-normal lg:justify-normal gap-5 md:gap-5 lg:gap-5 py-10  border-r-[1px] border-zinc-300 overflow-x-auto scrollbar-hidden whitespace-nowrap">
      {token && (
        <>
          <NavLink
            to={"/"}
            className="flex items-center gap-2  md:py-5 lg:py-5 md:px-4 lg:px-7 "
          >
            <IoMdHome size={20} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className="flex items-center gap-2  md:py-5 lg:py-5 md:px-4 lg:px-7 "
          >
            <IoMdPersonAdd size={20} />
            <p>Add-Doctor</p>
          </NavLink>
          <NavLink
            to={"/appointmentspage"}
            className="flex items-center gap-2 md:py-5 lg:py-5  md:px-4 lg:px-7  "
          >
            <SlCalender size={20} />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={"/doctorlist"}
            className="flex items-center gap-2 md:py-5 lg:py-5 md:px-4 lg:px-7 "
          >
            <BsFillPersonLinesFill size={20} />
            <p>Doctors Lists</p>
          </NavLink>
        </>
      )}

      {doctorpass && (
        <>
          <NavLink
            to={"/doctordashboard"}
            className="flex items-center gap-2 pl-21 md:py-5 lg:py-5 md:px-4 lg:px-7 "
          >
            <IoMdHome size={20} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/doctorappointments"}
            className="flex items-center gap-2 md:py-5 lg:py-5  md:px-4 lg:px-7  "
          >
            <SlCalender size={20} />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={"/doctorprofile"}
            className="flex items-center gap-2 md:py-5 lg:py-5 md:px-4 lg:px-7 "
          >
            <BsFillPersonLinesFill size={20} />
            <p>Profile</p>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
