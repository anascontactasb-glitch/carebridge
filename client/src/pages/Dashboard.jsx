import React from "react";
import AdminApplications from "../components/AdminApplications";
import AdminAppointments from "../components/AdminAppointments";
import AdminDoctors from "../components/AdminDoctors";
import AdminAnalytics from "../components/AdminAnalytics";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";

const Dashboard = (props) => {
  const { type } = props;
  return (
    <>
      <section className="layout-section">
        <div className="layout-container">
          <Sidebar />
          <main className="dashboard-main">
            <AdminAnalytics />
            {type === "users" ? (
              <Users />
            ) : type === "doctors" ? (
              <AdminDoctors />
            ) : type === "applications" ? (
              <AdminApplications />
            ) : type === "appointments" ? (
              <AdminAppointments />
            ) : (
              <></>
            )}
          </main>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
