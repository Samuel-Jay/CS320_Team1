const mongoose = require("mongoose");

const PerformanceReview = new mongoose.Schema({
  assignerEmail: {
    type: String,
    required: true,
  },
  assigneeEmail: {
    type: String,
    required: true,
  },
  overallComments: {
    type: String,
    required: true,
  },
  growthFeedback: {
    type: String,
    required: true,
  },
  kindnessFeedback: {
    type: String,
    required: true,
  },
  deliveryFeedback: {
    type: String,
    required: true,
  },
  assignedDate: {
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
});

module.exports = PerformanceReview;
