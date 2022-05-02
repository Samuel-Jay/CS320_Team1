const mongoose = require("mongoose");
const PTOSchema = new mongoose.Schema({
    taskId: {
      type: Number,
      required: true,
    },
    managerId: {
      type: Number,
      required: true,
    },
    employeeId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
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
    dueDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
    {
      timestamps: true,
      collection: "PTORequests",
    }
);

module.exports = PTOSchema;
