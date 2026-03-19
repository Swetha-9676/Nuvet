const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/nuvet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Import Routes
const authRoutes = require("./routes/auth");
const petRoutes = require("./routes/pet");

// Use Routes
app.use("/api/auth", authRoutes);   // all auth routes will start with /api/auth
app.use("/api/pet", petRoutes);     // all pet routes will start with /api/pet

// Test Route
app.get("/", (req, res) => {
  res.send("NuVet Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
