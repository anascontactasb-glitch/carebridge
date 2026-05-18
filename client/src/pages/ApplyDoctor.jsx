import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN || "/api";

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
    availability: "Weekdays, 09:00-15:00",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",
          {
            formDetails,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Doctor application sent successfully",
          error: "Unable to send Doctor application",
          loading: "Sending doctor application...",
        }
      );

      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="register-section flex-center apply-doctor"
        id="contact"
      >
        <div className="register-container flex-center contact">
          <h2 className="form-heading">Apply for Doctor</h2>
          <form className="register-form ">
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Enter your specialization"
              value={formDetails.specialization}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience (in years)"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter your fees  (in dollars)"
              value={formDetails.fees}
              onChange={inputChange}
            />
            <select
              name="availability"
              value={formDetails.availability}
              className="form-input"
              onChange={inputChange}
            >
              <option value="Weekdays, 09:00-15:00">Weekdays, 09:00-15:00</option>
              <option value="Weekdays, 15:00-20:00">Weekdays, 15:00-20:00</option>
              <option value="Weekends, 10:00-14:00">Weekends, 10:00-14:00</option>
              <option value="Flexible after confirmation">Flexible after confirmation</option>
            </select>
            <button
              type="submit"
              className="btn form-btn"
              onClick={btnClick}
            >
              apply
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
