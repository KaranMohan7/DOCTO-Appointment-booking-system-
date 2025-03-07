import React from 'react'
import Footer from "../Components/Footer";
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <>
    <h1 className='text-2xl font-semibold text-zinc-500 text-center'>CONTACT <span className='text-zinc-700 font-extrabold'>US</span></h1>
    <div className='w-full mt-10 flex flex-col items-center lg:items-start justify-center lg:flex-row gap-10'>
      <div>
        <img className='w-96' src={assets.contact_image} />
      </div>
      <div className='mt-5'>
        <p className='font-bold text-lg'>OUR OFFICE</p>
        <div className='py-9 text-gray-400 font-semibold'>
          <p>00000 Willms Station</p>
          <p>Suite 000, Washington, USA</p>
        </div>
        <div className='text-gray-400 font-semibold'>
        <p>Tel: (000) 000-0000</p>
        <p>Email: karanmohan44@gmail.com</p>
        </div>

        <div className='text-gray-400 font-semibold'>
        <p className='text-black mt-10 text-lg mb-3'>Carrers at DOCTO ?</p>
        <button className='bg-zinc-900 text-white font-semibold w-36 px-3 py-3 rounded-md '>Explore Jobs</button>
        </div>
         
      </div>
    </div>
    <div className="mt-10">
      <Footer />
      </div>
    </>
  )
}

export default Contact