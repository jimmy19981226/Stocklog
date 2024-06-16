import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

export default function SignIn() {
  return (
    <div className="signin-container">
      <div className="signin-left-panel">
        <h2 className="signin-account">Sign In Account</h2>
        <div className="signin-social-buttons">
          <button className="signin-social-button facebook">
            <img src="/images/icon_facebook.png" alt="Facebook" />
          </button>
          <button className="signin-social-button google">
            <img src="/images/icon_google.png" alt="Google" />
          </button>
          <button className="signin-social-button apple">
            <img src="/images/icon_apple.png" alt="Apple" />
          </button>
        </div>
        <p className="signin-note">Or use your email account</p>
        <form className="signin-form">
          <div className="signin-input-container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="signin-input-container">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className="signin-button">
            SIGN IN
          </button>
        </form>
      </div>
      <div className="signin-right-panel">
        <h1 className="signin-logo">StockLog</h1>
        <div className="content">
          <h2>Welcome Back!</h2>
          <p>
            Log in to seamlessly manage and track your stock inventory with
            ease.
          </p>
          <Link to="/" className="signup-link">
            <button className="signin-signup-button">SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
