import React from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LandingSections from "../components/LandingSections";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <LandingSections />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
