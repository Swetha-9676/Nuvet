import React, { useEffect, useState } from "react";

export default function AdoptionDetails() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")); // current logged-in user

  // Fetch pets from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/pet/pets")
      .then((res) => res.json())
      .then((data) => {
        const availablePets = data.filter((pet) => !pet.adopted);
        setPets(availablePets);
      })
      .catch((err) => console.error(err));
  }, []);

  // Confirm adoption function
  const handleAdopt = async (petId) => {
    try {
      const adopterEmail = user.email; // get email from user object

      const res = await fetch(`http://localhost:5000/api/pet/adopt/${petId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adopterEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setPets(pets.filter((p) => p._id !== petId));
        setShowModal(false);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#ff6f61", marginBottom: "30px" }}>
        🏠 Pets Available for Adoption
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {pets.length === 0 ? (
          <p>No pets available right now 😢</p>
        ) : (
          pets.map((pet) => (
            <div
              key={pet._id}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                width: "250px",
                textAlign: "center",
              }}
            >
              <img
                src={
                  pet.photo
                    ? pet.photo.startsWith("http")
                      ? pet.photo
                      : `http://localhost:5000${pet.photo}`
                    : "https://via.placeholder.com/250x180?text=No+Image"
                }
                alt={pet.petName}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ color: "#333" }}>{pet.petName}</h3>
              <p><b>Breed:</b> {pet.breed}</p>
              <p><b>Age:</b> {pet.petAge} yrs</p>
              <p><b>Type:</b> {pet.animalType}</p>
              <p><b>Gender:</b> {pet.gender}</p>

              <button
                style={adoptButton}
                onClick={() => {
                  setSelectedPet(pet);
                  setShowModal(true);
                }}
              >
                Adopt Now 🐾
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal for Pet & Owner Details */}
      {showModal && selectedPet && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ color: "#ff6f61" }}>👤 Owner Details</h3>
            <p><b>Name:</b> {selectedPet.ownerName}</p>
            <p><b>Email:</b> {selectedPet.ownerEmail}</p>
            <p><b>Phone:</b> {selectedPet.ownerNumber}</p>

            <hr />

            {/* 🩺 Vet Details */}
            <h3 style={{ color: "#ff6f61" }}>🩺 Veterinary Info</h3>
            <p><b>Vet Name:</b> {selectedPet.vetName || "Not provided"}</p>
            <p><b>Clinic:</b> {selectedPet.vetClinic || "N/A"}</p>
            <p><b>Phone:</b> {selectedPet.vetPhone || "N/A"}</p>

            {/* 💇 Grooming Details */}
            <h3 style={{ color: "#ff6f61" }}>💇 Grooming Schedule</h3>
            <p>
              <b>Last Grooming:</b>{" "}
              {selectedPet.lastGroomingDate
                ? new Date(selectedPet.lastGroomingDate).toLocaleDateString()
                : "Not available"}
            </p>
            <p>
              <b>Next Grooming:</b>{" "}
              {selectedPet.nextGroomingDate
                ? new Date(selectedPet.nextGroomingDate).toLocaleDateString()
                : "Not scheduled"}
            </p>

            {/* ❤ Health Info */}
            <h3 style={{ color: "#ff6f61" }}>❤ Health Information</h3>
            <p>{selectedPet.healthInfo || "No health details provided"}</p>

            <hr />

            <button
              style={confirmButton}
              onClick={() => handleAdopt(selectedPet._id)}
            >
              Confirm Adoption ✅
            </button>
            <button
              style={cancelButton}
              onClick={() => setShowModal(false)}
            >
              Cancel ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 🌈 Styles
const adoptButton = {
  marginTop: "10px",
  padding: "8px 12px",
  background: "#ff6f61",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalBox = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  maxHeight: "90vh",
  overflowY: "auto",
};

const confirmButton = {
  background: "#4caf50",
  color: "white",
  padding: "8px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  marginRight: "10px",
};

const cancelButton = {
  background: "#f44336",
  color: "white",
  padding: "8px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
