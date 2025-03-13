import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import { appcontext } from "../Context/Appcontext";
import axios from "axios";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router";

const Profile = () => {
  const { backendurl, setprofileDetails, profileDetails, getprofiledetails, authuser } =
    useContext(appcontext);

  const [edit, setedit] = useState(false);
  const [loading,setloading] = useState(false)
  const [image, setimage] = useState(false);
  const navigate = useNavigate()

  const edituser = async (e) => {
    e.preventDefault();
    setloading(true)
    const formData = new FormData();
    formData.append("email", profileDetails.email);
    formData.append("phone", profileDetails.phone);
    formData.append("gender", profileDetails.gender);
    formData.append("dob", profileDetails.dob);
    formData.append("address", profileDetails.address);

    if (image && image !== profileDetails.image) {
      formData.append("image", image);
    }
    try {
      const { data } = await axios.post(
        `${backendurl}/user/editprofiledetails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        setloading(false)
        getprofiledetails();
        setedit(false);

        setimage(false);
        toast.success(data.message);
      } else {
        setloading(false)
        toast.error(data.message);
      }
    } catch (error) {
      setloading(false)
      toast.error(error.message);
    }
  };

  useEffect(() => {
     if(!authuser){
       navigate("/")
     }
  }, [authuser])
  

  return (
    <div className="w-full h-screen">
        {loading && (
        <div className="flex fixed justify-center items-center w-full h-screen bg-[rgba(0,0,0,0.5)] z-[100] top-0 left-0">
          <Loading />
        </div>
      )}
      <div className="px-5 md:px-10 lg:px-20 w-[50%]">
        {edit ? (
          <label htmlFor="image">
            <div className="relative inline-block">
              <img
                className="w-72"
                src={image ? URL.createObjectURL(image) : profileDetails.image}
              />
              <img
                className=" w-10 absolute bottom-28 right-32"
                src={image ? "" : assets.upload_icon}
              />
            </div>
            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-72 rounded-md"
            src={profileDetails.image}
          />
        )}
        <p className=" text-3xl lg:text-4xl font-semibold py-2">
          {profileDetails.name}
        </p>
        <hr className="" />
        <p className="py-5 underline">Contact Information</p>
      </div>

      <div className=" px-5 md:px-10 lg:px-20 w-[50%] flex flex-col gap-4 justify-center">
        <div className="flex items-center gap-4">
          <p className="font-semibold">Email: </p>
          {edit ? (
            <input
              type="text"
              placeholder="Enter Your email"
              className="bg-gray-200 outline-none w-96 px-2 py-1  rounded-md"
              value={profileDetails.email}
              onChange={(e) =>
                setprofileDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-blue-500">{profileDetails.email}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Phone: </p>
          {edit ? (
            <input
              type="text"
              className="bg-gray-200 outline-none w-96 px-2 py-1  rounded-md"
              placeholder="Enter Your number"
              value={profileDetails.phone}
              onChange={(e) =>
                setprofileDetails((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-blue-500">{profileDetails.phone}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <p className="font-semibold">Address: </p>
          {edit ? (
            <input
              type="text"
              placeholder="Enter Your address "
              className="bg-gray-200 outline-none w-96 px-2 py-1  rounded-md"
              value={profileDetails.address}
              onChange={(e) =>
                setprofileDetails((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-nowrap">{profileDetails.address}</p>
          )}
        </div>

        <p className="underline mt-3">Basic Information</p>

        <div className="flex items-center gap-4">
          <p className="font-semibold">Gender: </p>

          {edit ? (
            <select
              onChange={(e) =>
                setprofileDetails((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              className="w-52 py-1 px-1 outline-none bg-gray-200"
            >
              <option>{profileDetails.gender}</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          ) : (
            <p>{profileDetails.gender}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Birthday: </p>
          {edit ? (
            <input
              className="w-52 py-1 px-1 outline-none bg-gray-200"
              type="date"
              placeholder="Enter Your birthday"
              value={profileDetails.dob}
              onChange={(e) =>
                setprofileDetails((prev) => ({
                  ...prev,
                  dob: e.target.value,
                }))
              }
            />
          ) : (
            <p className="">{profileDetails.dob}</p>
          )}
        </div>
        <div className="py-5 flex items-center gap-4">
          {edit ? null : (
            <button
              onClick={() => setedit(true)}
              className="border-[1px] border-zinc-800 px-3 w-30 py-3 rounded-3xl transition-all duration-300 hover:bg-zinc-900 hover:text-white"
            >
              Edit
            </button>
          )}
          {edit ? (
            <button
              onClick={edituser}
              className="border-[1px] border-zinc-800 px-5 py-3 rounded-3xl transition-all duration-300 hover:bg-zinc-900 hover:text-white"
            >
              Save Information
            </button>
          ) : null}

          {edit ? (
            <button
              onClick={() => setedit(false)}
              className="border-[1px] border-zinc-800 px-5 py-3 rounded-3xl transition-all duration-300 hover:bg-zinc-900 hover:text-white"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
