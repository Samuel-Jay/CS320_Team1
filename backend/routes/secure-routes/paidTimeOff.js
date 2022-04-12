const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ptoSchema = require("../../schema/PTOSchema");
const userSchema = require("../../schema/UserSchema");
const { companies } = require("../../config");
const generateHash = require("../../utils/hashIdGenerator");

router.post("/pto/edit", async (req, res, next) => {
  const companyDB = companies.get(req.body.userEmail.split("@")[1]);
  const User = mongoose.connection.useDb(companyDB).model("users", userSchema);
  const PTORequest = mongoose.connection
    .useDb(companyDB)
    .model("PTORequests", ptoSchema);

  let user = await User.findOne({ email: req.body.userEmail })
    .then((user) => {
      if (!user) {
        return res.json({
          code: 404,
          status: "error",
          message: "Invalid user credentials",
        });
      }
    })
    .catch((error) => {
      return res.json({ code: 500, status: "error", message: error.message });
    });

  let ptoRequest = await PTORequest.findOne({ taskId: req.body.taskId })
    .then((ptoRequest) => {
      if (!ptoRequest) {
        return res.json({
          code: 404,
          status: "error",
          message: "Paid Time Off Request does not exist",
        });
      }
    })
    .catch((error) => {
      return res.json({ code: 500, status: "error", message: error.message });
    });
});

router.get("/pto/get", async (req, res, next) => {
  const companyDB = companies.get(req.body.userEmail.split("@")[1]);
  const UserModel = mongoose.connection
    .useDb(companyDB)
    .model("users", userSchema);
  const PTORequestModel = mongoose.connection
    .useDb(companyDB)
    .model("PTORequests", ptoSchema);

  let user = await UserModel.findOne({ email: req.body.userEmail })
    .then((user) => {
      if (!user) {
        return res.json({
          code: 404,
          status: "error",
          message: "Invalid user credentials",
        });
      }
      return user;
    })
    .catch((error) => {
      return res.json({ code: 500, status: "error", message: error.message });
    });

  userPTORequests = {};

  userPTORequests["created"] = await PTORequestModel.find({
    employeeId: user.employeeId,
  })
    .then()
    .catch((error) => {
      return res.json({ code: 500, status: "error", message: error.message });
    });

  userPTORequests["received"] = await PTORequestModel.find({
    managerId: user.employeeId,
  })
    .then()
    .catch((error) => {
      return res.json({ code: 500, status: "error", message: error.message });
    });

  return res.json({
    code: 200,
    status: "success",
    ptoRequests: userPTORequests,
  });
});

module.exports = router;
