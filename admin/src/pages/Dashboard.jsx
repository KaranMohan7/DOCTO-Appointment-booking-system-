import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Admincontext } from "../context/Admincontext";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { assets } from "../assets/assets.js";
import { Appcontext } from "../context/Appcontext.jsx";
import Loadingtwo from "../components/Loadingtwo.jsx";

const Dashboard = () => {
  const { backendurl, token } = useContext(Admincontext);
  const { slotdateformat } = useContext(Appcontext);
  const [wholedata, setwholedata] = useState({});
  const [loading, setloading] = useState(false);

  const getdashboard = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(`${backendurl}/admin/admindashboard`, {
        withCredentials: true,
      });
      if (data.success) {
        setwholedata(data.wholedata);
        setloading(false);
      } else {
        toast.error(data.error);
        setloading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setloading(false);
    }
  };

  const cancelappointment = async (id) => {
    setloading(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/admin/cancelappointment`,
        { id },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setloading(false);
        toast.success(data.message);
        getdashboard();
      } else {
        setloading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getdashboard();
  }, [token]);

  return (
    <div className="w-full p-6">
      <p className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">
        Dashboard
      </p>
      <div className="flex flex-wrap items-center justify-center gap-7">
        <div className="flex items-center justify-center w-64 h-32 bg-zinc-100 rounded-md shadow-lg gap-4">
          <FaUserDoctor size={50} />
          <div className="text-xl">
            <p>
              {loading ? (
                <Loadingtwo />
              ) : wholedata.doctors ? (
                wholedata.doctors
              ) : (
                0
              )}
            </p>
            <p className="font-semibold">Doctors</p>
          </div>
        </div>
        <div className="w-64 h-32 bg-zinc-100 rounded-md shadow-lg">
          <div className="flex items-center justify-center w-64 h-32 bg-zinc-100 rounded-md shadow-lg gap-4">
            <FaUser size={50} />
            <div className="text-xl">
              <p>
                {loading ? (
                  <Loadingtwo />
                ) : wholedata.users ? (
                  wholedata.users
                ) : (
                  0
                )}
              </p>
              <p className="font-semibold">Patients</p>
            </div>
          </div>
        </div>
        <div className="w-64 h-32 bg-zinc-100 rounded-md shadow-lg">
          <div className="flex items-center justify-center w-64 h-32 bg-zinc-100 rounded-md shadow-lg gap-4">
            <SlCalender size={50} />
            <div className="text-xl">
              <p>
                {loading ? (
                  <Loadingtwo />
                ) : wholedata.appointments ? (
                  wholedata.appointments
                ) : (
                  0
                )}
              </p>
              <p className="font-semibold">Appointments</p>
            </div>
          </div>
        </div>
      </div>
      <p className="flex items-center gap-1 font-semibold py-10">
        Latest Appointments <SlCalender />
      </p>

      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="w-full h-screen flex justify-center">
            <Loadingtwo />
          </div>
        ) : wholedata && wholedata?.latestappointments?.length > 0 ? (
          wholedata.latestappointments.map((item, index) => (
            <div
              key={index}
              className="flex justify-between px-0 md:px-9 lg:px-10"
            >
              <div className="flex items-center">
                <img
                  className="w-16 rounded-full mr-2"
                  src={item.userdata.image}
                />
                <div>
                  <p className="font-semibold">{item.userdata.name}</p>
                  <p>
                    {slotdateformat(item.slotdate)} | {item.slottime}
                  </p>
                </div>
              </div>
              {item.cancelled && !item.iscompleted ? (
                <p className="font-semibold text-red-600 mt-8 md:mt-6 lg:mt-5">
                  Cancelled
                </p>
              ) : item.iscompleted ? (
                <p className="font-semibold text-green-600 mt-8 md:mt-6 lg:mt-5">
                  Completed
                </p>
              ) : (
                <img
                  onClick={() => cancelappointment(item._id)}
                  className="w-10 h-10 mt-5 md:mt-4 lg:mt-3"
                  src={assets.cancel_icon}
                />
              )}
            </div>
          ))
        ) : (
          <p className="font-semibold text-center text-zinc-700">
            No Appointments available
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
