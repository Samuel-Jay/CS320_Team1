const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const trainingSchema = require("../schema/TrainingSchema");
const ptoSchema = require("../schema/PTOSchema");
const userSchema = require("../schema/UserSchema");
const { companies } = require("../config");

const generateHash = (key) => {
    var hash = 0;
    if (key.length == 0) return hash;
    for (i = 0; i < key.length; i++) {
        char = key.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
};

router.get("/profile", (req, res, next) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
    });
});

router.post("/employees/get", async (req, res, next) => {
    const companyDB = companies.get(req.body.email.split("@")[1]);
    const User = mongoose.connection
          .useDb(companyDB)
          .model("users", userSchema);
    respond = {}
    await User.find({ managerId: req.body.employeeId })
        .then((employees) => {
            if (!employees) {
                return res.json({
                    code: 404,
                    message: "No employees under management",
                });
            }
            respond["employees"] = employees;
        })
        .catch((err) =>
            res.json({
                code: 500,
                message: err.message,
            })
        );

    return res.json(respond);
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
            if (!admin.isManager) {
                return res.json({
                    code: 401,
                    message: "Assigner does not have Admin permissions",
                });
            }
            if(req.body.assigneeEmail = "all"){
                User.find({}, async (err, users) => {
                    emails = users
                        .filter((user) => user.positionTitle !== "CEO")
                        .map((user) => user.email);
                    emails.forEach(async (email) => {
                        var taskData = {
                            taskId: Math.abs(
                                generateHash(
                                    req.body.taskName +
                                        req.body.taskLink +
                                        req.body.startDate +
                                        req.body.dueDate
                                )
                            ),
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
            }else{
                User.findOne({email: req.body.assigneeEmail}, async (err, user) => {
                    var taskData = {
                        taskId: Math.abs(
                            generateHash(
                                req.body.taskName +
                                    req.body.taskLink +
                                    req.body.startDate +
                                    req.body.dueDate
                            )
                        ),
                        assignerEmail: req.body.assignerEmail,
                        assigneeEmail: user.email,
                        taskName: req.body.taskName,
                        taskLink: req.body.taskLink,
                        taskDescription: req.body.taskDescription,
                        startDate: req.body.startDate,
                        dueDate: req.body.dueDate,
                        status: "Incomplete",
                    };
                    const trainingTask = await TrainingTask.create(taskData);
                    await trainingTask.save();
                    return res.json({
                        code: 200,
                        message: "Successfully added training tasks",
                    });
                });
            }
        });
    } catch (error) {
        return res.json(error);
    }
});

router.post("/trainingTask/get", async (req, res, next) => {
    const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
    const TrainingTask = mongoose.connection
          .useDb(companyDB)
          .model("assignTraining", trainingSchema);
    userTrainingTasks = {};
    await TrainingTask.find({ assigneeEmail: req.body.requestorEmail })
        .then((tasks) => {
            if (!tasks) {
                return res.json({
                    code: 404,
                    message: "No assigned tasks found for the user",
                });
            }
            userTrainingTasks["received"] = tasks;
        })
        .catch((err) =>
            res.json({
                code: 500,
                message: err.message,
            })
        );
    await TrainingTask.find({ assignerEmail: req.body.requestorEmail })
        .then((tasks) => {
            if (!tasks) {
                return res.json({
                    code: 404,
                    message: "User has not created any training tasks",
                });
            }
            userTrainingTasks["created"] = tasks;
        })
        .catch((err) =>
            res.json({
                code: 500,
                message: err.message,
            })
        );
    return res.json(userTrainingTasks);
});

router.patch("/trainingTask/edit", (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
        const TrainingTask = mongoose.connection
              .useDb(companyDB)
              .model("assignTraining", trainingSchema);

        TrainingTask.findOne(
            {
                taskId: req.body.taskId,
            },
            (err, task) => {
                if (!task) {
                    return res.json({
                        code: 404,
                        message: "No task with such credentials found",
                    });
                }

                if (req.body.requestorEmail === task.assignerEmail) {
                    TrainingTask.updateMany(
                        {
                            taskId: req.body.taskId,
                            assignerEmail: req.body.requestorEmail,
                        },
                        {
                            ...req.body,
                        }
                    ).then(() => {
                        return res.json({
                            code: 200,
                            message: "Training Tasks updated successfully",
                        });
                    });
                } else if (req.body.requestorEmail === task.assigneeEmail) {
                    TrainingTask.updateOne(
                        {
                            taskId: req.body.taskId,
                            assigneeEmail: req.body.requestorEmail,
                        },
                        {
                            ...req.body,
                        }
                    ).then(() => {
                        return res.json({
                            code: 200,
                            message: "Training Task updated successfully",
                        });
                    });
                }
            }
        );
    } catch (error) {
        return res.json(error);
    }
});

router.delete("/trainingTask/delete", (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
        const TrainingTask = mongoose.connection
              .useDb(companyDB)
              .model("assignTraining", trainingSchema);

        TrainingTask.findOne(
            {
                taskId: req.body.taskId,
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
                    taskId: req.body.taskId,
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

router.post("/pto/create", (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
        const User = mongoose.connection
              .useDb(companyDB)
              .model("users", userSchema);
        const PTOTask = mongoose.connection
              .useDb(companyDB)
              .model("PTORequests", ptoSchema);

        User.findOne({ email: req.body.requestorEmail }, async (err, employee) => {
            if (!employee) {
                return res.json({ code: 404, message: "Employee not found" });
            }
            if (employee.positionTitle == "CEO") {
                return res.json({
                    code: 401,
                    message: "The CEO does not need to request for Paid Time Off",
                });
            }
            User.findOne({ email: req.body.managerEmail }, async (err, manager) => {
                if (!manager) {
                    return res.json({ code: 404, message: "Manager not found" });
                }
                if (employee.managerId != manager.employeeId) {
                    return res.json({
                        code: 401,
                        message: "Invalid Manager credentials",
                    });
                }
                var taskData = {
                    taskId: Math.abs(
                        generateHash(employee.email + req.body.startDate + req.body.endDate)
                    ),
                    requestorEmail: req.body.requestorEmail,
                    managerEmail: req.body.managerEmail,
                    managerId: manager.managerId,
                    title: req.body.title,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    reason: req.body.reason,
                    status: "Pending",
                };

                const ptoRequest = await PTOTask.create(taskData);
                await ptoRequest.save();
                return res.json({
                    code: 200,
                    message: "Successfully added Paid Time Off Request",
                });
            });
        });
    } catch (error) {
        return res.json(error);
    }
});

router.patch("pto/edit", (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
        const PTOTask = mongoose.connection
              .useDb(companyDB)
              .model("PTORequests", ptoSchema);
        PTOTask.findOne(
            {
                taskId: req.body.taskId,
                requestorEmail: req.body.requestorEmail,
            },
            (err, task) => {
                if (!task) {
                    return res.json({
                        code: 404,
                        message: "No task with such credentials found",
                    });
                }
                PTOTask.updateOne(
                    {
                        taskId: req.body.taskId,
                        requestorEmail: req.body.requestorEmail,
                    },
                    {
                        ...req.body,
                    }
                ).then(() => {
                    return res.json({
                        code: 200,
                        message: "Paid Time Off Request updated successfully",
                    });
                });
            }
        );
    } catch (error) {
        return res.json(error);
    }
});
router.delete("pto/delete", (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
        const PTOTask = mongoose.connection
              .useDb(companyDB)
              .model("PTORequests", ptoSchema);

        PTOTask.findOne({ taskId: req.body.taskId }, (err, task) => {
            if (!task) {
                return res.json({ code: 404, message: "Request not found" });
            }
            if (task.requestorEmail !== req.body.requestorEmail) {
                return res.json({
                    code: 401,
                    message: "User does not have deleting permissions",
                });
            }
            PTOTask.delete({
                taskId: req.body.taskId,
                requestorEmail: req.body.requestorEmail,
            })
                .then(() => {
                    return res.json({
                        code: 200,
                        message: "Paid Time Off Request deleted successfully",
                    });
                })
                .catch((err) => {
                    return res.json(err);
                });
        });
    } catch (error) {
        return res.json(error);
    }
});

module.exports = router;
