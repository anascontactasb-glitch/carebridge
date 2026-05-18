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
    text: "Browse available doctors by name or specialty and choose the right fit.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Book the visit",
    text: "Choose a time that works and keep your appointment details in one place.",
  },
  {
    icon: <FaBell />,
    title: "Stay updated",
    text: "Get clear updates when an appointment changes or a visit is completed.",
  },
];

const features = [
  "Book appointments with trusted specialists",
  "Manage upcoming and completed visits",
  "Receive important appointment updates",
  "Keep patient and doctor profiles organized",
  "Review doctor availability before booking",
  "Contact the clinic team when help is needed",
];

const LandingSections = () => {
  return (
    <>
      <section className="trust-strip">
        <span>Care that is easier to find, book, and manage</span>
        <strong>Verified doctors</strong>
        <strong>Simple booking</strong>
        <strong>Visit reminders</strong>
        <strong>Secure profiles</strong>
      </section>

      <section className="landing-section workflow-section">
        <div className="section-heading">
          <h2>One clean flow from discovery to follow-up.</h2>
          <p>
            CareBridge helps patients find a doctor, reserve a visit, and follow
            every appointment from request to completion.
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
            From first search to follow-up notes, the experience stays clear for
            patients, doctors, and clinic staff.
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
              <strong>Specialist availability</strong>
              <span>Open times ready to book</span>
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
            <h3>Clinic team</h3>
            <p>Keep appointments, doctors, and patient information organized.</p>
          </article>
        </div>
      </section>

      <section className="landing-section credibility-section">
        <div>
          <FaLock />
          <h2>Privacy-aware and easy to operate.</h2>
          <p>
            CareBridge keeps important visit information in one organized place,
            so patients and staff can focus on the appointment instead of the admin.
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
