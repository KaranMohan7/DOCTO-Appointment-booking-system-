import React, { useContext, useEffect } from "react";
import { Doctorcontext } from "../context/Doctorcontext";
import { Appcontext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import Loadingtwo from "../components/Loadingtwo";

const Doctorappointments = () => {
  const {
    appointments,
    getappointments,
    doctorpass,
    tickappointment,
    cancelappointment,
    loading,
  } = useContext(Doctorcontext);
  const { currency, getage, slotdateformat } = useContext(Appcontext);

  useEffect(() => {
    getappointments();
  }, [doctorpass]);

  return (
    <div className="w-full">
      <h1 className="text-2xl lg:text-3xl font-semibold p-5">
        All Appointments
      </h1>
      <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] bg-gray-100 py-3 px-6 rounded-md font-semibold text-gray-600">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Payment</p>
        <p>Fees</p>
        <p>Actions</p>
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="w-full h-screen flex justify-center py-16">
            <Loadingtwo />
          </div>
        ) : appointments.length > 0 ? (
          appointments.reverse().map((item, index) => (
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

              <p className=" w-fit text-[21px] md:text-xs lg:text-[14px] border-[1px] border-zinc-800 rounded-2xl py-2 md:py-0 lg:py-0 text-gray-800 px-2 font-semibold ">
                {item.payment ? "ONLINE" : "CASH"}
              </p>

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
                      className="w-12 md:w-8 lg:w-8 cursor-pointer hover:opacity-75 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => tickappointment(item._id)}
                      className="w-12 md:w-8 lg:w-8 cursor-pointer hover:opacity-75 transition"
                      src={assets.tick_icon}
                      alt="tick"
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

export default Doctorappointments;
