import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
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
          <div className="profile-picture">
            <img src="path/to/profile-picture" alt="Profile" />
          </div>
          <div className="profile-info">
            <h2>CHIH-CHUN CHEN</h2>
            <p>Last Login: 2024/06/11 11:55:04</p>
            <form className="profile-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value="email@example.com" readOnly />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value="password" readOnly />
              </div>
              <div className="form-group">
                <label>Birthday</label>
                <input type="date" value="2000-01-01" readOnly />
              </div>
              <div className="form-group">
                <label>Join Date</label>
                <input type="date" value="2022-01-01" readOnly />
              </div>
              <button type="button" className="edit-profile-button">
                Edit Profile
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
