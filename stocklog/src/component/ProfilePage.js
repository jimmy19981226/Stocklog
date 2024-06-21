import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    joinDate: "",
    lastLogin: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    dateOfBirth: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userData = response.data;
      setUser({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth
          ? userData.dateOfBirth.split("T")[0]
          : "",
        joinDate: userData.joinDate ? userData.joinDate.split("T")[0] : "",
        lastLogin: userData.lastLogin,
      });
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: "",
        dateOfBirth: userData.dateOfBirth
          ? userData.dateOfBirth.split("T")[0]
          : "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/users/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
      setEditMode(false);
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  return (
    <div className="profile-page-container">
      <header className="profile-page-header">
        <h1 className="profile-logo">StockLog</h1>
        <div className="header-icons">
          <Link to="/stock">
            <i className="fas fa-home" style={{ color: "#8AA5ED" }}></i>
          </Link>
          <Link to="/profile">
            <i className="fas fa-user" style={{ color: "#8AA5ED" }}></i>
          </Link>
        </div>
      </header>
      <main className="profile-page-main">
        <div className="profile-card">
          <div className="profile-info">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>Last Login: {formatDate(user.lastLogin)}</p>
            <form className="profile-form" onSubmit={handleEditProfile}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={user.email} readOnly />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editMode ? formData.firstName : user.firstName}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editMode ? formData.lastName : user.lastName}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Birthday</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editMode ? formData.dateOfBirth : user.dateOfBirth}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="form-group">
                <label>Join Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={user.joinDate}
                  readOnly
                />
              </div>
              {editMode ? (
                <button type="submit" className="edit-profile-button">
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  className="edit-profile-button"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
