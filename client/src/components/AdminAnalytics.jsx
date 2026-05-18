import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaEnvelopeOpenText, FaUserMd, FaUsers } from "react-icons/fa";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    pendingApplications: 0,
    appointments: 0,
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        const [users, doctors, applications, appointments] = await Promise.all([
          fetchData("/user/getallusers"),
          fetchData("/doctor/getalldoctors"),
          fetchData("/doctor/getnotdoctors"),
          fetchData("/appointment/getallappointments"),
        ]);

        setStats({
          users: users.length,
          doctors: doctors.length,
          pendingApplications: applications.length,
          appointments: appointments.length,
        });
      } catch (error) {
        setStats({
          users: 0,
          doctors: 0,
          pendingApplications: 0,
          appointments: 0,
        });
      }
    };

    getStats();
  }, []);

  const cards = [
    { label: "Total users", value: stats.users, icon: <FaUsers /> },
    { label: "Doctors", value: stats.doctors, icon: <FaUserMd /> },
    {
      label: "Pending applications",
      value: stats.pendingApplications,
      icon: <FaEnvelopeOpenText />,
    },
    { label: "Appointments", value: stats.appointments, icon: <FaCalendarCheck /> },
  ];

  return (
    <div className="analytics-grid">
      {cards.map((card) => (
        <article key={card.label} className="analytics-card">
          <span>{card.icon}</span>
          <div>
            <small>{card.label}</small>
            <strong>{card.value}</strong>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AdminAnalytics;
