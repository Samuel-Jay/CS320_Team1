const mongoose = require("mongoose");
<<<<<<< HEAD
const PTOSchema = new mongoose.Schema(
    {
        taskId: {
            type: Number,
            required: true,
        },
        requestorEmail: {
            type: String,
            required: true,
        },
        managerEmail: {
            type: String,
            required: true,
        },
        managerId: {
            type: Number,
            required: true,
        },
        employeeId: {
            type: Number,
            required: true
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
        reason: {
            type: String,
            required: true,
        },
        assignerEmail: {
            type: String,
            required: true,
        },
        assigneeEmail: {
            type: String,
            required: true,
        },
        dueDate: {
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
=======
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
});
>>>>>>> 3f0b5f93db3d597b2cdb13c241e3b2b203587f84

module.exports = PTOSchema;
