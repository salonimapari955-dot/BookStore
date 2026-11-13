import React from "react";
import Home from "./home/Home";
import Signup from "./components/Signup";
import Contact from "./components/Contact";

import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/Authprovider";

const App = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Login />
        <Signup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/" replace />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Toaster />
      </div>
    </>
    
  );
};

export default App;
