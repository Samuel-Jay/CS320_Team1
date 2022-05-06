const mongoose = require("mongoose");

const PerformanceReview = new mongoose.Schema(
    {
        taskId: {
            type: Number,
            required: true,
        },
        reviewerId: {
            type: Number,
            required: true,
        },
        revieweeId: {
            type: Number,
            required: true,
        },
        revieweeManagerId: {
            type: Number,
            required: false
        },

        overallComments: {
            type: String,
            required: false,
        },
        growthFeedbackComments: {
            type: String,
            required: false,
        },
        growthFeedbackScore: {
            type: Number,
            required: false,
        },
        kindnessFeedbackComments: {
            type: String,
            required: false,
        },
        kindnessFeedbackScore: {
            type: Number,
            required: false,
        },
        deliveryFeedbackComments: {
            type: String,
            required: false,
        },
        deliveryFeedbackScore: {
            type: Number,
            required: false,
        },
        startDate: {
            type: Date,
            required: false,
        },
        dueDate: {
            type: Date,
            required: false,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "performanceReview"
    }
);

module.exports = PerformanceReview;
