const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: String,
  course: String,
  email: String,
  phone: String,
  address: String,
  enrollmentNumber: String,
  department: String,
  year: String
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);