const mongoose = require("mongoose");
const petSchema = new mongoose.Schema({
  ownerName: String,
  ownerEmail: String,
  ownerNumber: String,
  petName: String,
  petAge: Number,
  breed: String,
  breedType: String,
  gender: String,
  animalType: String,
  healthInfo: String,
  trained: String,
  lastVaccination: Date,
  nextVaccination: Date,
  photo: String,

  // 🩺 Vet & Grooming fields (must be added)
  vetName: String,
  vetPhone: String,
  vetClinic: String,
  vetAddress: String,
  lastGroomingDate: Date,
  nextGroomingDate: Date,

  adopted: { type: Boolean, default: false },
  adoptedBy: { type: String, default: "" },
});
module.exports = mongoose.model("Pet", petSchema);