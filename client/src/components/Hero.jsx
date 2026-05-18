import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";
import { FaBell, FaCalendarCheck, FaUserMd } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Healthcare bookings, organized in minutes.
        </h1>
        <p>
          Patients find the right specialist, doctors manage visits, and admins
          keep every application and appointment under control.
        </p>
        <div className="hero-actions">
          <a className="btn" href="/doctors">
            Find a doctor
          </a>
          <a className="btn btn-secondary" href="/login">
            Try sample login
          </a>
        </div>
        <div className="hero-metrics">
          <span>
            <FaUserMd /> Verified doctors
          </span>
          <span>
            <FaCalendarCheck /> Status tracking
          </span>
          <span>
            <FaBell /> Live notifications
          </span>
        </div>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="Doctor reviewing a healthcare appointment"
        />
        <div className="hero-card">
          <strong>Next visit</strong>
          <span>Cardiology consultation</span>
          <small>Pending confirmation</small>
        </div>
      </div>
    </section>
  );
};

export default Hero;
