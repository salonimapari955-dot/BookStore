import React from "react";
import Home from "./home/Home";
import Signup from "./components/Signup";
import Contact from "./components/Contact";

import { Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Login/>
        <Signup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          

        </Routes>
      </div>
    </>
  );
};

export default App;
