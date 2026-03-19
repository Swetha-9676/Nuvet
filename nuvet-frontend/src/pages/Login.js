import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message);

        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={titleStyle}>🔑 Login</h2>
        <form onSubmit={handleSubmit} style={formInnerStyle}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          New here?{" "}
          <Link to="/register" style={{ color: "#6a1b9a", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
};

const formStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  width: "350px",
};

const formInnerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const titleStyle = {
  color: "#6a1b9a",
  textAlign: "center",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "10px",
  background: "#6a1b9a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};
