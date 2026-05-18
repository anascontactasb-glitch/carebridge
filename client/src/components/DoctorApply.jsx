import React, { useState } from "react";
import toast from "react-hot-toast";
import "../styles/doctorapply.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN || "/api";

function DoctorApply() {
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

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { specialization, experience, fees, availability } = formDetails;

      if (!specialization || !experience || !fees || !availability) {
        return toast.error("Input field should not be empty");
      }
      const { data } = await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",

          {
            specialization,
            experience,
            fees,
            availability,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Submitting application...",
          success: "Thank You for submitting the apllication.",
          error: "Unable to submit application",
          loading: "Submitting application...",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="apply-doctor-section flex-center">
      <div className="apply-doctor-container flex-center">
        <h2 className="form-heading">Apply For Doctor</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="specialization"
            className="form-input"
            placeholder="Enter your specialization"
            value={formDetails.specialization}
            onChange={inputChange}
          />
          <input
            type="text"
            name="experience"
            className="form-input"
            placeholder="Enter your experience in years"
            value={formDetails.experience}
            onChange={inputChange}
          />
          <input
            type="text"
            name="fees"
            className="form-input"
            placeholder="Enter your fees per consultation in rupees"
            value={formDetails.fees}
            onChange={inputChange}
            defaultChecked="Timings"
          />
          <select
            name="availability"
            value={formDetails.availability}
            className="form-input"
            id="availability"
            onChange={inputChange}
          >
            <option value="Weekdays, 09:00-15:00">Weekdays, 09:00-15:00</option>
            <option value="Weekdays, 15:00-20:00">Weekdays, 15:00-20:00</option>
            <option value="Weekends, 10:00-14:00">Weekends, 10:00-14:00</option>
            <option value="Flexible after confirmation">Flexible after confirmation</option>
          </select>
          <button type="submit" className="btn form-btn">
            apply
          </button>
        </form>
      </div>
    </section>
  );
}

export default DoctorApply;
