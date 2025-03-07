import React from "react";
import { useContext, useEffect, useState } from "react";
import { Doctorcontext } from "../context/Doctorcontext";
import axios from "axios";
import { Appcontext } from "../context/Appcontext";
import { toast } from "react-toastify";

const Doctorprofile = () => {
  const { backendurl, doctorpass } = useContext(Doctorcontext);
  const { currency } = useContext(Appcontext);
  const [profiledata, setprofiledata] = useState({});
  const [edit, setedit] = useState(false);

  const [datamain, setdatamain] = useState({
    fees: "",
    address: "",
    available: false,
  });


  const getprofile = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/doctor/profile`, {
        withCredentials: true,
      });
      if (data.success) {
        setprofiledata(data.maindoctor);
        setdatamain({
          fees: data.maindoctor.fees,
          address: data.maindoctor.address,
          available: data.maindoctor.available,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${backendurl}/doctor/updateprofile`,
       {  ...datamain,  id:profiledata._id },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        setedit(false)
        getprofile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctorpass) {
      getprofile();
    }
  }, [doctorpass]);

  return (
    <div className="w-full">
      <p className="text-2xl lg:text-3xl font-semibold p-5">Profile</p>
      <form onSubmit={handlesubmit}>
        <div className="flex flex-col justify-center items-start px-7">
          <div className="bg-zinc-300 rounded-md w-64 mt-2">
            {" "}
            <img className="w-62 " src={profiledata.image} alt='image' />
          </div>
          <p className="font-semibold text-2xl pt-4">{profiledata.name}</p>
          <p className="text-zinc-500">
            {profiledata.degree} - {profiledata.speciality}{" "}
          </p>
          <p className="font-semibold">About</p>
          <p> - {profiledata.about}</p>
          <p className="pt-3">
            Appointment fee -{" "}
            {edit ? (
              <input
                value={datamain.fees}
                onChange={(e) =>
                  setdatamain((prev) => ({ ...prev, fees: e.target.value }))
                }
                type="Number"
                className="py-1 px-2 w-30 outline-none bg-zinc-200 rounded-md"
              />
            ) : (
              <span className="font-semibold">
                {currency}
                {profiledata.fees}
              </span>
            )}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <p>Address -</p>{" "}
            {edit ? (
              <input
                value={datamain.address}
                onChange={(e) =>
                  setdatamain((prev) => ({ ...prev, address: e.target.value }))
                }
                type="text"
                className="py-2 px-2 w-72 outline-none bg-zinc-200 rounded-md"
              />
            ) : (
              <p>{profiledata.address}</p>
            )}
          </div>
          <div className="flex items-center gap-1 py-1">
            <input
              checked={datamain.available}
              onChange={(e) =>
                setdatamain((prev) => ({ ...prev, available: e.target.checked }))
                
              }
              type="checkbox"
              name="available"
              id=""
            />
            <label htmlFor="">Available</label>
          </div>
          {edit ? (
            <> <button type='submit' className='border-[1px] border-zinc-900 w-fit px-4 py-1 mt-3 rounded-full hover:bg-zinc-900 hover:text-white duration-300 transition-all'>Submit</button>
            <button
            type="button"
              className="border-[1px] border-zinc-900 w-fit px-4 py-1 rounded-full hover:bg-zinc-900 hover:text-white duration-300 transition-all mt-3"
              onClick={() => setedit(false)}
            >
              Cancel
            </button>
            </>
          ) : (
            <button
            type="button"
              className="border-[1px] border-zinc-900 w-fit px-4 py-1 mt-3 rounded-full hover:bg-zinc-900 hover:text-white duration-300 transition-all"
              onClick={() => setedit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Doctorprofile;
