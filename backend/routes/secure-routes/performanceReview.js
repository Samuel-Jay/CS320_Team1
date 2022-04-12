const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const trainingSchema = require("../../schema/TrainingSchema");
const userSchema = require("../../schema/UserSchema");
const { companies } = require("../../config");
const generateHash = require("../../utils/hashIdGenerator");

module.exports = router;
