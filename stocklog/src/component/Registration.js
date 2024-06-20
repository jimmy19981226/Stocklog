import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Registration.css";

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Add state for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sign Up button clicked"); // Add log to verify event handling
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData
      );
      console.log("API response:", response); // Log the full response
      setSuccess("Account created successfully!"); // Set success message
      setError(null); // Clear any previous error messages
      setTimeout(() => {
        navigate("/signin"); // Navigate to sign-in page after a short delay
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        setError(error.response.data.message || "Server Error");
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError("No response received from the server");
      } else {
        console.error("Error message:", error.message);
        setError("Error: " + error.message);
      }
      setSuccess(null); // Clear any previous success messages
    }
  };

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
        <form className="registration-form" onSubmit={handleSignUp}>
          <div className="registration-input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="registration-input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="registration-input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="registration-input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="registration-input-container">
            <i className="fas fa-birthday-cake"></i>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="registration-signup-button">
            SIGN UP
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
}
