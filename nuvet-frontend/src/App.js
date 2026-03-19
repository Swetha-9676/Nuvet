import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import AdoptionDetails from "./pages/AdoptionDetails";

function App() {
  // ✅ PrivateRoute logic placed inside component
  const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")); // get latest user state
    if (!user || !user.email) {
      // check valid user
      alert("Please log in first!");
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/adoption"
          element={
            <PrivateRoute>
              <AdoptionDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;