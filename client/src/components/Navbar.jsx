import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import {
  FaBell,
  FaCalendarCheck,
  FaChevronDown,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaUserCircle,
  FaUserMd,
} from "react-icons/fa";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const user =
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : "";

  const closeMenus = () => {
    setIconActive(false);
    setDropdownOpen(false);
  };

  const closeAccountMenu = () => {
    closeMenus();
  };

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick, true);
    document.addEventListener("click", closeOnOutsideClick, true);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick, true);
      document.removeEventListener("click", closeOnOutsideClick, true);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    closeMenus();
    navigate("/login");
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>CareBridge</NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"}>Doctors</NavLink>
          </li>
          <li>
            <HashLink to={"/#contact"}>Contact</HashLink>
          </li>
          {!token ? (
            <>
              <li>
                <NavLink
                  className="btn"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn"
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <div
                className="profile-menu"
                ref={accountMenuRef}
              >
                <button
                  className="avatar-btn"
                  type="button"
                  aria-label="Open account menu"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <FaUserCircle />
                  <FaChevronDown className="avatar-chevron" />
                </button>
                {dropdownOpen && (
                  <button
                    className="profile-backdrop"
                    type="button"
                    aria-label="Close account menu"
                    onClick={closeMenus}
                  />
                )}
                {dropdownOpen && (
                <div className="profile-dropdown">
                  {user.isAdmin && (
                    <NavLink onClick={closeAccountMenu} to={"/dashboard/users"}>
                      <FaTachometerAlt /> Dashboard
                    </NavLink>
                  )}
                  <NavLink onClick={closeAccountMenu} to={"/appointments"}>
                    <FaCalendarCheck /> Appointments
                  </NavLink>
                  <NavLink onClick={closeAccountMenu} to={"/notifications"}>
                    <FaBell /> Notifications
                  </NavLink>
                  {!user.isAdmin && (
                    <NavLink onClick={closeAccountMenu} to={"/applyfordoctor"}>
                      <FaUserMd /> Apply for doctor
                    </NavLink>
                  )}
                  <NavLink onClick={closeAccountMenu} to={"/profile"}>
                    <FaUser /> Profile
                  </NavLink>
                  <button type="button" onClick={logoutFunc}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
