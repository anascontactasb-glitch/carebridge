import React from "react";
import "../styles/landing.css";
import {
  FaBell,
  FaCalendarCheck,
  FaClipboardCheck,
  FaLock,
  FaSearch,
  FaShieldAlt,
  FaUserCheck,
  FaUserMd,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Find a specialist",
    text: "Search by doctor name or specialty and compare basic visit details.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Book the visit",
    text: "Pick a date and time, then track the request from the appointment page.",
  },
  {
    icon: <FaBell />,
    title: "Stay updated",
    text: "Patients and doctors receive notifications when important actions happen.",
  },
];

const features = [
  "Patient registration and secure login",
  "Doctor application and approval workflow",
  "Admin dashboard for users, doctors, and appointments",
  "Appointment status tracking",
  "Profile updates and notification history",
  "Seeded healthcare data for quick setup",
];

const LandingSections = () => {
  return (
    <>
      <section className="trust-strip">
        <span>Designed for reliable healthcare appointment operations</span>
        <strong>Patient flow</strong>
        <strong>Doctor workflow</strong>
        <strong>Admin review</strong>
        <strong>Seeded records</strong>
      </section>

      <section className="landing-section workflow-section">
        <div className="section-heading">
          <h2>One clean flow from discovery to follow-up.</h2>
          <p>
            The project is easy to explain: users book care, doctors manage the
            appointment, and admins keep the platform trustworthy.
          </p>
        </div>
        <div className="workflow-grid">
          {steps.map((step) => (
            <article className="workflow-card" key={step.title}>
              <div className="workflow-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section split-showcase">
        <div className="showcase-copy">
          <h2>A complete care workflow in one platform.</h2>
          <p>
            CareBridge is not just a static frontend. It has roles,
            protected routes, dashboards, notifications, and appointment data
            moving through the system.
          </p>
          <div className="feature-list">
            {features.map((feature) => (
              <span key={feature}>
                <FaClipboardCheck /> {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="showcase-panel">
          <div className="panel-top">
            <span>Live care queue</span>
            <strong>Today</strong>
          </div>
          <div className="queue-row active">
            <FaUserMd />
            <div>
              <strong>Cardiology visit</strong>
              <span>Pending appointment</span>
            </div>
          </div>
          <div className="queue-row">
            <FaUserCheck />
            <div>
              <strong>Doctor application</strong>
              <span>Ready for admin review</span>
            </div>
          </div>
          <div className="queue-row">
            <FaBell />
            <div>
              <strong>Patient notification</strong>
              <span>Booking confirmation sent</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section role-section">
        <div className="section-heading compact">
          <h2>Three useful roles, not just one login screen.</h2>
        </div>
        <div className="role-grid">
          <article>
            <FaSearch />
            <h3>Patient</h3>
            <p>Browse doctors, book appointments, track status, and receive updates.</p>
          </article>
          <article>
            <FaUserMd />
            <h3>Doctor</h3>
            <p>Review assigned appointments and mark visits as completed.</p>
          </article>
          <article>
            <FaShieldAlt />
            <h3>Admin</h3>
            <p>Approve applications, manage users, and supervise platform activity.</p>
          </article>
        </div>
      </section>

      <section className="landing-section credibility-section">
        <div>
          <FaLock />
          <h2>Privacy-aware and easy to operate.</h2>
          <p>
            The app supports MongoDB for persistent deployments and includes
            seeded local records for fast evaluation without external services.
          </p>
        </div>
        <a className="btn" href="/doctors">
          Explore doctors
        </a>
      </section>
    </>
  );
};

export default LandingSections;
