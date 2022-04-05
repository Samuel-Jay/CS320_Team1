const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Only connects to the Atlas-Tech database. Connection will be determined by user's login information.
mongoose.connect(`mongodb+srv://team1:team1project@cluster0.ba40p.mongodb.net/Atlas-Tech?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch((e) => {
    console.log('Error with connecting to MongoDB');
    console.log(e);
});
var db = mongoose.connection;

// Load schemas
const userSchema = require('../schema/UserSchema')
const User = db.model('users', userSchema);
const { TA } = require('../schema/TrainingSchema');
const { PTO } = require('../schema/PTOSchema');
const { PFRV } = require('../schema/PerformanceReviewSchema');

// List the tasks
app.get('/tasks', (req, res) => {
    // An array of company training tasks.
    TA.find({}).then((TAs) => {
        res.send(TAs);
    });
        
});

// Create company training tasks
app.post('/tasks', (req, res) => {
    User.findOne({employeeId: req.body.employeeId}, (err, data) => {
        // Checks if the person with specific employeeId is a manager or not.
        // Only managers should have the permission to create company training tasks.
        if (data.isManager == true) {
            // Here, managers can create tasks for employees.
            let taskName = req.body.taskName;
            let taskDescription = req.body.taskDescription;
            let taskId = req.body.taskId;
            let assignerEmail = req.body.assignerEmail;
            let assigneeEmail = req.body.assigneeEmail;
            let startDate = req.body.startDate;
            let dueDate = req.body.dueDate;
            let status = req.body.status;
            let newTask = new TA ({
                taskName,
                taskDescription,
                taskId,
                assignerEmail,
                assigneeEmail,
                assignedDate,
                startDate,
                dueDate,
                status
            });
            newTask.save().then((taskDoc) => res.send(taskDoc));
            TA.insertOne(newTask);

            // return res.json({
            //     message: "This person is a manager.",
            //     data
            // });
        } else {
            return res.json({
                message: "This person is not a manager.",
                data
            })
        }
        
    });
});

// Create PTO requests
app.post('/tasks', (req, res) => {
    User.findOne({employeeId: req.body.employeeId}, (err, data) => {
        // Checks if the person with specific employeeId is a manager or not.
        // Only managers should have the permission to create company training tasks.
        if (data.isManager == false || (data.isManager == true && data.managerId != undefined)) {
            // Here, managers can create tasks for employees.
            let title = req.body.taskName;
            let description = req.body.description;
            let taskId = req.body.taskId;
            let assignedBy = req.body.assignedBy;
            let assignedTo = req.body.assignedTo;
            let dueDate = req.body.dueDate;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let status = req.body.status;
            let newPTO = new PTO ({
                title,
                description,
                taskId,
                assignedBy,
                assignedTo,
                dueDate,
                startDate,
                endDate,
                status
            });
            newPTO.save().then((taskDoc) => res.send(taskDoc));
            PTO.insertOne(newPTO);

            // return res.json({
            //     message: "This person is a manager.",
            //     data
            // });
        } else {
            return res.json({
                message: "This person is not a manager.",
                data
            })
        }
        
    });
});

// Create PFRV requests
app.post('/tasks', (req, res) => {
    User.findOne({employeeId: req.body.employeeId}, (err, data) => {
        // Checks if the person with specific employeeId is a manager or not.
        // Only managers should have the permission to create company training tasks.
        if (data.employeeId == employeeId) {
            // Here, managers can create tasks for employees.
            let title = req.body.taskName;
            let description = req.body.description;
            let taskId = req.body.taskId;
            let assignedBy = req.body.assignedBy;
            let assignedTo = req.body.assignedTo;
            let dueDate = req.body.dueDate;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let status = req.body.status;
            let newPFRV = new PFRV ({
                title,
                description,
                taskId,
                assignedBy,
                assignedTo,
                dueDate,
                startDate,
                endDate,
                status
            });
            newPFRV.save().then((taskDoc) => res.send(taskDoc));
            PFRV.insertOne(newPFRV);

            // return res.json({
            //     message: "This person is a manager.",
            //     data
            // });
        } else {
            return res.json({
                message: "This person is not a manager.",
                data
            })
        }
        
    });
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});