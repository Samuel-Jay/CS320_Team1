const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PerformanceReviewSchema = require("../schema/PerformanceReviewSchema");
const userSchema = require("../schema/UserSchema");
const { companies } = require("../config");
const { isUndefined } = require("util");

// const generateHash = (key) => {
//     var hash = 0;
//     if (key.length == 0) return hash;
//     for (i = 0; i < key.length; i++) {
//         char = key.charCodeAt(i);
//         hash = (hash << 5) - hash + char;
//         hash = hash & hash;
//     }
//     return hash;
// };

const generateHash = () => {
    var today = new Date();
    var date = `${
        today.getUTCMonth() + 1}-${today.getUTCDate()}-${today.getFullYear()}`;
    var time = `${today.getUTCHours()}-${today.getUTCMinutes()}-${today.getUTCSeconds()}`;
    
    var key = `${date} ${time}`;
    var hash = 0;
    
    for (i = 0; i < key.length; i++) {
        char = key.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
};  

router.get("/profile", (req, res, next) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
    });
});

// router.post("/employees/get", async (req, res, next) => {
//     const companyDB = companies.get(req.body.email.split("@")[1]);
//     const User = mongoose.connection
//         .useDb(companyDB)
//         .model("users", userSchema);
//     respond = {};
//     await User.find({ managerId: req.body.employeeId })
//         .then((employees) => {
//             if (!employees) {
//                 return res.json({
//                     code: 404,
//                     message: "No employees under management",
//                 });
//             }
//             respond["employees"] = employees;
//         })
//         .catch((err) =>
//             res.json({
//                 code: 500,
//                 message: err.message,
//             })
//         );

//     return res.json(respond);
// });

router.post('/performanceReview/create', (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.reviewerEmail.split("@")[1]);
        const User = mongoose.connection
            .useDb(companyDB)
            .model("users", userSchema);
        const PerformanceReview = mongoose.connection
            .useDb(companyDB)
            .model("PerformanceReviews", PerformanceReviewSchema);

        await User.findOne({ email: req.body.email }, async (err, user) => {
            let allowed = User.find({managerId: user.managerId});
            if (!allowed.includes(req.body.reviewerId) &&
            !allowed.includes(req.body.revieweeId)) {
                return res.json({
                    message: "Cannot request review from an employee who isn't your peer."
                });
            }
            else if (!User.find({managerId: user.employeeId}.includes(req.body.reviewerId)) ||
            (req.body.revieweeId != user.managerId)) {
                return res.json({
                    message: "Cannot request review from employee who isn't peer or subordinate."
                });
            }
            else if (req.body.growthFeedbackScore != undefined) {
                return res.json({message:"Cannot review yourself."});
            }
            else if (req.body.kindnessFeedbackScore != undefined) {
                return res.json({message:"Cannot review yourself."});
            }
            else if (req.body.deliveryFeedbackScore != undefined) {
                return res.json({message:"Cannot review yourself."});
            }
            var taskData = {
                taskId: Math.abs(generateHash()),
                reviewerId: req.body.reviewerId,
                revieweeId: req.body.revieweeId,
                companyId: req.body.companyId,
                companyName: req.body.companyName,
                overallComments: req.body.overallComments,
                growthFeedback: req.body.growthFeedback,
                growthFeedbackScore: req.body.growthFeedbackScore,
                kindnessFeedback: req.body.kindnessFeedback,
                kindnessFeedbackScore: req.body.kindnessFeedbackScore,
                deliveryFeedback: req.body.deliveryFeedback,
                deliveryFeedbackScore: req.body.deliveryFeedbackScore,
                dueDate: req.body.dueDate,
                status: req.body.status
            };
            const performanceReview = await PerformanceReview.create(taskData);
            await performanceReview.save();
            return res.json({
                code: 200,
                message: "Successfully added Performance Review.",
            });
        });  
    } catch (error) {
        return res.json(error);
    }
});

router.post("/performanceReview/get", async (req, res, next) => {
    const companyDB = companies.get(req.body.Email.split("@")[1]);
    const User = mongoose.connection
            .useDb(companyDB)
            .model("users", userSchema);
    const PerformanceReview = mongoose.connection
        .useDb(companyDB)
        .model("PerformanceReviews", PerformanceReviewSchema);
    userPerformanceReviews = {};
    await PerformanceReview.find({ taskId: req.body.taskId })
        .then((tasks) => {
            if (!tasks) {
                return res.json({
                    code: 404,
                    message: "No reviews found for the user to do.",
                });
            }
            userPerformanceReviews["received"] = tasks;
        })
        .catch((err) =>
            res.json({
                code: 500,
                message: err.message,
            })
        );
    await PerformanceReview.find({ taskId: req.body.taskId })
        .then((tasks) => {
            if (!tasks) {
                return res.json({
                    code: 404,
                    message: "User has not created any performance reviews",
                });
            }
            userPerformanceReviews["created"] = tasks;
        })
        .catch((err) =>
            res.json({
                code: 500,
                message: err.message,
            })
        );
    return res.json(userPerformanceReviews);
});

router.patch("/PerformanceReview/edit", (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
        const User = mongoose.connection
            .useDb(companyDB)
            .model("users", userSchema);
        const PerformanceReview = mongoose.connection
            .useDb(companyDB)
            .model("performanceReview", pfrvSchema);

        PerformanceReview.findOne(
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
                const user = User.find({employeeId: task.assignerEmail})
                if (req.body.requestorEmail === user.email) {
                    PerformanceReview.updateMany(
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
                    if (len(req.body.overallComments) == 0 & isAlpha(req.body.overallComments)) {
                        return res.json({
                            message: "Cannot provide unjustified rating score."
                        });
                    }
                    if (len(req.body.growthFeedback) == 0) {
                        return res.json({
                            message: "Cannot provide unjustified rating score."
                        });
                    }
                    if (len(req.body.kindnessFeedback) == 0) {
                        return res.json({
                            message: "Cannot provide unjustified rating score."
                        });
                    }
                    if (len(req.body.deliveryFeedback) == 0) {
                        return res.json({
                            message: "Cannot provide unjustified rating score."
                        });
                    }
                    PerformanceReview.updateOne(
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

router.delete("/PerformanceReview/delete", (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
        const PerformanceReview = mongoose.connection
            .useDb(companyDB)
            .model("assignTraining", trainingSchema);

        PerformanceReview.findOne(
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
                PerformanceReview.deleteMany({
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
