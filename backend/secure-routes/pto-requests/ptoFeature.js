const mongoose = require('mongoose');
const userSchema = require("../schema/UserSchema");
const ptoSchema = require('../../schema/PTOSchema');

module.exports = function(app) {
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

    app.post('pto/create', (req, res) => {
        try {
            const companyDB = companies.get(req.body.assignerEmail.split("@")[1]);
            const User = mongoose.connection
                .useDb(companyDB)
                .model("users", userSchema);
            const PTORequest = mongoose.connection
                .useDb(companyDB)
                .model("PTORequests", ptoSchema);

            User.findOne({employeeId: req.body.employeeId}, async (err, user) => {
                if (user.positionTitle == "CEO") {
                    return res.json({
                        message: "This user is not authorized to make PTO requests."
                    });
                }
                var taskData = {
                    taskId: Math.abs(generateHash()),
                    mangerEmail: req.body.mangerEmail,
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
}