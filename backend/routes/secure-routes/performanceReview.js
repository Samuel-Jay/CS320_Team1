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
    console.log("test")
    try {
        const companyDB = companies.get(req.body.email.split("@")[1]);
        const User = mongoose.connection
            .useDb(companyDB)
            .model("users", userSchema);
        const PerformanceReview = mongoose.connection
            .useDb(companyDB)
            .model("PerformanceReviews", PerformanceReviewSchema);

        User.findOne({ email: req.body.email }, async (err, user) => {
            let allowed = User.find({managerId: user.managerId});
            console.log(allowed);
            //if (!allowed.includes(req.body.reviewerId)) {
                // return res.json({
                //     message: "Cannot request review from an employee who isn't your peer."
                // });
            //}
            if (!User.find({managerId: user.employeeId}.includes(
                req.body.revieweeId) && req.body.revieweeId == user.employeeId)) {
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
                reviewerEmail: req.body.reviewerEmail,
                reviewerId: req.body.reviewerId,
                reviewerManagerId: User.find({employeeId: reviewerId}).managerId,
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
    const companyDB = companies.get(req.body.email.split("@")[1]);
    const User = mongoose.connection
            .useDb(companyDB)
            .model("users", userSchema);
    const PerformanceReview = mongoose.connection
        .useDb(companyDB)
        .model("PerformanceReviews", PerformanceReviewSchema);
    userPerformanceReviews = {};
    PerformanceReview.find({ reviewerEmail: req.body.email, status: {$in: ["in progress", "to be done"]} })
        .then((reviewTasks) => {
            if (!reviewTasks) {
                return res.json({
                    code: 404,
                    message: "No reviews found for the user to do.",
                });
            }
            userPerformanceReviews["received"] = reviewTasks;
        })
        .catch((err) =>
            res.json({
                code: 500,
                message: err.message,
            })
        );
    PerformanceReview.find({ revieweeEmail:req.body.email, status: "to be done" })
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
    PerformanceReview.find({ revieweeManagerId:req.body.revieweeManagerId, status: {$in: ["completed", "approved"]} })
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
            .model("PerformanceReviews", PerformanceReviewSchema);

        PerformanceReview.findOne(
            {
                reviewerId: User.find({employeeId: req.body.reviewerId}),
            },
            (err, reviewTask) => {
                if (!reviewTask) {
                    return res.json({
                        code: 404,
                        message: "No reviews found.",
                    });
                }
                const user = User.find({employeeId: reviewTask.reviewerId,
                email: reviewerEmail})
                if (req.body.email === user.email) {
                    if (new Date() >= req.body.dueDate) {
                        PerformanceReview.updateOne(
                            {
                                taskId: req.body.taskId,
                                // assigneeEmail: req.body.requestorEmail,
                                // taskId: Math.abs(generateHash()),
                                reviewerEmail: req.body.reviewerEmail,
                                reviewerId: req.body.reviewerId,
                                reviewerManagerId: User.find({employeeId: reviewerId}).managerId,
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
                                status: "complete"
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
                            message: "Cannot make changes past due date."
                        });
                    }
                    if (req.body.status == 'approved' ||
                    req.body.status == 'complete') {
                        return res.json({
                            message: "Cannot make changes after completion or approval."
                        });
                    }
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
                            // assigneeEmail: req.body.requestorEmail,
                            // taskId: Math.abs(generateHash()),
                            reviewerEmail: req.body.reviewerEmail,
                            reviewerId: req.body.reviewerId,
                            reviewerManagerId: User.find({employeeId: reviewerId}).managerId,
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
                            status: req.body.status
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
                } else if (req.body.email === reviewTask.revieweeEmail ||
                    User.find({employeeId: reviewTask.revieweeId,
                    email: reviewTask.revieweeEmail})) {
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

module.exports = router;
