import React, { useState } from 'react'
import { createContext } from 'react'

export const Appcontext = createContext()

const AppContextProvider = ({children}) => {
  const currency = "$"
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

  const getage = (dob) => {
    const today = new Date();
    const birthdate = new Date(dob);
  
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    
    return age;
  }
  
  
  const slotdateformat = (slotdate) => {
    const datearray = slotdate.split("_");
    return datearray[0]+ " " +months[Number(datearray[1])] + " " + datearray[2]
}

     const datavalue = {
       getage,
       currency,
       months,
       slotdateformat,
     }

  return (
    <Appcontext.Provider value={datavalue}>{children}</Appcontext.Provider>
  )
}

export default AppContextProvider