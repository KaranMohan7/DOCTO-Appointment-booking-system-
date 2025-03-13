import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { appcontext } from "../Context/Appcontext";
import { FaCircleInfo } from "react-icons/fa6";
import Relateddoctors from "../Components/Relateddoctors";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from '../Components/Loading'


const Doctordetail = () => {
  const { doctors, symbol, backendurl, authuser, getdoctors } = useContext(appcontext);
  const [loading,setloading] = useState(false)
  const [doctorinfo, setdoctorinfo] = useState(null);

  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const [doctSlots, setdoctSlots] = useState([]);
  const [slotIndex, setslotIndex] = useState(0);
  const [slottime, setslotTime] = useState("");
  
  const daysofweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];



  const fetchdoctordetail = async () => {
    const maindetail = doctors.find((doc) => doc._id === id);
    setdoctorinfo(maindetail);
  };

  const getAvailableSlot = async () => {
    setdoctSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentdate = new Date(today); // 7 2 2025 17 48
      currentdate.setDate(today.getDate() + i); // 7 2 2025 17 48

      let endtime = new Date(); // 7 2 2025 17 48
      endtime.setDate(today.getDate() + i); // 7 2 2025 17 48
      endtime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentdate.getDate()) {
        currentdate.setHours(
          currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10
        );
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }

      let timeslots = [];

      while (currentdate < endtime) {

        let formattedtime = currentdate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, 
        });

        let day = currentdate.getDate()
        let month = currentdate.getMonth()+1
        let year = currentdate.getFullYear()

        const mainslotdate = day + "_" + month + "_" + year;
        const maintimeslot = formattedtime

        const isLotavailable = doctorinfo.slotsbooked[mainslotdate] && doctorinfo.slotsbooked[mainslotdate].includes(maintimeslot) ? false : true

          if(isLotavailable){
            timeslots.push({
              datetime: new Date(currentdate),
              time: formattedtime,
            });
          }
       
        currentdate.setMinutes(currentdate.getMinutes() + 30);
      }
      setdoctSlots((prev) => [...prev, timeslots]);
    }
  };

  const postappointments = async() => {
   setloading(true)
    if(!authuser){
      toast.warn("Log in to book appointment")
      return navigate("/login")
     }
      try {
        const date = doctSlots[slotIndex][0].datetime

      
        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()
        const slotdate = day + "_" + month + "_" + year;
    

         const { data } = await axios.post(`${backendurl}/user/bookappointment`, {docid:id,slotdate,slottime}, {
          withCredentials: true,
         })
         if(data.success){
          setloading(false)
          toast.success(data.message)
          getdoctors();
          navigate("/appointments")
         }else{
          setloading(false)
          toast.error(data.message)
         }
      } catch (error) {
        setloading(false)
        toast.error(error.message)
      }
  }



  useEffect(() => {
    fetchdoctordetail();
  }, [id, doctors]);

  useEffect(() => {
    getAvailableSlot();
  }, [doctorinfo]);
 
  useEffect(() => {
    window.scrollTo(0,0);

  },[pathname])

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }
  },[loading])


  return (
    <div className="w-full h-screen">
      {
        loading && <div className="flex fixed justify-center items-center w-full h-screen bg-[rgba(0,0,0,0.5)] z-[100] top-0 left-0 ">
        <Loading />
      </div>
      }

      {doctorinfo ? (
        <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:gap-4 px-5 md:px-10 lg:px-44 ">
          <div className="w-82 md:w-96 lg:w-96 bg-zinc-500 rounded-md  ">
            <img className="w-82 md:w-96 lg:w-96 " src={doctorinfo.image} />
          </div>
          <div className="w-full px-4 py-3 mt-4 border-[1px] border-zinc-400 m-auto rounded-lg ">
            <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
              {doctorinfo.name}
            </h1>
            <div className="flex items-center text-xs font-semibold gap-3 mt-1">
              <p>MBBS - {doctorinfo.speciality}</p>
              <p className="border-black border-[1px] rounded-2xl px-2 ">
                {doctorinfo.experience}
              </p>
            </div>
            <div className=" py-2 md:py-3 lg:py-5">
              <p className="flex items-center gap-2 font-semibold">
                About <FaCircleInfo />{" "}
              </p>
              <p>{doctorinfo.about}</p>
              <p className="font-semibold mt-2">
                Appointment Fee : {symbol}
                {doctorinfo.fees}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center font-semibold">Not Available</h1>
      )}

      <h1 className="font-bold text-center py-8">Booking Slots</h1>
      <div className="flex items-center justify-center gap-3 md:gap-7 lg:gap-14 cursor-pointer">
        {doctSlots.length &&
          doctSlots.map((item, index) => (
            <div
              onClick={() => setslotIndex(index)}
              className={`flex flex-col justify-center items-center  ${
                slotIndex === index
                  ? "bg-zinc-700 text-white"
                  : " border-[1px] border-zinc-600 text-black"
              } font-semibold rounded-2xl py-2 px-2 md:py-3 md:px-3 lg:py-4 lg:px-4 text-sm `}
              key={index}
            >
              <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
      </div>
      <div className=" cursor-pointer text-center flex items-center justify-center gap-3 lg:gap-5 py-5 overflow-x-scroll ml-8 mr-8 md:ml-16 md:mr-16  lg:ml-20 lg:mr-20 scrollbar-hidden">
        {doctSlots.length &&
          doctSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setslotTime(item.time)}
              className={`border-[1px] px-3 rounded-2xl py-1 ${
                item.time === slottime
                  ? "  bg-zinc-700 text-white"
                  : "border-zinc-700 text-black"
              }`}
              key={index}
            >
              {item.time.toUpperCase()}
            </p>
          ))}
      </div>
      <div className="flex items-center justify-center ">
        <button onClick={postappointments} className="bg-zinc-800 px-4 py-3 rounded-xl text-white font-semibold  ">
          Book Appointment
        </button>
      </div>

      <div className="text-center py-10">
        <p className=" text-2xl md:text-3xl lg:text-4xl font-semibold ">Related Doctors</p>
        <p>Simply browse through our extensive list of trusted doctors.</p>
      </div>
      
      <Relateddoctors id={id} speciality={ doctorinfo && doctorinfo.speciality} />
      <Footer />
    </div>
  );
};

export default Doctordetail;
