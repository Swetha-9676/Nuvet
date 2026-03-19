import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [myPets, setMyPets] = useState([]);
  const [nextVaccination, setNextVaccination] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // Fetch all pets
    fetch("http://localhost:5000/api/pet/pets")
      .then((res) => res.json())
      .then((data) => {
        const userPets = data.filter((pet) => pet.ownerEmail === storedUser.email);
        setMyPets(userPets);

        // Calculate earliest upcoming vaccination
        const upcomingDates = userPets
          .map((pet) => pet.nextVaccination)
          .filter(Boolean)
          .sort((a, b) => new Date(a) - new Date(b));

        setNextVaccination(upcomingDates[0] || null);
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "#ff6f61", textAlign: "center", marginBottom: "30px" }}>
        🐾 Dashboard
      </h1>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <div style={cardStyle}>
          <h2 style={cardTitle}>My Pets</h2>
          <p style={cardValue}>{myPets.length}</p>
        </div>

        <div style={cardStyle}>
          <h2 style={cardTitle}>Next Vaccination</h2>
          <p style={cardValue}>
            {nextVaccination ? new Date(nextVaccination).toLocaleDateString() : "-"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Quick Actions
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <button onClick={() => navigate("/upload")} style={buttonStyle}>
          ➕ Upload Pet
        </button>
        <button onClick={() => navigate("/profile")} style={buttonStyle}>
          👤 View Profile
        </button>
      </div>

      {/* My Pets */}
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        🐶 My Uploaded Pets
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {myPets.length === 0 ? (
          <p>No pets uploaded yet.</p>
        ) : (
          myPets.map((pet) => {
            const today = new Date();
            let isDueSoon = false;

            if (pet.nextVaccination) {
              const vacDate = new Date(pet.nextVaccination);
              const diffDays = Math.ceil((vacDate - today) / (1000 * 60 * 60 * 24));
              if (diffDays >= 0 && diffDays <= 7) {
                isDueSoon = true;
              }
            }

            return (
              <div key={pet._id} style={petCardStyle}>
                <img
                  src={pet.photo ? pet.photo : "https://via.placeholder.com/250x180?text=No+Image"}
                  alt={pet.petName}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h3>{pet.petName}</h3>
                <p><b>Breed:</b> {pet.breed}</p>
                <p><b>Age:</b> {pet.petAge} yrs</p>
                <p><b>Type:</b> {pet.animalType}</p>
                <p>
                  <b>Next Vaccination:</b>{" "}
                  {pet.nextVaccination ? new Date(pet.nextVaccination).toLocaleDateString() : "-"}
                </p>

                {isDueSoon && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "5px",
                      padding: "5px 10px",
                      backgroundColor: "#ff6f61",
                      color: "white",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ⚠ Vaccination Due Soon
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// Styles
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  width: "250px",
  textAlign: "center",
};

const cardTitle = {
  fontSize: "18px",
  marginBottom: "10px",
  color: "#555",
};

const cardValue = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ff6f61",
};

const petCardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  width: "250px",
  textAlign: "center",
};

const buttonStyle = {
  padding: "15px 25px",
  backgroundColor: "#ff6f61",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
