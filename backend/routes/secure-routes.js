const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const trainingSchema = require("../schema/TrainingSchema");
const userSchema = require("../schema/UserSchema");
const { companies } = require("../config");

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.post("/trainingTask/create", (req, res, next) => {
  try {
    const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
    const User = mongoose.connection
      .useDb(companyDB)
      .model("users", userSchema);
    const TrainingTask = mongoose.connection
      .useDb(companyDB)
      .model("assignTraining", trainingSchema);

    User.findOne({ email: req.body.assignerEmail }, async (err, admin) => {
      if (!admin) {
        return res.json({ code: 404, message: "Assigner email doesn't exist" });
      }
      if (admin.employeeId !== 1) {
        return res.json({
          code: 401,
          message: "Assigner does not have Admin permissions",
        });
      }
      User.find({}, async (err, users) => {
        emails = users.map((user) => user.email);
        emails.forEach(async (email) => {
          var taskData = {
            assignerEmail: req.body.assignerEmail,
            assigneeEmail: email,
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
          message: "Successfully added training tasks",
        });
      });
    });
  } catch (error) {
    return res.json(error);
  }
});

router.patch("/trainingTask/edit", (req, res, next) => {
  try {
    const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
    const User = mongoose.connection
      .useDb(companyDB)
      .model("users", userSchema);
    const TrainingTask = mongoose.connection
      .useDb(companyDB)
      .model("assignTraining", trainingSchema);

    TrainingTask.findOne(
      {
        taskName: req.body.taskName,
        assignerEmail: req.body.assignerEmail,
      },
      (err, task) => {
        if (!task) {
          return res.json({
            code: 404,
            message: "No task with such credentials found",
          });
        }
        TrainingTask.updateMany(
          {
            taskName: req.body.taskName,
            assignerEmail: req.body.assignerEmail,
          },
          {
            ...req.body,
          }
        )
          .then(() => {
            return res.json({
              code: 200,
              message: "Tasks updated successfully",
            });
          })
          .catch((err) => {
            return res.json(err);
          });
      }
    );
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/trainingTask/delete", (req, res, next) => {
  try {
    const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
    // const User = mongoose.connection
    //   .useDb(companyDB)
    //   .model("users", userSchema);
    const TrainingTask = mongoose.connection
      .useDb(companyDB)
      .model("assignTraining", trainingSchema);

    TrainingTask.findOne(
      {
        taskName: req.body.taskName,
        assignerEmail: req.body.assignerEmail,
      },
      (err, task) => {
        if (!task) {
          return res.json({
            code: 404,
            message: "No task with such credentials found",
          });
        }
        TrainingTask.deleteMany({
          taskName: req.body.taskName,
          assignerEmail: req.body.assignerEmail,
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
      }
    );
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
