const mongoose = require("mongoose");

const PerformanceReview = new mongoose.Schema(
    {
        taskId: {
            type: Number,
            required: true,
        },
        reviewerEmail: {
            type: String,
            required: true,
        },
        reviewerId: {
            type: Number,
            required: true,
        },
        reviewerManagerId: {
            type: Number,
            required: false,
        },
        revieweeEmail : {
            type: String,
        },
        revieweeId: {
            type: Number,
            required: true,
        },
        revieweeManagerId: {
            type: Number,
            required: false
        },
        companyId: {
            type: Number,
            required: true,
        },
        companyName: {
            type: Number,
            required: true,
        },
        overallComments: {
            type: String,
            required: true,
        },
        growthFeedbackComments: {
            type: String,
            required: true,
        },
        growthFeedbackScore: {
            type: Number,
            required: true,
        },
        kindnessFeedbackComments: {
            type: String,
            required: true,
        },
        kindnessFeedbackScore: {
            type: Number,
            required: true,
        },
        deliveryFeedbackComments: {
            type: String,
            required: true,
        },
        deliveryFeedbackScore: {
            type: Number,
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
    {
        timestamps: true,
        collection: "performanceReview"
    }
);

module.exports = PerformanceReview;
