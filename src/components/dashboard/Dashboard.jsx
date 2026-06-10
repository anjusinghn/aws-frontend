import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://aws-backend-9w0q.onrender.com/repo/user/${userId}`
        );
        const data = await response.json();
        console.log("User repos:", data);
        setRepositories(data.repositories || []);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`https://aws-backend-9w0q.onrender.com/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data.repositories || []);
        console.log(suggestedRepositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  //Added part

  //   useEffect(() => {
  //   console.log("repositories state:", repositories);
  // }, [repositories]);

 return (
  <>
    <Navbar />

    <div className="dashboard-page">
      <div className="dashboard-container">

        <aside className="dashboard-sidebar">
          <h3>Suggested Repositories</h3>

          {suggestedRepositories.map((repo) => (
            <div
              className="suggested-card"
              key={repo._id}
            >
              <div className="repo-name">
                {repo.name}
              </div>

              <div className="repo-description">
                {repo.description}
              </div>
            </div>
          ))}
        </aside>

        <main className="dashboard-main">
          <h2>Your Repositories</h2>

          <div className="search-box">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search repositories..."
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>

          {searchResults.length === 0 ? (
            <p className="empty-text">
              No repositories found.
            </p>
          ) : (
            searchResults.map((repo) => (
              <Link
                key={repo._id}
                to={`/repo/${repo._id}`}
              >
                <div className="repo-card">
                  <div className="repo-name">
                    {repo.name}
                  </div>

                  <div className="repo-description">
                    {repo.description}
                  </div>
                </div>
              </Link>
            ))
          )}
        </main>

        <aside className="dashboard-right">
          <h3>Developer Events</h3>

          <div className="event-card">
            Tech Conference — Dec 15
          </div>

          <div className="event-card">
            Developer Meetup — Dec 25
          </div>

          <div className="event-card">
            React Summit — Jan 5
          </div>
        </aside>

      </div>
    </div>
  </>
);
};

export default Dashboard;