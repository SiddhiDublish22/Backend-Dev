import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  Roll: {
    type: Number,
    required: true,
    max: [99, "Roll must be 2 digits"],
  },

  branch: {
    type: String,
    enum: ["CSE", "IT", "ECE"],
    default: "CSE",
  },

  marks: {
    type: Number,
    min: [0, "marks cannot be less than 0"],
    max: [100, "marks cannot exceed 100"],
  },


  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
});

const student = mongoose.model("Student", studentSchema);

export default student;