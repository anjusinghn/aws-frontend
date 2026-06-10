import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `https://aws-backend-9w0q.onrender.com/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
  <>
    <Navbar />

    <div className="profile-page">

      <div className="profile-sidebar">

        <div className="profile-avatar">
          {userDetails.username?.charAt(0).toUpperCase()}
        </div>

        <h2>{userDetails.username}</h2>

        <p className="profile-email">
          {userDetails.email}
        </p>

        <div className="profile-meta">
          Developer Account
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            setCurrentUser(null);

            window.location.href = "/auth";
          }}
        >
          Logout
        </button>

      </div>

      <div className="profile-content">

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Repositories</h3>
            <p>12</p>
          </div>

          <div className="stat-card">
            <h3>Commits</h3>
            <p>38</p>
          </div>

          <div className="stat-card">
            <h3>Issues</h3>
            <p>9</p>
          </div>

        </div>

        <div className="heatmap-card">
          <HeatMapProfile />
        </div>

      </div>

    </div>
  </>
);
};

export default Profile;