import doctorModel from "../models/doctorModel.js";

const getalldoctors = async(req,res) => {
   return await doctorModel.find().select("-password, -email");
}

export {getalldoctors};