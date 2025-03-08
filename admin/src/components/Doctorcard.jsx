import React, { useContext, useState } from 'react'
import { Admincontext } from '../context/Admincontext'
import { MdOutlineDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';

const Doctorcard = ({item}) => {

  const { availability, getavailability, backendurl, alldoctors} = useContext(Admincontext);
  const [warn,setwarn] = useState(false)

  const deletedoctor = async(id) => {
     try {
        const {data} = await axios.delete(`${backendurl}/admin/doctordelete/${id}`, {
          withCredentials: true
        })
        if(data.success){
             alldoctors();
             toast.success(data.message)
        }else[
          toast.error(data.message)
        ]
     } catch (error) {
       toast.error(error.message)
     }
  }
  
  return (
    <div className='w-64  lg:w-56 h-80 md:h-80 lg:h-72 bg-zinc-100 rounded-md overflow-hidden flex flex-col justify-center border-[1px] border-zinc-300 transition-all duration-500 hover:bg-zinc-300 '>
        <img className='w-full' src={item.image} />
      <div className='bg-white h-96 w-full px-2 pb-5  '>
        <p className='font-semibold '>{item.name}</p>
        <p className='text-sm'>{item.speciality}</p>
        <div className='flex items-center justify-between '>
        <div className='flex items-center gap-2'>
        <input onChange={() => getavailability(item._id)} type='checkbox' checked={item.available}/>
        <p className='text-sm'>{availability ? "Available" : "Not Available"}</p>
        </div>
        <MdOutlineDelete onClick={() => deletedoctor(item._id)} size={20} />
        </div>
      </div>
    </div>
  )
}

export default Doctorcard