import React from "react";
import { useNavigate } from "react-router-dom";
import "./notfound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1 className="text">Page Cannot be found</h1>
      <button className="gobackButton" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;
