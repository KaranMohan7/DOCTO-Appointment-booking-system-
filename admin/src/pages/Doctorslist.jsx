import React, { useContext, useEffect } from "react";
import { Admincontext } from "../context/Admincontext";
import Doctorcard from "../components/Doctorcard";
import Loadingtwo from "../components/Loadingtwo";

const Doctorslist = () => {
  const { alldoctors, doctors, token, loading } = useContext(Admincontext);

  useEffect(() => {
    alldoctors();
  }, [token]);

  return (
    <div className="w-full  ">
      <h1 className="text-2xl lg:text-3xl font-semibold p-5">All Doctors</h1>
      <div className=" flex items-center justify-center flex-wrap gap-7">
        {loading ? (
          <div className="w-full h-screen flex justify-center py-16">
            <Loadingtwo />
          </div>
        ) : (
          doctors.map((item, index) => (
            <div key={index}>
              <Doctorcard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctorslist;
