import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const BookAppointment = ({ setModalOpen, ele }) => {
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [setModalOpen]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/appointment/bookappointment",
          {
            doctorId: ele?.userId?._id,
            date: formDetails.date,
            time: formDetails.time,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return createPortal(
    <div
      className="modal"
      onMouseDown={() => setModalOpen(false)}
      role="presentation"
    >
      <div
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-appointment-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2
          className="page-heading"
          id="book-appointment-title"
        >
          Book Appointment
        </h2>
        <button
          type="button"
          aria-label="Close booking form"
          onClick={() => {
            setModalOpen(false);
          }}
          className="close-btn"
        >
          <IoMdClose />
        </button>
        <div className="register-container flex-center book">
          <form className="register-form">
            <input
              type="date"
              name="date"
              className="form-input"
              value={formDetails.date}
              onChange={inputChange}
            />
            <input
              type="time"
              name="time"
              className="form-input"
              value={formDetails.time}
              onChange={inputChange}
            />
            <button
              type="submit"
              className="btn form-btn"
              onClick={bookAppointment}
            >
              book
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BookAppointment;
