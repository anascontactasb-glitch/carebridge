import React, { useCallback, useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";
import { FaSearch } from "react-icons/fa";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = useCallback(async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/doctor/getalldoctors`);
    setDoctors(data);
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    fetchAllDocs();
  }, [fetchAllDocs]);

  const filteredDoctors = doctors.filter((doctor) => {
    const content = `${doctor?.userId?.firstname || ""} ${
      doctor?.userId?.lastname || ""
    } ${doctor?.specialization || ""}`.toLowerCase();
    return content.includes(search.toLowerCase());
  });

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container doctors">
          <h2 className="page-heading">Our Doctors</h2>
          <div className="doctor-search">
            <FaSearch />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by doctor name or specialty"
            />
          </div>
          {filteredDoctors.length > 0 ? (
            <div className="doctors-card-container">
              {filteredDoctors.map((ele) => {
                return (
                  <DoctorCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })}
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

export default Doctors;
