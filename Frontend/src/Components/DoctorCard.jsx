import React from "react";

const DoctorCard = ({ item }) => {
  return (
    <div className="w-80 h-96  md:w-60 md:h-72 lg:w-60 lg:h-72 bg-zinc-300 rounded-md outline-zinc-200 outline-2 relative overflow-hidden">
      <img className="h-72 md:h-52 lg:h-52" src={item.image} />
      <div className="bg-white w-full h-[25%] md:h-[28%] lg:h-[28%] ">
        <div className="flex items-center gap-2 px-4 py-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <p className={`${item.available ? 'text-green-600' : 'text-red-600'} font-semibold` }>{item.available ? 'Available' : 'Unavailable' }</p>
        </div>
        <p className="px-4 text-sm font-semibold ">{item.name}</p>
        <p className="px-5 text-xs font-semibold text-zinc-400 ">
          {item.speciality}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
