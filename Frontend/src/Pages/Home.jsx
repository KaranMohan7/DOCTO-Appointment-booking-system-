import React, { useContext } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { specialityData } from "../assets/assets";
import DoctorCard from "../Components/DoctorCard";
import Footer from "../Components/Footer";
import { appcontext } from "../Context/Appcontext";
import PanelCard from "../Components/PanelCard";

const Home = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(appcontext);


  return (
    <>
      <div className="w-full h-screen">
        <Header />
        <div className="text-center mt-7">
          <h1 className="text-2xl lg:text-3xl font-bold ">
            Find by Speciality
          </h1>
          <p className="text-sm py-2">
            Simply browse through our extensive list of trusted doctors,
            <br />
            schedule your appointment hassle-free.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-7 py-3 ">
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center relative duration-500 ease-in-out hover:translate-y-[-9px] transition-all"
              key={index}
            >
              <img
                src={item.image}
                className="w-14 h-14 lg:w-20 lg:h-20 rounded-full  "
              />
              <p className=" text-sm text-center">{item.speciality}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <h1 className="text-2xl lg:text-3xl font-bold mt-5">
            Top Doctors to Book
          </h1>
          <p className="text-sm py-2">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-5  justify-center px-10">
          { doctors.length > 0 ? doctors.map(
            (item, index) =>
              index < 8 && <Link to={`/doctordetail/${item._id}`} key={index}>{<DoctorCard item={item} />}</Link>
          ): <h1 className="font-semibold py-2 text-center">No Doctors available</h1> }
        </div>
        <div className="flex justify-center items-center py-5 ">
          <button
            onClick={() => {navigate("/doctors");}}
            className="w-28 cursor-pointer px-3 py-3 bg-zinc-300 font-semibold text-white rounded-full  text-center"
          >
            more
          </button>
        </div>

        <PanelCard />
        <Footer />
      </div>
    </>
  );
};

export default Home;
