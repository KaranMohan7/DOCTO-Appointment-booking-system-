import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify';

export const Doctorcontext = createContext()

const DoctorContextProvider = ({children}) => {
  
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [doctorpass,setdoctorpass] = useState(false)
  const [appointments,setappointments] = useState([])
  const [loading, setloading] = useState(false)
  

  const checkauthdoctor = async() => {
    try {
      const {data} = await axios.get(`${backendurl}/doctor/checkauthdoctor`, {
        withCredentials: true
       })
       if(data.success){
 
          setdoctorpass(true)
       }else{
        setdoctorpass(false)
        
       }
    } catch (error) {
      toast.error(error.message)
    }
                                                                          
  }

  const getappointments = async() => {
    try {
     const {data} = await axios.get(`${backendurl}/doctor/doctorappointments`, {
       withCredentials: true
     })
     if(data.success){
      setappointments(data.mainappointment)
     }else{
       toast.error(data.message)
     }
 
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  const tickappointment = async(id) => {
    setloading(true)
        try {
           const {data} = await axios.post(`${backendurl}/doctor/tickappointment`, {id}, {
            withCredentials: true
           })
           if(data.success){
            setloading(false)
            toast.success("Appointment Completed")
            getappointments()
           }else{
            setloading(false)
            toast.error(data.success)
           }
        } catch (error) {
          setloading(false)
          toast.error(error.message)
        }
  }

  const cancelappointment = async(id) => {
    setloading(true)
    try {
       const {data} = await axios.post(`${backendurl}/doctor/cancelappointment`, {id}, {
        withCredentials: true
       })
       if(data.success){
        setloading(false)
        toast.success("Appointment Cancelled")
        getappointments()
       }else{
        setloading(false)
        toast.error(data.success)
       }
    } catch (error) {
      setloading(false)
      toast.error(error.message)
    }
}

  useEffect(() => {
      checkauthdoctor()

  },[])

     const datavalue = {
       backendurl,
       doctorpass,
       setdoctorpass,
       appointments,setappointments,
       getappointments,
       tickappointment,
       cancelappointment, 
       loading,
       setloading
      
       
     }

  return (
    <Doctorcontext.Provider value={datavalue}>{children}</Doctorcontext.Provider>
  )
}

export default DoctorContextProvider