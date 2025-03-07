import React, { useContext, useEffect, useState } from 'react'
import { Doctorcontext } from '../context/Doctorcontext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { SiMoneygram } from "react-icons/si";
import { Appcontext } from '../context/Appcontext';
import { assets } from '../assets/assets';


const Doctordashboard = () => {
  const {backendurl,doctorpass} = useContext(Doctorcontext);
  const {currency,slotdateformat} = useContext(Appcontext)
  const  [dashboarddata, setdashboarddata] = useState([])
  

  const getdoctordashboard = async() => {
    try {
      const {data} = await axios.get(`${backendurl}/doctor/doctordashboard`,{
        withCredentials: true
       })
       if(data.success){
            setdashboarddata(data.maindata)
       }else{
        toast.error("Something went wrong")
       }
    } catch (error) {
       toast.error(error.message)
    }
}

  const cancelappointment = async(id) => {
    try {
       const {data} = await axios.post(`${backendurl}/doctor/cancelappointment`, {id}, {
        withCredentials: true
       })
       if(data.success){
        toast.success("Appointment Cancelled")
        getdoctordashboard()
       }else{
        toast.error(data.success)
       }
    } catch (error) {
      toast.error(error.message)
    }
}

  useEffect(() => {
       if(doctorpass){
        getdoctordashboard()
       }
  },[doctorpass])

      
  return (
    <div className='w-full '>
      <p className="text-2xl lg:text-3xl font-semibold p-5">Dashboard</p>
                 <div className='flex flex-wrap items-center justify-center gap-7'>
                  <div className='flex items-center justify-center w-64 h-32 bg-zinc-100 rounded-md shadow-lg gap-4'>
                  <SiMoneygram size={40}/>
                       <div className='text-xl'>       
                        <p>{currency}{dashboarddata.earnings}</p>
                        <p className='font-semibold'>Total earnings</p>
                       </div>
                  </div>
                  <div className='w-64 h-32 bg-zinc-100 rounded-md shadow-lg'>
                  <div className='flex items-center justify-center w-64 h-32 bg-zinc-100 rounded-md shadow-lg gap-4'>
                  <FaUser size={40}/>
                  <div className='text-xl'>
                        <p>{dashboarddata.patients}</p>
                        <p className='font-semibold'>Total patients</p>
                       </div>
                  </div>
                  </div>
                  <div className='w-64 h-32 bg-zinc-100 rounded-md shadow-lg'>
                  <div className='flex items-center justify-center w-64 h-32 bg-zinc-100 rounded-md shadow-lg gap-4'>
                  <SlCalender size={40} />
                  <div className='text-xl'>
                        <p>{dashboarddata.totalappointments}</p>
                        <p className='font-semibold'>Total Appointments</p>
                       </div>
                  </div>
                 </div>
    </div>

     <p className='flex items-center gap-1 font-semibold py-10 px-5'>Latest Appointments <SlCalender/></p>
    
        <div className='flex flex-col gap-4'>
           {
           dashboarddata && dashboarddata?.latestappointments?.length > 0 ?  dashboarddata.latestappointments.map((item,index) => (
              <div key={index} className='flex justify-between px-0 md:px-9 lg:px-10'>
              <div className='flex items-center'>
              <img  className='w-16 rounded-full mr-2'  src={item.userdata.image} />
              <div>
              <p className='font-semibold'>{item.userdata.name}</p>
                <p>  
                  {slotdateformat(item.slotdate)} | {item.slottime}
                  </p>
              </div>
              </div>
              {
                (item.cancelled && !item.iscompleted) ? <p className='font-semibold text-red-600 mt-8 md:mt-6 lg:mt-5 px-4  md:px-0 lg:px-0'>Cancelled</p> : (item.iscompleted) ? <p className='font-semibold text-red-600 mt-8 md:mt-6 lg:mt-5  px-4  md:px-0 lg:px-0'>Completed</p> :<img onClick={() => cancelappointment(item._id)} className='w-10 h-10 mt-5 md:mt-4 lg:mt-3 px-4  md:px-0 lg:px-0' src={assets.cancel_icon} />
              }
            </div>
          
            )) : <p className='font-semibold text-center text-zinc-700'>No Appointments available</p>
           }
    
        </div>
    </div>
  )
}

export default Doctordashboard