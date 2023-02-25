import React from "react";
import "./style.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="preloader">
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
        <div className="preloader__square"></div>
      </div>
      <div className="status">
        Connecting<span className="status__dot">.</span>
        <span className="status__dot">.</span>
        <span className="status__dot">.</span>
      </div>
    </div>
  );
};

export default Loader;
