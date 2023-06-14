const mongoose = require("mongoose");

// TaskSchema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "New Task",
    required: true,
    unique: true,
  },
  state: {
    type: String,
    enum: ["Ready", "Being Done", "Completed"],
    default: "Ready",
  },
  description: {
    type: String,
  },
  machine: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Machine",
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true,
  },
  started: {
    type: String,
  },
  ended: {
    type: String,
  },
  cost: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
