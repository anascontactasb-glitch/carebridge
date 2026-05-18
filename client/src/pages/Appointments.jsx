import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";
import { FaBell, FaBellSlash } from "react-icons/fa";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const pendingCount = appointments.filter(
    (appointment) => appointment.status !== "Completed"
  ).length;
  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;
  const nextAppointment = appointments.find(
    (appointment) => appointment.status !== "Completed"
  );
  const hasDoctorActions = appointments.some(
    (appointment) => userId === appointment.doctorId?._id
  );

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/appointment/getallappointments?search=${userId}`
      );
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
            doctorNote: notes[ele?._id] || ele?.doctorNote || "",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment completed",
          error: "Unable to complete appointment",
          loading: "Completing appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  const updateReminder = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/reminder",
          {
            appointid: ele?._id,
            reminder: !ele?.reminder,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: !ele?.reminder ? "Reminder enabled" : "Reminder disabled",
          error: "Unable to update reminder",
          loading: "Updating reminder...",
        }
      );
      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <div className="appointment-tracker">
                <article>
                  <span>Total visits</span>
                  <strong>{appointments.length}</strong>
                </article>
                <article>
                  <span>Pending</span>
                  <strong>{pendingCount}</strong>
                </article>
                <article>
                  <span>Completed</span>
                  <strong>{completedCount}</strong>
                </article>
                <article className="next-appointment">
                  <span>Next appointment</span>
                  <strong>
                    {nextAppointment
                      ? `${nextAppointment.date} at ${nextAppointment.time}`
                      : "No pending visits"}
                  </strong>
                </article>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    <th>Reminder</th>
                    <th>Doctor Note</th>
                    {hasDoctorActions ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.firstname +
                            " " +
                            ele?.doctorId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>
                          <span
                            className={`status-pill ${
                              ele?.status === "Completed" ? "completed" : ""
                            }`}
                          >
                            {ele?.status}
                          </span>
                        </td>
                        <td>
                          {userId === ele?.userId?._id ? (
                            <button
                              type="button"
                              className={`reminder-toggle ${
                                ele?.reminder ? "active" : ""
                              }`}
                              onClick={() => updateReminder(ele)}
                            >
                              {ele?.reminder ? <FaBell /> : <FaBellSlash />}
                              {ele?.reminder ? "On" : "Off"}
                            </button>
                          ) : (
                            ele?.reminder ? "On" : "Off"
                          )}
                        </td>
                        <td>
                          {userId === ele?.doctorId?._id &&
                          ele?.status !== "Completed" ? (
                            <textarea
                              className="note-input"
                              placeholder="Completion note"
                              value={notes[ele?._id] || ""}
                              onChange={(event) =>
                                setNotes({
                                  ...notes,
                                  [ele?._id]: event.target.value,
                                })
                              }
                            />
                          ) : (
                            <span className="doctor-note">
                              {ele?.doctorNote || "Pending completion"}
                            </span>
                          )}
                        </td>
                        {userId === ele?.doctorId?._id ? (
                          <td>
                            <button
                              className={`btn user-btn accept-btn ${
                                ele?.status === "Completed" ? "disable-btn" : ""
                              }`}
                              disabled={ele?.status === "Completed"}
                              onClick={() => complete(ele)}
                            >
                              Complete
                            </button>
                          </td>
                        ) : hasDoctorActions ? (
                          <td>-</td>
                        ) : (
                          <></>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
      <Footer />
    </>
  );
};
export default Appointments;
