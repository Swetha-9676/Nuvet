import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm) {
      alert("Please fill in all fields");
      return;
    }
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={titleStyle}>🐾 Register</h2>
        <form onSubmit={handleSubmit} style={formInnerStyle}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="confirm" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={inputStyle} />
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff6f61", fontWeight: "bold" }}>Login</Link>
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
  background: "linear-gradient(to right, #fceabb, #f8b500)",
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
  color: "#ff6f61",
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
  background: "#ff6f61",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};
