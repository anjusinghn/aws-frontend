import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./RepositoryPage.css";

const RepositoryPage = () => {
  const { id } = useParams();

  const [repo, setRepo] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedFileName, setSelectedFileName] = useState("");

  const [fileContent, setFileContent] = useState("");

  const [commitMessage, setCommitMessage] = useState("");

  const [commits, setCommits] = useState([]);

  const [issues, setIssues] = useState([]);

  const [issueTitle, setIssueTitle] = useState("");

  const [issueDescription, setIssueDescription] = useState("");

  useEffect(() => {
    fetchRepository();
  }, [id]);

  async function fetchRepository() {
    try {
      const repoRes = await axios.get(
        `https://aws-backend-9w0q.onrender.com/repo/${id}`
      );

      setRepo(repoRes.data.repository);

      const commitRes = await axios.get(
        `https://aws-backend-9w0q.onrender.com/repo/commits/${id}`
      );

      setCommits(commitRes.data.commits);

      const issueRes = await axios.get(
        `https://aws-backend-9w0q.onrender.com/issue/all/${id}`
      );

      setIssues(issueRes.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function uploadFile() {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      await axios.post(
        `https://aws-backend-9w0q.onrender.com/repo/upload/${id}`,
        formData
      );

      alert("File uploaded!");

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  async function viewFile(file) {
    try {
      const res = await axios.post(
        "https://aws-backend-9w0q.onrender.com/repo/file",
        {
          key: file,
        }
      );

      setFileContent(res.data.content);

      setSelectedFileName(file.split("/").pop());
    } catch (err) {
      console.error(err);
    }
  }

  async function createCommit() {
    if (!commitMessage) return;

    try {
      await axios.post(
        `https://aws-backend-9w0q.onrender.com/repo/commit/${id}`,
        {
          message: commitMessage,
        }
      );

      alert("Commit created!");

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  async function revertCommit(commitId) {
    try {
      await axios.post(
        `https://aws-backend-9w0q.onrender.com/repo/revert/${commitId}`
      );

      alert("Repository reverted!");

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  async function createIssue() {
    try {
      await axios.post(
        `https://aws-backend-9w0q.onrender.com/issue/create/${id}`,
        {
          title: issueTitle,
          description: issueDescription,
        }
      );

      alert("Issue created!");

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  if (!repo) {
    return <div className="repo-page">Loading...</div>;
  }

  return (
    <div className="repo-page">
      {/* HEADER */}

      <div className="repo-header">
        <h1>{repo.name}</h1>

        <p>{repo.description}</p>
      </div>

      {/* MAIN LAYOUT */}

      <div className="repo-layout">
        {/* SIDEBAR */}

        <div className="sidebar">
          <h2>Files</h2>

          {!repo.content || repo.content.length === 0 ? (
            <p>No files yet.</p>
          ) : (
            repo.content.map((file, index) => (
              <button
                key={index}
                className="file-btn"
                onClick={() => viewFile(file)}
              >
                {file.split("/").pop()}
              </button>
            ))
          )}

          <div style={{ marginTop: "30px" }}>
            <input
              type="file"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />

            <button
              className="upload-btn"
              onClick={uploadFile}
            >
              Upload File
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div>
          {/* FILE VIEWER */}

          <div className="viewer">
            <div className="viewer-header">
              {selectedFileName || "Select a file"}
            </div>

            <pre>
              {fileContent ||
                "// file content will appear here"}
            </pre>
          </div>

          {/* COMMITS + ISSUES */}

          <div className="bottom-grid">
            {/* COMMITS */}

            <div className="card">
              <h2>Commit History</h2>

              <div className="commit-input-row">
                <input
                  type="text"
                  placeholder="Commit message"
                  value={commitMessage}
                  onChange={(e) =>
                    setCommitMessage(e.target.value)
                  }
                />

                <button
                  className="commit-btn"
                  onClick={createCommit}
                >
                  Commit
                </button>
              </div>

              {commits.length === 0 ? (
                <p>No commits yet.</p>
              ) : (
                commits.map((commit) => (
                  <div
                    key={commit._id}
                    className="commit-item"
                  >
                    <h3>{commit.message}</h3>

                    <p>
                      {new Date(
                        commit.createdAt
                      ).toLocaleString()}
                    </p>

                    <button
                      className="revert-btn"
                      onClick={() =>
                        revertCommit(commit._id)
                      }
                    >
                      Revert
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* ISSUES */}

            <div className="card">
              <h2>Issues</h2>

              <input
                type="text"
                placeholder="Issue title"
                value={issueTitle}
                onChange={(e) =>
                  setIssueTitle(e.target.value)
                }
              />

              <textarea
                placeholder="Issue description"
                value={issueDescription}
                onChange={(e) =>
                  setIssueDescription(e.target.value)
                }
              />

              <button
                className="issue-btn"
                onClick={createIssue}
              >
                Create Issue
              </button>

              {issues.length === 0 ? (
                <p>No issues yet.</p>
              ) : (
                issues.map((issue) => (
                  <div
                    key={issue._id}
                    className="issue-item"
                  >
                    <h3>{issue.title}</h3>

                    <p>{issue.description}</p>

                    <small className="status">
                      Status: {issue.status}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryPage;