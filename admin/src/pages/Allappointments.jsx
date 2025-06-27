import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Admincontext } from "../context/Admincontext";
import { Appcontext } from "../context/Appcontext";
import { assets } from "../assets/assets.js";
import Loadingtwo from "../components/Loadingtwo.jsx";

const Allappointments = () => {
  const {
    getallappointments,
    allappointments,
    token,
    cancelappointment,
    loading,
  } = useContext(Admincontext);
  const { getage, currency, slotdateformat } = useContext(Appcontext);

  useEffect(() => {
    if (token) {
      getallappointments();
    }
  }, [token]);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <p className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">
        All Appointments
      </p>

      <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] bg-gray-100 py-3 px-6 rounded-md font-semibold text-gray-600">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Actions</p>
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="w-full h-screen flex justify-center py-16">
            <Loadingtwo />
          </div>
        ) : allappointments.length > 0 ? (
          allappointments.reverse().map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-4 px-6 border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <p className="w-full sm:w-auto text-gray-700 font-medium text-[21px] md:text-xs lg:text-[16px]">
                {index + 1}
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  className="w-16 h-16  md:w-10 md:h-10  lg:w-10 lg:h-10 rounded-full object-cover shadow-sm"
                  src={item.userdata.image}
                  alt="Patient"
                />
                <p className="text-wrap text-gray-800 text-[21px] md:text-xs lg:text-[16px] font-semibold ">
                  {item.userdata.name}
                </p>
              </div>

              <p className="w-full sm:w-auto text-gray-700 text-[21px] md:text-xs lg:text-[16px] py-2 md:py-0 lg:py-0 ">
                {!getage(item?.userdata?.dob)
                  ? "Not given"
                  : getage(item?.userdata?.dob)}
              </p>

              <p className="w-full sm:w-auto text-gray-700 text-[21px] md:text-xs lg:text-[16px] py-2 md:py-0 lg:py-0  ">
                {slotdateformat(item.slotdate)} | {item.slottime}
              </p>

              <div className="flex items-center  w-full sm:w-auto">
                <img
                  className=" w-16 h-16  md:w-10 md:h-10  lg:w-10 lg:h-10  rounded-full object-cover shadow-sm "
                  src={item.docdata.image}
                  alt="Doctor"
                />
                <p className=" text-[21px] md:text-xs lg:text-[16px] py-2 md:py-0 lg:py-0 text-wrap text-gray-800 px-2 font-semibold">
                  {item.docdata.name}
                </p>
              </div>

              <p className="w-full sm:w-auto text-gray-700 font-medium text-[21px] md:text-xs lg:text-[16px] py-2 md:py-0 lg:py-0  ">
                {currency}
                {item.docdata.fees}
              </p>

              <div className="w-full sm:w-auto flex items-center">
                {item.cancelled && !item.iscompleted ? (
                  <p className="text-red-500 font-semibold text-[21px] md:text-xs lg:text-[16px] py-2 md:py-0 lg:py-0 ">
                    Cancelled
                  </p>
                ) : item.iscompleted ? (
                  <p className="text-green-600 font-semibold text-[21px] md:text-xs lg:text-[16px] py-2 md:py-0 lg:py-0 ">
                    Completed
                  </p>
                ) : (
                  <>
                    <img
                      onClick={() => cancelappointment(item._id)}
                      className="w-14 md:w-10 lg:w-8 cursor-pointer hover:opacity-75 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No Appointments Found
          </p>
        )}
      </div>
    </div>
  );
};

export default Allappointments;
