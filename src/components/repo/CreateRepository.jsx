import React, { useState } from "react";
import axios from "axios";
import "./createRepository.css";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);

  const handleCreateRepo = async (e) => {
    e.preventDefault();

    try {
      const owner = localStorage.getItem("userId");

      const res = await axios.post(
        "https://aws-backend-9w0q.onrender.com/repo/create",
        {
          owner,
          name,
          description,
          visibility,
          content: [],
          issues: [],
        }
      );

      alert("Repository Created!");

      console.log(res.data);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Failed to create repository");
    }
  };

  return (
  <div className="create-page">

    <div className="create-card">

      <h1>Create Repository</h1>

      <p className="create-subtitle">
        Start managing your codebase with version control.
      </p>

      <form
        className="create-form"
        onSubmit={handleCreateRepo}
      >

        <div className="form-group">
          <label>Repository Name</label>

          <input
            type="text"
            value={name}
            required
            placeholder="my-awesome-project"
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            value={description}
            placeholder="Describe your repository..."
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <div className="visibility-box">

          <span>
            {visibility ? "Public Repository" : "Private Repository"}
          </span>

          <button
            type="button"
            className={
              visibility
                ? "visibility-btn active"
                : "visibility-btn"
            }
            onClick={() =>
              setVisibility(!visibility)
            }
          >
            {visibility ? "Public" : "Private"}
          </button>

        </div>

        <button
          type="submit"
          className="create-btn"
        >
          Create Repository
        </button>

      </form>

    </div>

  </div>
);
};

export default CreateRepository;