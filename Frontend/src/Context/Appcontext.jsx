import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const appcontext = createContext();

const Appcontext = ({ children }) => {
  const [doctors, setdoctors] = useState([]);
  const [authuser, setauthuser] = useState(null);
  const [profileDetails,setprofileDetails] = useState([])

  const backendurl = import.meta.env.VITE_BACKEND_URL;
  let symbol = "₹";


  const getdoctors = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/doctor/alldoctors`, {
        withCredentials: true,
      });
      if (data.success) {
        setdoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkcookie = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/user/checkauthuser`, {
        withCredentials: true,
      });
      if (data.success) {
        setauthuser(true);
      } else {
        setauthuser(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  
    const getprofiledetails =  async() => {
      try {
        const {data} = await axios.get(`${backendurl}/user/profiledetails`,{
          withCredentials: true,
         })
         if(data.success){
           setprofileDetails(data.userprofile)
         }else{
          toast.error(data.message)
         }
      } catch (error) {
        toast.error(error.message)
      }
    }

  useEffect(() => {
    getdoctors();
    checkcookie();
  }, []);


  useEffect(() => {
      if(authuser){
        getprofiledetails()
      }
  },[authuser]) 

  const datavalue = {
    doctors,getdoctors,
    symbol,
    authuser,
    setauthuser,
    backendurl,
    getprofiledetails,
    profileDetails, setprofileDetails
  };

  return (
    <appcontext.Provider value={datavalue}>{children}</appcontext.Provider>
  );
};

export default Appcontext;
