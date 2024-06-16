import React from "react";
import "../styles/Registration.css";

export default function Registration() {
  return (
    <div className="registration-container">
      <div className="left-panel">
        <h1 className="logo">StockLog</h1>
        <div className="content">
          <h2>Welcome to StockLog!</h2>
          <p>
            Effortlessly track and manage your stock inventory with our
            intuitive and user-friendly app, designed to streamline your
            inventory management process.
          </p>
          <button className="signin-button">SIGN IN</button>
        </div>
      </div>
      <div className="right-panel">
        <h2 className="create-account">Create Account</h2>
        <div className="social-buttons">
          <button className="social-button facebook">
            <img src="/images/icon_facebook.png" alt="Facebook" />
          </button>
          <button className="social-button google">
            <img src="/images/icon_google.png" alt="Google" />
          </button>
          <button className="social-button apple">
            <img src="/images/icon_apple.png" alt="Apple" />
          </button>
        </div>
        <p className="registration-note">Or use email for registration</p>
        <form className="registration-form">
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Name" />
          </div>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className="signup-button">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}
