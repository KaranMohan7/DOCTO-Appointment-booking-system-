import React from 'react'
import { assets } from '../assets/assets'
import { Link } from "react-router-dom";

const PanelCard = () => {
  return (
    <div>
            <div className="max-w-[72%] mt-9  m-auto bg-zinc-900 min-h-52 md:h-82 lg:h-82 rounded-md font-semibold text-white flex items-center justify-center gap-3 ">
          <div className="px-5 py-5 ">
            <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-wide ">
              Book Appointment <br />
              with 100+ Trusted Doctors
            </h1>
            <Link to={'/create'} >
            <button className="bg-white w-32 md:w-40 lg:w-48 text-black font-medium px-2 py-3 rounded-md text-sm mt-8">
              Create Account
            </button>
            </Link>
          </div>
          <img
            className="w-80 mb-6 hidden md:block lg:block"
            src={assets.appointment_img}
          />
        </div>
    </div>
  )
}

export default PanelCard