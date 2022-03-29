const mongoose = require("mongoose");

const PTOSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  assignDate: {
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
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = PTOSchema;
