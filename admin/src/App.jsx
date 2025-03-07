import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Adminlogin from "./pages/Adminlogin";
import DoctorLogin from "./pages/DoctorLogin";
import { ToastContainer } from "react-toastify";
import { Admincontext } from "./context/Admincontext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Adddoctors from "./pages/Adddoctors";
import Doctorslist from "./pages/Doctorslist";
import Allappointments from "./pages/Allappointments";
import Dashboard from "./pages/Dashboard";
import Doctordashboard from "./doctor/Doctordashboard";
import { Doctorcontext } from "./context/Doctorcontext";
import Doctorappointments from './doctor/Doctorappointments';
import Doctorprofile from "./doctor/Doctorprofile";


const App = () => {
  const { token } = useContext(Admincontext);
  const { doctorpass } = useContext(Doctorcontext);

  const isAuthenticated = token || doctorpass; 


  return (
    <>
      <ToastContainer />


      {isAuthenticated && <Navbar />}

      <div className="flex flex-col md:flex-row lg:flex-row  w-full min-h-screen ">
        
        {isAuthenticated && <Sidebar />}

        <Routes>
          {/* Routes for Admin */}
          {token ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointmentspage" element={<Allappointments />} />
              <Route path="/add-doctor" element={<Adddoctors />} />
              <Route path="/doctorlist" element={<Doctorslist />} />
            </>
          ) : doctorpass ? (
            <>
              {/* Routes for Doctor */}
              <Route path="/doctordashboard" element={<Doctordashboard />} />
              <Route path="/doctorappointments" element={<Doctorappointments />} />
              <Route path="/doctorprofile" element={<Doctorprofile />} />
            </>
          ) : (
            <>
              {/* Routes for Login (No Sidebar & Navbar) */}
              <Route path="/" element={<Adminlogin />} />
              <Route path="/doctorlogin" element={<DoctorLogin />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;