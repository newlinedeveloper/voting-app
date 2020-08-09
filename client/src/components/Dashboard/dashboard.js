import React, { Component } from "react";
import NavBar from "../Navbar/navbar";
import "./dashboard.css";
import TabRoutes from "../tabRoutes";

class UserDashboard extends Component {
  render() {
    const { location } = this.props;

    return (
      <div className="dashboard">
        <div className="sticky-top">
          <NavBar /> 
          <nav className="tab-bar">
            <a
              href="/dashboard/home"
              id="home"
              style = {{ width: 200 }}
              className={
                location.pathname.includes("/dashboard/home") ? "active" : null
              }
            >
              Home
            </a>
          </nav>
        </div>
        <TabRoutes />
      </div>
    );
  }
}

export default UserDashboard;
