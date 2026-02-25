import React from "react";
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import Freebook from "../components/Freebook.jsx";
import About from "../components/About.jsx";

function Home() {
  return (
    <>
      <Navbar />

      <div className="pt-20">
        <Banner />
      </div>
      <Freebook />
      <About />

      <Footer />
    </>
  );
}

export default Home;
