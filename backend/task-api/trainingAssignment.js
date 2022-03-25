const mongoose = require('mongoose');

const trainingAssignment = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    taskId: {
        type: Number,
        required: true
    }, 
    assignedBy: {
        type: String,
        required: true
    }, 
    assignedTo: {
        type: String,
        required: true
    },
    assignedDate: {
        type: Date,
        required: true
    }, 
    startDate: {
        type: Date,
        required: true
    }, 
    endDate: {
        type: Date,
        required: true
    }
});

const TA = mongoose.model('TA', trainingAssignment, 'AssignedTraining');
module.exports = { TA };