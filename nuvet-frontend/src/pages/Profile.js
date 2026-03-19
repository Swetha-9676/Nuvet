import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [uploadedPets, setUploadedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      fetch("http://localhost:5000/api/pet/pets")
        .then((res) => res.json())
        .then((data) => {
          // Pets uploaded by this user
          const uploads = data.filter(pet => pet.ownerEmail === storedUser.email);
          setUploadedPets(uploads);

          // Pets adopted by this user
          const adopted = data.filter(pet => pet.adoptedBy === storedUser.email);
          setAdoptedPets(adopted);
        })
        .catch(err => console.error(err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (!user) {
    return <div style={{ padding: "30px", textAlign: "center" }}><h2>Please login to view your profile 🔑</h2></div>;
  }

  return (
    <div style={{ padding: "30px", background: "linear-gradient(to right, #ece9e6, #ffffff)", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#6a1b9a", marginBottom: "20px" }}>👤 My Profile</h2>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "0 auto 30px auto",
        textAlign: "center",
      }}>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>

        <button onClick={handleLogout} style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#ff6f61",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}>
          🔒 Logout
        </button>
      </div>

      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>🐾 My Uploaded Pets</h3>
      <div style={petContainer}>
        {uploadedPets.length === 0 ? <p>No pets uploaded yet.</p> :
          uploadedPets.map((pet, i) => (
            <div key={i} style={petCard}>
              {pet.adopted && <span style={badge}>Adopted ✅</span>}
              <img
                src={pet.photo ? (pet.photo.startsWith("http") ? pet.photo : `http://localhost:5000${pet.photo}`) : "https://via.placeholder.com/250x180?text=No+Image"}
                alt={pet.petName}
                style={petImage}
              />
              <h3>{pet.petName}</h3>
              <p><b>Breed:</b> {pet.breed}</p>
              <p><b>Age:</b> {pet.petAge} yrs</p>
              <p><b>Type:</b> {pet.animalType}</p>
            </div>
          ))
        }
      </div>

      <h3 style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px", color: "#388e3c" }}>❤️ My Adopted Pets</h3>
      <div style={petContainer}>
        {adoptedPets.length === 0 ? <p>You haven’t adopted any pets yet.</p> :
          adoptedPets.map((pet, i) => (
            <div key={i} style={petCard}>
              <img
                src={pet.photo ? (pet.photo.startsWith("http") ? pet.photo : `http://localhost:5000${pet.photo}`) : "https://via.placeholder.com/250x180?text=No+Image"}
                alt={pet.petName}
                style={petImage}
              />
              <h3>{pet.petName}</h3>
              <p><b>Breed:</b> {pet.breed}</p>
              <p><b>Age:</b> {pet.petAge} yrs</p>
              <p><b>Type:</b> {pet.animalType}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const petContainer = { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" };
const petCard = { background: "white", padding: "15px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "250px", textAlign: "center", position: "relative" };
const petImage = { width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" };
const badge = { position: "absolute", top: "10px", left: "10px", backgroundColor: "#4caf50", color: "white", padding: "5px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold" };
