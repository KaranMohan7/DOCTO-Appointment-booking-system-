import React from "react";
import { appcontext } from "../Context/Appcontext";
import { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../Components/Loading";
import Loadingtwo from "../Components/Loadingtwo";

const Myappointments = () => {
  const { backendurl, authuser, getdoctors } = useContext(appcontext);
  const [loading, setloading] = useState(false);
  const [appointments, setappointments] = useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotdateformat = (slotdate) => {
    const datearray = slotdate.split("_");
    return (
      datearray[0] + " " + months[Number(datearray[1]) - 1] + " " + datearray[2]
    );
  };

  const getappointments = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(`${backendurl}/user/getappointment`, {
        withCredentials: true,
      });
      if (data.success) {
        setappointments(data.appointdata.reverse());
        setloading(false);
      } else {
        toast.error(data.message);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  const cancelappointment = async (id, userid) => {
    setloading(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/user/cancelappointment`,
        { id, userid },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        getappointments();
        getdoctors();
        setloading(false)
      } else {
        toast.error(data.message);
           setloading(false)
      }
    } catch (error) {
      toast.error(error.message);
         setloading(false)
    } finally {
      setloading(false);
    }
  };

  const restoreScrolling = () => {
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = "visible";
  };

  const initpay = (order) => {
    restoreScrolling();

    const options = {
      key: import.meta.env.VITE_RAZOR_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Payment for doctor appointment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendurl}/user/verification`,
            response,
            { withCredentials: true }
          );
          if (data.success) {
            toast.success(data.message);
            getappointments();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          restoreScrolling();
          setloading(false);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", () => {
      restoreScrolling();
      setloading(false);
      toast.error("Payment failed. Try again.");
    });

    rzp.on("close", () => {
      setTimeout(() => {
        restoreScrolling();
      }, 500);
      setloading(false);
    });
  };

  const paymentrazorpay = async (id) => {
    setloading(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/user/payment`,
        { id },
        { withCredentials: true }
      );
      if (data.success) {
        initpay(data.order);
      } else {
        toast.error(data.message);
        setloading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (authuser) {
      getappointments();
    }
  }, [authuser]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      restoreScrolling();
    }
  }, [loading]);

  return (
    <div className="w-full min-h-screen">
      <p className="font-semibold py-5 px-20">My Appointments</p>
      <hr className="border-gray-300 w-[90%] m-auto" />
      {loading ? (
        <div className="flex fixed justify-center items-center w-full h-screen z-[100] top-0 left-0">
          <Loading />
        </div>
      ) : appointments.length > 0 ? (
        appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row lg:flex-row items-center justify-center w-full px-16 lg:px-20 mb-5 py-2"
          >
            <img
              className="w-96 md:w-40 lg:w-40 bg-zinc-200 mr-3"
              src={item.docdata.image}
            />
            <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center w-full">
              <div className="text-lg mt-3">
                <p className="font-semibold">{item.docdata.name}</p>
                <p>{item.docdata.speciality}</p>
                <p>Address</p>
                <p className="w-40 mt-1">{item.docdata.address}</p>
                <p>
                  <span className="font-semibold"> Date & Time:</span>{" "}
                  {slotdateformat(item.slotdate)} | {item.slottime}
                </p>
              </div>

              <div className="flex flex-col justify-center gap-2 mt-3">
                {item.cancelled ? (
                  <span className="text-red-500 font-semibold">
                    Appointment Cancelled
                  </span>
                ) : (
                  <>
                    {item.payment && !item.iscompleted && (
                      <h1 className="text-green-600 font-semibold ml-5">
                        Successfully Paid
                      </h1>
                    )}

                    {!item.payment && !item.cancelled && (
                      <>
                        <button
                          onClick={() => paymentrazorpay(item._id)}
                          className="border-[1px] border-zinc-300 w-40 px-3 py-2 rounded-md text-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                          Pay Now
                        </button>
                        <button
                          onClick={() =>
                            cancelappointment(item._id, item.userid)
                          }
                          className="border-[1px] border-zinc-300 w-40 px-3 py-2 rounded-md text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          Cancel Appointment
                        </button>
                      </>
                    )}

                    {item.iscompleted && item.payment && !item.cancelled && (
                      <p className="border-[1px] border-zinc-300 w-40 px-3 py-2 rounded-md text-sm text-center">
                        Completed
                      </p>
                    )}

                    {!item.cancelled && !item.iscompleted && item.payment && (
                      <button
                        onClick={() => cancelappointment(item._id, item.userid)}
                        className="border-[1px] border-zinc-300 w-40 px-3 py-2 rounded-md text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center py-2">No Appointments available</h1>
      )}
      <Footer />
    </div>
  );
};

export default Myappointments;
