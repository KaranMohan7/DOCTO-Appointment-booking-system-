import React, { useContext, useEffect, useState } from 'react'
import { appcontext } from "../Context/Appcontext";
import DoctorCard from './DoctorCard';

const Relateddoctors = ({ id, speciality}) => {

    const {doctors} = useContext(appcontext);
    const [filtered,setfiltered] = useState([])

    const handlefilteration = () => {
        if(speciality && id){
          setfiltered(doctors.filter((data) => data.speciality === speciality && id !== data._id ));
        }
      }
    
      useEffect(() => {
             handlefilteration()
      },[doctors, speciality])

  return (
    <div className='flex justify-center gap-7 flex-wrap items-center'>
        {
           filtered.length ? filtered.map((item,index) => (
               <div key={index}>
                 <DoctorCard item={item}/>
               </div>
            )) : <h1 className='text-center font-semibold py-7'>No Related Doctors Available</h1>
        }
    </div>
  )
}

export default Relateddoctors