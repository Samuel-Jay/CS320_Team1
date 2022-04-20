const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const ptoSchema = require("../../schema/PTOSchema");
const userSchema = require("../../schema/UserSchema");
const { companies } = require("../../config");
const generateHash = require("../../utils/hashIdGenerator");

router.use(express.json());
router.use(bodyParser.json());

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
      return user;
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
      return ptoRequest;
    })
    .catch((error) => {
      return res.json({ code: 500, status: "error", message: error.message });
    });

  if (
    ptoRequest.employeeId === user.employeeId &&
    ptoRequest.status === "pending"
  ) {
    await PTORequest.updateOne({ taskId: req.body.taskId });
  } else if (ptoRequest.managerId === user.employeeId) {
  } else {
    return res.json({
      code: 404,
      status: "error",
      message: "User does not have accees to update the Paid Time Off Request",
    });
  }
  return res.json({
    code: 200,
    status: "success",
    message: "Paid Time Off Request updated Successfully",
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

router.post('/pto/create', (req, res, next) => {
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
                  message: "This user is not authorized to make PTO requests."
              });
          }
          var taskData = {
              taskId: Math.abs(generateHash()),
              managerEmail: req.body.managerEmail,
              managerId: req.body.managerId,
              employeeId: req.body.employeeId,
              title: req.body.title,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
              reason: req.body.reason,
              assignerEmail: req.body.assignerEmail,
              assigneeEmail: req.body.assigneeEmail,
              requestorEmail: req.body.requestorEmail,
              dueDate: req.body.dueDate,
              status: req.body.status
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

router.delete('/pto/delete',  async (req, res, next) => {
  try {
      const companyDB = companies.get(req.body.email.split("@")[1]);
      const User = mongoose.connection.useDb(companyDB).model("users", userSchema);
      const PTOTask = mongoose.connection.useDb(companyDB).model("PTORequests", ptoSchema);

      PTOTask.findOneAndDelete({ 
        taskId: req.body.taskId,
        employeeId: req.body.employeeId 
        }, (err, pto) => {
        if (!pto) {
          return res.json({
            message: "PTO request does not exist."
          });
        }
        return res.json({
          message: "PTO request successfully deleted."
        });
      });      
  } catch (error) {
    error = "Deletion was not successful."
    return res.json(error);
  }   
});

module.exports = router;
