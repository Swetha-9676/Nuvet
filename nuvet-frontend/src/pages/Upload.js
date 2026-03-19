import React, { useState } from "react";

export default function Upload() {
  const [form, setForm] = useState({
    ownerName: "",
    ownerEmail: "",
    ownerNumber: "",
    petName: "",
    petAge: "",
    breed: "",
    breedType: "",
    gender: "",
    animalType: "",
    healthInfo: "",
    trained: "",
    lastVaccination: "",
    nextVaccination: "",
    vetName: "",
    vetPhone: "",
    vetClinic: "",
    vetAddress: "",
    lastGroomingDate: "",
    nextGroomingDate: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/pet/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setForm({
          ownerName: "",
          ownerEmail: "",
          ownerNumber: "",
          petName: "",
          petAge: "",
          breed: "",
          breedType: "",
          gender: "",
          animalType: "",
          healthInfo: "",
          trained: "",
          lastVaccination: "",
          nextVaccination: "",
          vetName: "",
          vetPhone: "",
          vetClinic: "",
          vetAddress: "",
          lastGroomingDate: "",
          nextGroomingDate: "",
          photo: "",
        });
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
        display: "flex",
        justifyContent: "center",
        padding: "30px",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#ff6f61", marginBottom: "20px" }}>
          🐶🐱 Upload Pet Details
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
          {/* Owner Info */}
          <h4 style={{ color: "#555" }}>Owner Details</h4>
          <input name="ownerName" placeholder="Owner Name" value={form.ownerName} onChange={handleChange} style={inputStyle} />
          <input name="ownerEmail" placeholder="Owner Email" value={form.ownerEmail} onChange={handleChange} style={inputStyle} />
          <input name="ownerNumber" placeholder="Owner Number" value={form.ownerNumber} onChange={handleChange} style={inputStyle} />

          {/* Pet Info */}
          <h4 style={{ color: "#555" }}>Pet Information</h4>
          <input name="petName" placeholder="Pet Name" value={form.petName} onChange={handleChange} style={inputStyle} />
          <input name="petAge" placeholder="Pet Age" value={form.petAge} onChange={handleChange} style={inputStyle} />
          <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} style={inputStyle} />
          <input name="breedType" placeholder="Breed Type (Pure/Cross)" value={form.breedType} onChange={handleChange} style={inputStyle} />
          <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} style={inputStyle} />
          <input name="animalType" placeholder="Dog or Cat" value={form.animalType} onChange={handleChange} style={inputStyle} />
          <textarea name="healthInfo" placeholder="Health Info" value={form.healthInfo} onChange={handleChange} style={inputStyle} />
          <input name="trained" placeholder="Trained? (Yes/No)" value={form.trained} onChange={handleChange} style={inputStyle} />

          {/* Vaccination */}
          <h4 style={{ color: "#555" }}>Vaccination Details</h4>
          <label>Last Vaccination Date:</label>
          <input type="date" name="lastVaccination" value={form.lastVaccination} onChange={handleChange} style={inputStyle} />
          <label>Next Vaccination Date:</label>
          <input type="date" name="nextVaccination" value={form.nextVaccination} onChange={handleChange} style={inputStyle} />

          {/* ✅ New Vet Info */}
          <h4 style={{ color: "#555" }}>Veterinary Contact</h4>
          <input name="vetName" placeholder="Vet Name" value={form.vetName} onChange={handleChange} style={inputStyle} />
          <input name="vetPhone" placeholder="Vet Phone" value={form.vetPhone} onChange={handleChange} style={inputStyle} />
          <input name="vetClinic" placeholder="Vet Clinic Name" value={form.vetClinic} onChange={handleChange} style={inputStyle} />
          <input name="vetAddress" placeholder="Vet Address" value={form.vetAddress} onChange={handleChange} style={inputStyle} />

          {/* ✅ New Grooming Info */}
          <h4 style={{ color: "#555" }}>Grooming Schedule</h4>
          <label>Last Grooming Date:</label>
          <input type="date" name="lastGroomingDate" value={form.lastGroomingDate} onChange={handleChange} style={inputStyle} />
          <label>Next Grooming Date:</label>
          <input type="date" name="nextGroomingDate" value={form.nextGroomingDate} onChange={handleChange} style={inputStyle} />

          {/* Photo */}
          <input name="photo" placeholder="Photo URL" value={form.photo} onChange={handleChange} style={inputStyle} />

          <button
            type="submit"
            style={{
              padding: "10px",
              background: "#ff6f61",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Upload Pet
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  width: "100%",
};