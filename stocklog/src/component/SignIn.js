import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Sign In button clicked"); // Add log to verify event handling
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password }
      );
      console.log("API response:", response); // Log the full response
      if (response && response.data && response.data.token) {
        console.log("API response data:", response.data); // Log the response data
        // Store the token and navigate to the stock page
        localStorage.setItem("token", response.data.token);
        navigate("/stock");
      } else {
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.response ? error.response.data.message : "Network Error");
    }
  };

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
        <form className="signin-form" onSubmit={handleSignIn}>
          <div className="signin-input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signin-input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-button">
            SIGN IN
          </button>
          {error && <p className="error-message">{error}</p>}
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
          <Link to="/signup" className="signup-link">
            <button className="signin-signup-button">SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
