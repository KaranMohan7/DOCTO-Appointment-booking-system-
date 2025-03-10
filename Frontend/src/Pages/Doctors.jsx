import React, { useContext, useEffect, useState } from "react";
import { appcontext } from "../Context/Appcontext";
import DoctorCard from "../Components/DoctorCard";
import { Link, useNavigate, useParams } from "react-router";
import Footer from '../Components/Footer'
import Loading from '../Components/Loading'


const Doctors = () => {
    
  const { doctors } = useContext(appcontext);
  const { speciality } = useParams()

  const [filtereddata, setfiltereddata] = useState([]);
  const [specialitydropdown, setspecialitydropdown] = useState(speciality || "All");


  const navigate = useNavigate()

  const handlechange = (e) => {
    const selectedValue = e.target.value;
    setspecialitydropdown(selectedValue);
    if (selectedValue === "All") {
      navigate("/doctors");
    }
  };
  
  const handlefilteration = () => {
    if(specialitydropdown && specialitydropdown!=="All"){
      setfiltereddata(doctors.filter((data) => data.speciality === specialitydropdown ));
    }
    else{
      setfiltereddata(doctors)
    }
  }

  useEffect(() => {
    if (speciality) {
      setspecialitydropdown(speciality);
    }
  }, [speciality]);



  useEffect(() => {
   handlefilteration();
  }, [specialitydropdown, doctors ]);

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-between px-5 md:px-14 lg:px-16">
        <p className="text-start font-semibold">
          Browse specialist doctors.
        </p>
        <select value={specialitydropdown}  onChange={handlechange} className="border-2 border-zinc-900 outline-none py-2 rounded-md px-2 w-22 md:w-40 lg:w-40 "
        >
          {
              ["All", ...new Set(doctors.map(item => item.speciality))].map((speciality, index) => (
                <option className="text-sm" key={index}>{speciality}</option>
              ))
          }
        </select>
      </div>
        
        <div className="flex flex-wrap justify-center py-5 items-center gap-10">
           {
           filtereddata.length > 0 ? filtereddata.map((item,index) => (
              <Link to={`/doctordetail/${item._id}`} key={index}>
                <DoctorCard item={item}/>
              </Link>
            )) : <Loading />
           }
        </div>
<Footer />
    </div>
  );
};

export default Doctors;
