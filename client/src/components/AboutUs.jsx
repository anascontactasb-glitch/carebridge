import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="Healthcare team"
            />
          </div>
          <div className="hero-content">
            <h3>Built for a clear healthcare workflow</h3>
            <p>
              Patients can discover doctors and book appointments. Doctors can
              receive appointment requests and mark visits as completed. Admins
              can review doctor applications, manage users, and keep the
              platform organized.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
