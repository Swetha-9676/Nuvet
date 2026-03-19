import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); // hook to navigate

  const handleStart = () => {
    navigate("/login"); // redirect to login page
  };

  return (
    <div style={{ 
      backgroundColor: "#fafafa", 
      minHeight: "100vh", 
      textAlign: "center", 
      padding: "20px" 
    }}>
      
      {/* Title */}
      <h1 style={{ fontSize: "42px", color: "#ff6f61", marginBottom: "10px" }}>
        🐾 Welcome to NuVet 🐾
      </h1>
      <p style={{ fontSize: "18px", color: "#444", marginBottom: "30px" }}>
        Healing Hearts; Finding Homes ❤️ <br />
        Adopt a furry friend and give them a loving home.
      </p>

      {/* Image Section */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "30px", 
        flexWrap: "wrap" 
      }}>
        
        {/* Dog Card */}
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "15px", 
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)", 
          width: "280px", 
          padding: "15px"
        }}>
          <img 
            src="https://images.unsplash.com/photo-1558788353-f76d92427f16" 
            alt="Dog" 
            style={{ 
              width: "100%", 
              height: "220px", 
              objectFit: "cover", 
              borderRadius: "10px" 
            }} 
          />
          <h3 style={{ marginTop: "15px", fontSize: "20px", color: "#333" }}>
            Dogs 🐶
          </h3>
        </div>

        {/* Cat Card */}
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "15px", 
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)", 
          width: "280px", 
          padding: "15px"
        }}>
          <img 
            src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6" 
            alt="Cat" 
            style={{ 
              width: "100%", 
              height: "220px", 
              objectFit: "cover", 
              borderRadius: "10px" 
            }} 
          />
          <h3 style={{ marginTop: "15px", fontSize: "20px", color: "#333" }}>
            Cats 🐱
          </h3>
        </div>
      </div>

      {/* Button -> Go to Login */}
      <button 
        onClick={handleStart}
        style={{ 
          marginTop: "40px", 
          padding: "12px 25px", 
          backgroundColor: "#ff6f61", 
          color: "white", 
          border: "none", 
          borderRadius: "8px", 
          fontSize: "18px", 
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#e55a4d"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#ff6f61"}
      >
        Start Your Journey →
      </button>
    </div>
  );
}
