const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ptoSchema = require("../../schema/PTOSchema");
const userSchema = require("../../schema/UserSchema");
const { companies } = require("../../config");
const generateHash = require("../../utils/hashIdGenerator");

router.use(express.json());
router.use(bodyParser.json());

router.patch("/pto/edit", async (req, res, next) => {
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

  let ptoRequest = await PTORequestModel.findOne({ taskId: req.body.taskId })
    .then((ptoRequest) => {
      if (!ptoRequest) {
        return res.json({
          code: 404,
          status: "error",
          message: "Paid Time Off Request does not exist",
        });
      }
      return ptoRequest;
    })
    .catch((error) => {
      return res.json({ code: 500, status: "error", message: error.message });
    });

  if (ptoRequest.status !== "Pending") {
    return res.json({
      code: 401,
      status: "error",
      message: "Request has been processed. Cannot initiate changes",
    });
  }
  var ptoData = {};
  if (user.employeeId == ptoRequest.employeeId) {
    ptoData = {
      title: req.body.title ? req.body.title : ptoRequest["title"],
      startDate: req.body.startDate
        ? req.body.startDate
        : ptoRequest["startDate"],
      endDate: req.body.endDate ? req.body.endDate : ptoRequest["endDate"],
      reason: req.body.reason ? req.body.reason : ptoRequest["reason"],
      dueDate: req.body.dueDate ? req.body.dueDate : ptoRequest["dueDate"],
    };
  } else if (user.employeeId == ptoRequest.managerId) {
    ptoData = {
      status: req.body.status ? req.body.status : ptoRequest["status"],
    };
  } else {
    return res.json({
      code: 500,
      status: "error",
      message: "User is not associated witht the request",
    });
  }
  await PTORequestModel.findOneAndUpdate(
    { taskId: req.body.taskId },
    { ...ptoData }
  );
  return res.json({
    code: 200,
    status: "success",
    message: "Updated the Paid Time Off Request",
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

router.post("/pto/create", (req, res, next) => {
  try {
    const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
    const User = mongoose.connection
      .useDb(companyDB)
      .model("users", userSchema);
    const PTORequest = mongoose.connection
      .useDb(companyDB)
      .model("PTORequests", ptoSchema);

    User.findOne({ employeeId: req.body.employeeId }, async (err, user) => {
      if (user.positionTitle == "CEO") {
        return res.json({
          message: "This user is not authorized to make PTO requests.",
        });
      }
      var taskData = {
        taskId: generateHash(),
        // managerEmail: req.body.managerEmail,
        managerId: req.body.managerId,
        employeeId: req.body.employeeId,
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
        // assignerEmail: req.body.assignerEmail,
        // assigneeEmail: req.body.assigneeEmail,
        // requestorEmail: req.body.requestorEmail,
        dueDate: req.body.dueDate,
        status: "Pending",
      };
      const ptoReq = await PTORequest.create(taskData);
      await ptoReq.save();
      return res.json({
        code: 200,
        message: "Successfully added PTO request.",
      });
    });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/pto/delete", async (req, res, next) => {
  try {
    const companyDB = companies.get(req.body.email.split("@")[1]);
    const User = mongoose.connection
      .useDb(companyDB)
      .model("users", userSchema);
    const PTOTask = mongoose.connection
      .useDb(companyDB)
      .model("PTORequests", ptoSchema);

    PTOTask.findOneAndDelete(
      {
        taskId: req.body.taskId,
        employeeId: req.body.employeeId,
      },
      (err, pto) => {
        if (!pto) {
          return res.json({
            message: "PTO request does not exist.",
          });
        }
        return res.json({
          message: "PTO request successfully deleted.",
        });
      }
    );
  } catch (error) {
    error = "Deletion was not successful.";
    return res.json(error);
  }
});

module.exports = router;
