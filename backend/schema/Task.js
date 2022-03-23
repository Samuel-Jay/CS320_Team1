const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  assignerEmail: {
    type: String,
    required: true,
  },
  assigneeEmail: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  assignedDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = TaskSchema;
