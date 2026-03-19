const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Email already registered" });

    const newUser = new User({ username: name, email, password, phone });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    user.isLoggedIn = true;
    await user.save();

    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    user.isLoggedIn = false;
    await user.save();

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed", error: err.message });
  }
});

// Get logged-in users
router.get("/logged-users", async (req, res) => {
  try {
    const users = await User.find({ isLoggedIn: true }, "username email");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching logged users", error: err });
  }
});

// Get all users
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({}, "username email");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching users", error: err });
  }
});

module.exports = router;
