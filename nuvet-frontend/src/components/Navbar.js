import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#ff6f61", padding: "10px" }}>
      <h2 style={{ color: "white", display: "inline-block", marginRight: "20px" }}>
        NuVet
      </h2>
      <Link to="/" style={{ margin: "0 10px", color: "white" }}>Home</Link>
      <Link to="/login" style={{ margin: "0 10px", color: "white" }}>Login</Link>
      <Link to="/register" style={{ margin: "0 10px", color: "white" }}>Register</Link>
      <Link to="/dashboard" style={{ margin: "0 10px", color: "white" }}>Dashboard</Link>
      <Link to="/upload" style={{ margin: "0 10px", color: "white" }}>Upload Pet</Link>
      <Link to="/profile" style={{ margin: "0 10px", color: "white" }}>Profile</Link>
      <Link to="/adoption" style={{ margin: "0 10px", color: "white" }}>Adoption</Link>
    </nav>
  );
}
