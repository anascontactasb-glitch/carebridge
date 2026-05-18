import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/appointment/getallappointments`);
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
            doctorId: ele?.doctorId._id,
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Appointments</h3>
          {appointments.length > 0 ? (
            <div className="user-container">
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
                    <th>Doctor Note</th>
                    <th>Action</th>
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
                          {ele?.status === "Completed" ? (
                            <span className="doctor-note">
                              {ele?.doctorNote || "No note added"}
                            </span>
                          ) : (
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
                          )}
                        </td>
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
    </>
  );
};

export default AdminAppointments;
