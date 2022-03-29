const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema(
  {
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
    taskLink: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "assignTraining" }
);

module.exports = TrainingSchema;
