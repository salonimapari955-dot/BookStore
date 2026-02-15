import React from "react";
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import Freebook from "../components/Freebook.jsx";

function Home() {
  return (
    <>
      <Navbar />

      <div className="pt-20">
        <Banner />
      </div>

      <Freebook />
      <Footer />
    
    </>
  );
}

export default Home;
