import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Admincontext = createContext();

const AdminContextProvider = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [token, settoken] = useState(null); 
  const [doctors, setdoctors] = useState([])
  const [availability, setavailability] = useState(true)
  const [allappointments, setallappointments] = useState([])


  const checkAuth = async () => {

    try {
      const response = await axios.get(`${backendurl}/admin/checkauth`, {
        withCredentials: true, 
      });

      if (response.data.success) {
        settoken(true);
      } else {
        settoken(false);
      }
    } catch (error) {
      settoken(false);
    } 
  };



  const cancelappointment = async(id) => {
    try {
       const {data} = await axios.post(`${backendurl}/admin/cancelappointment`, {id}, {
        withCredentials: true
       })
       if(data.success){
        toast.success(data.message)
        getallappointments()
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }
}


  const alldoctors = async() => {
      try {
         const {data} = await axios.get(`${backendurl}/admin/alldoctors`, {
          withCredentials: true
         });
         if(data.success){
           setdoctors(data.doctors)
         }else{
          toast.error(data.message)
         }
      } catch (error) {
        toast.error(error.message)
      }
  }

   
    const getavailability = async(id) => {
       try {
        const {data} = await axios.post(`${backendurl}/admin/availablity`, {id}, {
          withCredentials: true,
         })
         if(data.success){
          toast.success(data.message)
          setavailability(!availability);
          alldoctors();
         }else{
          toast.error(data.message)
         }
       } catch (error) {
          toast.error(error.message)
       }
    }

    const getallappointments = async() => {
       try {
         const {data} = await axios.get(`${backendurl}/admin/allappointments`, {
          withCredentials: true
         })
         if(data.success){
          setallappointments(data.appointments)
         }else{
          toast.error(data.message)
         }
       } catch (error) {
        toast.error(error.message)
       }
    }

     const datavalue = {
           backendurl,
           token,
           settoken,
           alldoctors,
           doctors,
           getavailability,
           availability,
           getallappointments,
           allappointments,setallappointments,
           cancelappointment,
         
     }

   useEffect(() => {
     if(token){
      checkAuth()
     }
   },[token])
     

  return (
    <Admincontext.Provider value={datavalue}>{children}</Admincontext.Provider>
  )
}

export default AdminContextProvider