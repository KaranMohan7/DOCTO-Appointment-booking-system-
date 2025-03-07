import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-8 m-auto place-items-start lg:place-items-center">
      <div className="flex flex-col items-center ">
        <img className="w-36 md:w-40 lg:w-40 place-self-start" src={assets.logo1} />
        <p className="w-80 text-lg">
          DOCTO is committed to excellence in healthcare technology. We
          continuously strive to enhance our platform, integrating the latest
          advancements to improve user experience and deliver superior service.{" "}
        </p>
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-xl">Company</h1>
        <ul className="mt-5 text-lg">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-xl">Get in Touch</h1>
        <ul className="mt-5 text-lg">
          <li>+0-000-000-000</li>
          <li>karanmohan44@gmail.com</li>
        </ul>
      </div>
      
    </div>
    <hr className="m-auto border-t-2 border-zinc-200  w-[90%]"/>
    <p className="text-center py-5 font-semibold">Copyright 2025 @KaranMohanTalwar - All Rights Reserved</p>
    </> 
  );
};

export default Footer;
