import React, { lazy, Suspense } from 'react'
import {Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Loading from './Components/Loading'
import Navbar from './Components/Navbar'

const Home = lazy(() => import('./Pages/Home'))
const About = lazy(() => import('./Pages/About'))
const Contact = lazy(() => import('./Pages/Contact'))
const Doctors = lazy(() => import('./Pages/Doctors'))
const Login = lazy(() => import('./Pages/Login'))
const Profile = lazy(() => import('./Pages/Profile'))
const Doctordetail = lazy(() => import('./Pages/Doctordetail'))
const Create = lazy(() => import('./Pages/Create'))
const Myappointments = lazy(() => import('./Pages/Myappointments'))


const App = () => {

  return (
    <div className='w-full h-screen '>
         <ToastContainer />
      <Navbar/>
      <Suspense fallback={<div className='flex justify-center mt-20'><Loading /></div>}>
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
        <Route path='/profile' element={<Profile />} />
        </Routes>
        </Suspense>
        </div>
  )
}

export default App