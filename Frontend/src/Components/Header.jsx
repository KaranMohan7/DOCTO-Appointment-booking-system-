import React from "react";
import { assets } from "../assets/assets";
import { IoIosArrowRoundForward } from "react-icons/io";

const Header = () => {


  const scrollToBottom = () => {
    window.scrollTo({
      top: 830,
      behavior: "smooth",
    });
  };
  

  return (
    <div className="bg-zinc-900 w-[80%] min-h-[65vh] flex flex-col md:flex-row lg:flex-row items-center gap-2 m-auto rounded-md text-white px-7 ">

      <div className="md:w-1/2 space-y-5 py-5">
        <h1 className=" text-3xl md:text-4xl lg:text-5xl font-semibold ">
          Book Appointment
          <br />
          With Trusted Doctors
        </h1>
        <div className="flex flex-col md:flex-row lg:flex-row text-sm  items-center gap-3 w-full">
          <img className="w-28" src={assets.group_profiles} />
          <p className="">
            Simply browse through our extensive list of trusted doctors,
            <br />
            schedule your appointment hassle-free.
          </p>
        </div>
        <button onClick={scrollToBottom} className="bg-white w-44 px-2 py-3 rounded-md text-black font-semibold flex items-center  justify-between gap-1">Create Appointment <IoIosArrowRoundForward /></button>
      </div>

      <div className="min-w-1/2 relative md:mt-56 lg:mt-10 overflow-hidden">
      <img className="object-cover" src={assets.header_img} />
      </div>
    </div>
  );
};

export default Header;
