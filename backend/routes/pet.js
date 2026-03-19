const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// Upload Pet
router.post("/upload", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.json({ message: "Pet uploaded successfully ✅" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all pets
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Adopt Pet (mark as adopted + record adopter)
router.put("/adopt/:id", async (req, res) => {
  try {
    const petId = req.params.id;
    const { adopterEmail } = req.body; // frontend sends adopter email

    const pet = await Pet.findByIdAndUpdate(
      petId,
      { adopted: true, adoptedBy: adopterEmail },
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json({ message: "Pet adopted successfully 🎉", pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
