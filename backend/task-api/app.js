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
const userSchema = require('../models/user')
const User = db.model('users', userSchema);
const { TA } = require('./trainingAssignment');

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
            let description = req.body.description;
            let taskId = req.body.taskId;
            let assignedBy = req.body.assignedBy;
            let assignedTo = req.body.assignedTo;
            let assignedDate = req.body.assignedDate;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let newTask = new TA ({
                taskName,
                description,
                taskId,
                assignedBy,
                assignedTo,
                assignedDate,
                startDate,
                endDate
            });
            newTask.save().then((taskDoc) => res.send(taskDoc));
            

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