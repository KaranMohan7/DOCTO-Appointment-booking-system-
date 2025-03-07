import React from "react";
import { assets } from "../assets/assets";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="w-full h-screen">
      <h1 className="font-extrabold text-center text-2xl py-3 p-2">
        ABOUT <span className="font-bold text-zinc-600">US</span>
      </h1>
      <div className="flex flex-col lg:flex-row items-center mt-5 gap-12 md:gap-16 lg:gap-20 px-10 md:px-20 lg:px-32 ">
        <img className="w-full md:w-96 lg:w-96" src={assets.about_image} />
        <div className="flex flex-col justify-center items-center gap-10">
          <p className="text-gray-700 font-medium">
            Welcome to Docto, your trusted partner in managing your healthcare
            needs conveniently and efficiently. At Docto, we understand the
            challenges individuals face when it comes to scheduling doctor
            appointments and managing their health records.
          </p>
          <p className="text-gray-700 font-medium">
            Docto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Docto is here to support you every step of the way.
          </p>
          <div>
            <p className="font-semibold">Our Vision</p>
            <p className="mt-5 text-gray-700 font-medium">Our vision at Docto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>
      </div>
      <div className="mt-14">
      <Footer />
      </div>
    </div>
  );
};

export default About;
