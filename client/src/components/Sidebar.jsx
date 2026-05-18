import React from "react";
import {
  FaHome,
  FaList,
  FaUser,
  FaUserMd,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import "../styles/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebar = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaList />,
    },
    {
      name: "Applications",
      path: "/dashboard/applications",
      icon: <FaEnvelope />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <section className="sidebar-section flex-center">
        <div className="sidebar-container">
          <div className="sidebar-brand">
            <span>+</span>
            <div>
              <strong>CareBridge</strong>
              <small>Admin console</small>
            </div>
          </div>
          <ul>
            {sidebar.map((ele, i) => {
              return (
                <li key={i}>
                  <NavLink
                    to={ele.path}
                    className={({ isActive }) =>
                      isActive ? "sidebar-link active" : "sidebar-link"
                    }
                  >
                    {ele.icon}
                    <span>{ele.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <button className="logout-container" type="button" onClick={logoutFunc}>
            <MdLogout />
            <span>Logout</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
