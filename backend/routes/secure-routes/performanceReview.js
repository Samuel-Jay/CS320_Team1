const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PerformanceReviewSchema = require("../../schema/PerformanceReviewSchema");
const userSchema = require("../../schema/UserSchema");
const { companies } = require("../../config");
const generateHash = require("../../utils/hashIdGenerator");

router.get("/performanceReview/employee", async (req, res, next) => {
    const companyDB = companies.get(req.user.email.split("@")[1]);
    const User = mongoose.connection
          .useDb(companyDB)
          .model("users", userSchema);
    const user = await User.findOne({_id: req.user._id})
    const employee = await User.find({managerId: user.managerId})
    const manager = await User.findOne({employeeId: user.managerId})
    let result = [...employee, manager]
    return res.status(200).json({result});
})

router.post("/performanceReview/create", async (req, res, next) => {
    try {
        const companyDB = companies.get(req.user.email.split("@")[1]);
        const User = mongoose.connection
              .useDb(companyDB)
              .model("users", userSchema);
        const PerformanceReview = mongoose.connection
              .useDb(companyDB)
              .model("PerformanceReviews", PerformanceReviewSchema);
        User.findOne({ _id: req.user._id }, async (err, user) => {
            const reviewer = await User.findOne({email: req.body.reviewerEmail});
            if ((reviewer.managerId !== user.managerId && reviewer.managerId !== user.employeeId) || reviewer.employeeId === user.employeeId) {
                return res.status(400).json({
                    message:
                    "Cannot request review from an employee who isn't your peer.",
                });
            }
            var taskData = {
                taskId: Math.abs(generateHash()),
                reviewerId: reviewer.employeeId,
                revieweeId: user.employeeId,
                revieweeManagerId: user.managerId,
                overallComments: "",
                growthFeedbackComments: "",
                growthFeedbackScore: 0,
                kindnessFeedbackComments: "",
                kindnessFeedbackScore: 0,
                deliveryFeedbackComments: "",
                deliveryFeedbackScore: 0,
                startDate: req.body.startDate,
                dueDate: req.body.dueDate,
                status: "Incomplete",
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

router.get("/performanceReview/get", async (req, res, next) => {
    const companyDB = companies.get(req.user.email.split("@")[1]);
    const User = mongoose.connection.useDb(companyDB).model("users", userSchema);
    const PerformanceReview = mongoose.connection
          .useDb(companyDB)
          .model("PerformanceReviews", PerformanceReviewSchema);
    const getUserDetails = require("../../utils/").getUserDetails;
    await User.findOne({ email: req.user.email })
        .then(async (user) => {
            console.log(user.employeeId)
            userPerformanceReviews = {};
            userPerformanceReviews["created"] = await PerformanceReview.find({
                $or:[{revieweeId: user.employeeId}]
            })
                .then(async (tasks) => {
                    console.log(tasks)
                    for (let [idx, task] of tasks.entries()) {
                        reviewer = await getUserDetails(
                            "employeeId",
                            task.reviewerId,
                            companyDB
                        );
                        reviewee = await getUserDetails(
                            "employeeId",
                            task.revieweeId,
                            companyDB
                        );
                        tasks[idx] = {
                            ...task["_doc"],
                            reviewerEmail: reviewer["email"],
                            revieweeEmail: reviewee["email"],
                        };
                        console.log(idx);
                    }
                    return tasks;
                })
                .catch((error) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        message: error.message,
                    });
                });

            userPerformanceReviews["received"] = await PerformanceReview.find({
                $or:[{reviewerId: user.employeeId}, {revieweeManagerId: user.employeeId} ]
            })
                .then(async (tasks) => {
                    for (let [idx, task] of tasks.entries()) {
                        reviewer = await getUserDetails(
                            "employeeId",
                            task.reviewerId,
                            companyDB
                        );
                        reviewee = await getUserDetails(
                            "employeeId",
                            task.revieweeId,
                            companyDB
                        );
                        tasks[idx] = {
                            ...task["_doc"],
                            reviewerEmail: reviewer["email"],
                            revieweeEmail: reviewee["email"],
                        };
                    }
                    return tasks;
                })
                .catch((error) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        message: error.message,
                    });
                });
            return res.json({
                code: 200,
                status: "success",
                tasks: userPerformanceReviews,
            });
        })
        .catch((error) => {
            return res.json({
                code: 500,
                status: "error",
                message: error.message,
            });
        });
});

router.patch("/PerformanceReview/edit", async (req, res, next) => {
    try {
        const companyDB = companies.get(req.body.requestorEmail.split("@")[1]);
        const User = mongoose.connection
              .useDb(companyDB)
              .model("users", userSchema);
        const PerformanceReview = mongoose.connection
              .useDb(companyDB)
              .model("PerformanceReviews", PerformanceReviewSchema);

        PerformanceReview.findOne(
            {
                reviewerId: User.find({ employeeId: req.body.reviewerId }),
            },
            (err, reviewTask) => {
                if (!reviewTask) {
                    return res.json({
                        code: 404,
                        message: "No reviews found.",
                    });
                }
                const user = User.find({
                    employeeId: reviewTask.reviewerId,
                    email: reviewerEmail,
                });
                if (req.body.email === user.email) {
                    if (new Date() >= req.body.dueDate) {
                        PerformanceReview.updateOne(
                            {
                                taskId: req.body.taskId,
                                // assigneeEmail: req.body.requestorEmail,
                                // taskId: Math.abs(generateHash()),
                                reviewerEmail: req.body.reviewerEmail,
                                reviewerId: req.body.reviewerId,
                                reviewerManagerId: User.find({ employeeId: reviewerId })
                                    .managerId,
                                revieweeEmail: user.email,
                                revieweeId: user.employeeId,
                                revieweeManagerId: user.managerId,
                                companyId: user.companyId,
                                companyName: user.companyName,
                                overallComments: "",
                                growthFeedbackComments: "",
                                growthFeedbackScore: undefined,
                                kindnessFeedbackComments: "",
                                kindnessFeedbackScore: undefined,
                                deliveryFeedbackComments: "",
                                deliveryFeedbackScore: undefined,
                                dueDate: req.body.dueDate,
                                status: "complete",
                            },
                            {
                                ...req.body,
                            }
                        ).then(() => {
                            return res.json({
                                code: 200,
                                message: "Incomplete Performance Review submitted",
                            });
                        });
                        return res.json({
                            message: "Cannot make changes past due date.",
                        });
                    }
                    if (req.body.status == "approved" || req.body.status == "complete") {
                        return res.json({
                            message: "Cannot make changes after completion or approval.",
                        });
                    }
                    if (
                        (len(req.body.overallComments) == 0) &
                            isAlpha(req.body.overallComments)
                    ) {
                        return res.json({
                            message: "Cannot provide unjustified rating score.",
                        });
                    }
                    if (len(req.body.growthFeedback) == 0 &
                        isAlpha(req.body.growthFeedback)) {
                        return res.json({
                            message: "Cannot provide unjustified rating score.",
                        });
                    }
                    if (len(req.body.kindnessFeedback) == 0 &
                        isAlpha(req.body.kindnessFeedback)) {
                        return res.json({
                            message: "Cannot provide unjustified rating score.",
                        });
                    }
                    if (len(req.body.deliveryFeedback) == 0 &
                        isAlpha(req.body.deliveryFeedback)) {
                        return res.json({
                            message: "Cannot provide unjustified rating score.",
                        });
                    }
                    PerformanceReview.updateOne(
                        {
                            taskId: req.body.taskId,
                            // assigneeEmail: req.body.requestorEmail,
                            // taskId: Math.abs(generateHash()),
                            reviewerEmail: req.body.reviewerEmail,
                            reviewerId: req.body.reviewerId,
                            reviewerManagerId: User.find({ employeeId: reviewerId })
                                .managerId,
                            revieweeEmail: user.email,
                            revieweeId: user.employeeId,
                            revieweeManagerId: user.managerId,
                            companyId: user.companyId,
                            companyName: user.companyName,
                            overallComments: req.body.overallComments,
                            growthFeedbackComments: req.body.growthFeedbackComments,
                            growthFeedbackScore: req.body.growthFeedbackScore,
                            kindnessFeedbackComments: req.body.kindnessFeedbackComments,
                            kindnessFeedbackScore: req.body.kindnessFeedbackScore,
                            deliveryFeedbackComments: req.body.deliveryFeedbackComments,
                            deliveryFeedbackScore: req.body.deliveryFeedbackScore,
                            dueDate: req.body.dueDate,
                            status: req.body.status,
                        },
                        {
                            ...req.body,
                        }
                    ).then(() => {
                        return res.json({
                            code: 200,
                            message: "Performance Review updated successfully",
                        });
                    });
                } else if (
                    req.body.email === reviewTask.revieweeEmail ||
                        User.find({
                            employeeId: reviewTask.revieweeId,
                            email: reviewTask.revieweeEmail,
                        })
                ) {
                    return res.json({
                        message: "Does not have edit permissions on this review.",
                    });
                }
            }
        );
    } catch (error) {
        return res.json(error);
    }
});

router.delete("/PerformanceReview/delete",  async (req, res, next) => {
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

module.exports = router;
