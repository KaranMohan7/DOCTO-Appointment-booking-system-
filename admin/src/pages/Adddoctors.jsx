import React, { useContext, useEffect, useState } from 'react'
import { assets, specialityData } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Admincontext } from '../context/Admincontext'
import Loading from '../components/Loading'


const Adddoctors = () => {

   const [doctimage, setdoctimage] = useState(null)
   const [forminfo, setforminfo] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        speciality: "General Physician",
        experience: "",
        degree: "",
        fees: "",
        about: ""
   })
   const [loading,setloading] = useState(false)
   const { backendurl } = useContext(Admincontext);

   const handleChange = (e) => {
          const { name,value } = e.target;
          setforminfo((prev) => ({
                 ...prev, [name]: value
          }))
     }
      
     const onSubmithandler = async(e) => {
           e.preventDefault();

           if(!doctimage){
            return toast.error("Please Upload Image");
          }

           const formData = new FormData();
           formData.append("name",forminfo.name);
           formData.append("email",forminfo.email);
           formData.append("password",forminfo.password);
           formData.append("speciality",forminfo.speciality);
           formData.append("address", forminfo.address);
           formData.append("fees",forminfo.fees);
           formData.append("about", forminfo.about);
           formData.append("degree",forminfo.degree);
           formData.append("experience",forminfo.experience);
           formData.append("image",doctimage);

           try {
            setloading(true)
             const {data} = await axios.post(`${backendurl}/admin/add-doctor`,formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials: true,
             });
             if(data.success){
              toast.success("Doctor Added Successfully")
              setforminfo({
                name: "",
                email: "",
                password: "",
                address: "",
                speciality: "General Physician",
                experience: "",
                degree: "",
                fees: "",
                about: ""
               })
               setdoctimage(null)
               setloading(false)
             }else{
              toast.error(data.message)
              setloading(false)
             }
           } catch (error) {
             toast.error(error.message)
             setloading(false)
           }
     }

     if (loading) {
      return (
        <div className="flex items-center justify-center h-screen w-screen ">
          <Loading />
        </div>
      );
    }

    
  return (
    <div className='w-full'>
      <h1 className='text-2xl lg:text-3xl font-semibold p-5'>Add Doctors</h1>
        <form onSubmit={onSubmithandler} encType="multipart/form-data">
          <div className='flex flex-col justify-center items-center w-full'>
          <div className='flex items-center gap-2 px-5'>
            <label htmlFor='doct-img'>
            <img className='w-20 overflow-hidden' src={doctimage ? URL.createObjectURL(doctimage) : assets.upload_area} />
            </label>
            <input onChange={(e) => setdoctimage(e.target.files[0])} type='file' id='doct-img' name='image' hidden />
            <p>Upload Picture</p>
             </div> 
             <div className='flex flex-col md:flex-row lg:flex-row items-center justify-evenly w-full gap-3 py-3'>
                  <div>
                    <p>Name of Doctor</p>
                    <input name='name' onChange={handleChange} value={forminfo.name} className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg' type='text' placeholder='Enter the Name'></input>
                  </div>
                  <div>
                    <p>Speciality</p>
                    <select name='speciality' onChange={handleChange}  value={forminfo.speciality}   className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg'>
                    {
                     specialityData.map((item,index) => (
                      <option  value={item.speciality}  key={index}>{item.speciality}</option>
                     ))
                    }
                    </select>
                  </div>
        
             </div>
             <div className='flex flex-col md:flex-row lg:flex-row items-center justify-evenly w-full gap-3 py-3'>
                  <div>
                    <p>Your Email</p>
                    <input required  onChange={handleChange} value={forminfo.email}  name='email' className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg' type='email' placeholder='Enter the Email'></input>
                  </div>
                  <div>
                    <p>Your Degree</p>
                    <input required onChange={handleChange} value={forminfo.degree}  name='degree'   className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg' type='text' placeholder='Enter Your Degree'></input>
                  </div>
        
             </div>
             <div className='flex flex-col md:flex-row lg:flex-row items-center justify-evenly w-full gap-3 py-3'>
                  <div>
                    <p>Your Password</p>
                    <input required  onChange={handleChange} value={forminfo.password}  name='password' className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg' type='password' placeholder='Enter the Password'></input>
                  </div>
                  <div>
                    <p>Your Address</p>
                    <input required onChange={handleChange} value={forminfo.address} name='address' className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg' type='text' placeholder='Enter Your address'></input>
                  </div>
        
             </div>

             <div className='flex flex-col md:flex-row lg:flex-row items-center justify-evenly w-full gap-3 py-3'>
                  <div>
                    <p>Your Fees</p>
                    <input required onChange={handleChange} value={forminfo.fees}  name='fees' className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg' type='number' placeholder='Enter your Fees'></input>
                      </div>
                    <div>   
                    <p>Your Experience</p>
                    <input required onChange={handleChange} value={forminfo.experience}  name='experience' className='w-80 outline-none px-2 py-2 bg-zinc-100 rounded-lg' type='text' placeholder='Enter your Experience'></input>
                  </div>
             </div>

             <div className='flex flex-col md:flex-row lg:flex-row items-center justify-evenly w-full gap-3 py-2'>
                  <div>
                    <p>About You</p>
                    <textarea required onChange={handleChange} value={forminfo.about} name='about' className='min-w-[24rem] md:min-w-[40rem] lg:min-w-[52rem] min-h-[10rem] outline-none px-4 py-4 bg-zinc-100 rounded-lg resize-none border-[1px] border-zinc-200' type='number' placeholder='write about yourself'></textarea>
                  </div>
             </div>
             <button type='submit' className=' font-semibold p-5 bg-zinc-800 w-30 text-center px-2 py-2 rounded-md text-white mb-4 transition-all hover:bg-green-600 duration-300'>Submit</button>
          </div>
            
        </form>
    </div>
  )
}

export default Adddoctors