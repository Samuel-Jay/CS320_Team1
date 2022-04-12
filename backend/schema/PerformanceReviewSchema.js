const mongoose = require("mongoose");

const PerformanceReview = new mongoose.Schema(
  {
    reviewerId: {
      type: Number,
      required: true,
    },
    revieweeId: {
      type: Number,
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
    growthFeedbackScore: {
      type: Number,
      required: true,
    },
    kindnessFeedback: {
      type: String,
      required: true,
    },
    kindnessFeedbackScore: {
      type: Number,
      required: true,
    },
    deliveryFeedback: {
      type: String,
      required: true,
    },
    deliveryFeedbackScore: {
      type: Number,
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
  {
    timestamps: true,
  }
);

module.exports = PerformanceReview;
