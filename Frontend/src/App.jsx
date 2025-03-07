import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Doctors from './Pages/Doctors'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Profile from  './Pages/Profile'
import Doctordetail from "./Pages/Doctordetail"
import Create from './Pages/Create'
import Myappointments from './Pages/Myappointments'
import { ToastContainer } from 'react-toastify'


const App = () => {
  

  return (
    <div className='w-full h-screen '>
         <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/doctors' element={<Doctors />}/>
        <Route path='/doctors/:speciality' element={<Doctors />}/>
        <Route path='/doctordetail/:id' element={<Doctordetail />} />
        <Route path='/appointments' element={<Myappointments />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile /> } />
      </Routes>

    </div>
  )
}

export default App