const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const trainingSchema = require("../schema/TrainingSchema");
const userSchema = require("../schema/UserSchema");
const { companies } = require("../config");

const generateHash = () => {
  var today = new Date();
  var date = `${
    today.getUTCMonth() + 1
  }-${today.getUTCDate()}-${today.getFullYear()}`;
  var time = `${today.getUTCHours()}-${today.getUTCMinutes()}-${today.getUTCSeconds()}`;

  var key = `${date} ${time}`;
  var hash = 0;

  for (i = 0; i < key.length; i++) {
    char = key.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  //   return hash;
  return Math.abs(hash);
};

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.post("/trainingTask/create", async (req, res, next) => {
  const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
  const User = mongoose.connection.useDb(companyDB).model("users", userSchema);
  const TrainingTask = mongoose.connection
    .useDb(companyDB)
    .model("assignTraining", trainingSchema);

  await User.findOne({ email: req.body.assignerEmail })
    .then(async (admin) => {
      if (!admin) {
        return res.json({
          code: 404,
          status: "error",
          message: "Assigner email doesn't exist",
        });
      }
      if (admin.positionTitle !== "CEO") {
        return res.json({
          code: 401,
          status: "error",
          message: "Assigner does not have Admin permissions",
        });
      }
      await User.find({})
        .then((users) => {
          employees = users.filter((user) => user.positionTitle !== "CEO");

          employees.forEach(async (employee) => {
            var taskData = {
              taskId: generateHash(),
              assignerId: admin.employeeId,
              assigneeId: employee.employeeId,
              taskName: req.body.taskName,
              taskLink: req.body.taskLink,
              taskDescription: req.body.taskDescription,
              startDate: req.body.startDate,
              dueDate: req.body.dueDate,
              status: "Incomplete",
            };
            const trainingTask = await TrainingTask.create(taskData);
            await trainingTask.save();
          });
          return res.json({
            code: 200,
            status: "success",
            message: "Successfully added training tasks",
          });
        })
        .catch((error) => {
          return res.json({
            code: 500,
            status: "error",
            message: "Internal server error",
          });
        });
    })
    .catch((error) => {
      return res.json({
        code: 500,
        status: "error",
        message: "Internal server error",
      });
    });
});

router.get("/trainingTask/get", async (req, res, next) => {
  const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
  const User = mongoose.connection.useDb(companyDB).model("users", userSchema);
  const TrainingTask = mongoose.connection
    .useDb(companyDB)
    .model("assignTraining", trainingSchema);

  await User.findOne({ email: req.body.requestorEmail })
    .then(async (user) => {
      userTrainingTasks = {};
      await TrainingTask.find({ assigneeId: user.employeeId })
        .then((tasks) => {
          if (!tasks) {
            return res.json({
              code: 404,
              status: "error",
              message: "No assigned tasks found for the user",
            });
          }
          userTrainingTasks["received"] = tasks;
        })
        .catch((err) => {
          return res.json({
            code: 500,
            status: "error",
            message: err.message,
          });
        });
      await TrainingTask.find({ assignerId: user.employeeId })
        .then((tasks) => {
          if (!tasks) {
            return res.json({
              code: 404,
              status: "error",
              message: "User has not created any training tasks",
            });
          }
          userTrainingTasks["created"] = tasks;
        })
        .catch((err) => {
          return res.json({
            code: 500,
            status: "error",
            message: "Internal server error",
          });
        });
      return res.json({
        code: 200,
        status: "success",
        tasks: userTrainingTasks,
      });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        message: "Internal server error",
      });
    });
});

router.patch("/trainingTask/edit", async (req, res, next) => {
  const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
  const User = mongoose.connection.useDb(companyDB).model("users", userSchema);
  const TrainingTask = mongoose.connection
    .useDb(companyDB)
    .model("assignTraining", trainingSchema);

  await User.findOne({ email: req.body.requestorEmail })
    .then(async (user) => {
      if (!user) {
        return res.json({
          code: 404,
          status: "error",
          message: "User does not exist",
        });
      }
      await TrainingTask.findOne({ taskId: req.body.taskId })
        .then((task) => {
          if (!task) {
            return res.json({
              code: 404,
              status: "error",
              message: "No task found with such credentials",
            });
          }
          if (user.employeeId === task.assignerId) {
            TrainingTask.updateMany(
              {
                taskId: req.body.taskId,
                assignerId: user.employeeId,
              },
              {
                ...req.body,
              }
            )
              .then(() => {
                return res.json({
                  code: 200,
                  status: "success",
                  message: "Training Tasks updated successfully",
                });
              })
              .catch((err) => {
                return res.json({
                  code: 500,
                  status: "error",
                  message: "Internal server error",
                });
              });
          } else {
            TrainingTask.updateOne(
              {
                taskId: req.body.taskId,
                assigneeId: user.employeeId,
              },
              {
                ...req.body,
              }
            )
              .then(() => {
                return res.json({
                  code: 200,
                  status: "success",
                  message: "Training Task updated successfully",
                });
              })
              .catch((error) => {
                return res.json({ message: error.message });
              });
          }
        })
        .catch((error) => {
          return res.json({
            code: 500,
            status: "error",
            message: "Internal server error",
          });
        });
    })
    .catch((err) => {
      return res.json({
        code: 500,
        status: "error",
        message: "Internal server error",
      });
    });
});

router.delete("/trainingTask/delete", async (req, res, next) => {
  const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
  const TrainingTask = mongoose.connection
    .useDb(companyDB)
    .model("assignTraining", trainingSchema);

  await TrainingTask.findOne({
    taskId: req.body.taskId,
    assignerId: req.body.assignerId,
  })
    .then(async (task) => {
      if (!task) {
        return res.json({
          code: 404,
          message: "No task with such credentials found",
        });
      }
      await TrainingTask.deleteMany({
        taskId: req.body.taskId,
        assignerId: req.body.assignerId,
      })
        .then(() => {
          return res.json({
            code: 200,
            message: "Tasks deleted successfully",
          });
        })
        .catch((err) => {
          return res.json(err);
        });
    })
    .catch((err) => {
      return res.json(err);
    });
});

module.exports = router;
