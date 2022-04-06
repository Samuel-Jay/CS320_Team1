import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PTOSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        taskId: {type: Number, required: true},
        assignedTo: { type: String, required: true },
        assignedBy: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        status: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const PTO = mongoose.model("PTO", PTOSchema);
export default PTO;
