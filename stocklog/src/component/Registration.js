import React from "react";
import { Link } from "react-router-dom";
import "../styles/Registration.css";

const Registration = () => {
  return (
    <div className="registration-container">
      <div className="registration-left-panel">
        <h1 className="registration-logo">StockLog</h1>
        <div className="content">
          <h2>Welcome to StockLog!</h2>
          <p>
            Effortlessly track and manage your stock inventory with our
            intuitive and user-friendly app, designed to streamline your
            inventory management process.
          </p>
          <Link to="/signin" className="signin-link">
            <button className="registration-signin-button">SIGN IN</button>
          </Link>
        </div>
      </div>
      <div className="registration-right-panel">
        <h2 className="registration-create-account">Create Account</h2>
        <div className="registration-social-buttons">
          <button className="registration-social-button facebook">
            <img src="/images/icon_facebook.png" alt="Facebook" />
          </button>
          <button className="registration-social-button google">
            <img src="/images/icon_google.png" alt="Google" />
          </button>
          <button className="registration-social-button apple">
            <img src="/images/icon_apple.png" alt="Apple" />
          </button>
        </div>
        <p className="registration-note">Or use email for registration</p>
        <form className="registration-form">
          <div className="registration-input-container">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Name" />
          </div>
          <div className="registration-input-container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="registration-input-container">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className="registration-signup-button">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
