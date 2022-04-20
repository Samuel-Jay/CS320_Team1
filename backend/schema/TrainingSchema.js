const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema(
  {
    taskId: {
      type: Number,
      required: true,
    },
    assignerId: {
      type: Number,
      required: true,
    },
    assigneeId: {
      type: Number,
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
