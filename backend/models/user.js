var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  companyId: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  positionTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  isManager: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = userSchema;
