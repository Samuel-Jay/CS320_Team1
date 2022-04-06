import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrainSchema = new Schema(
    {
        taskId: {type: Number, required: true},
        assignerEmail: { type: String, required: true },
        assigneeEmail: { type: String, required: true },
        taskName: {type: String, required: true},
        taskLink: {type: String, required: true},
        taskDescription: {type: String, required: true},
        startDate: {type: Date, required: true},
        dueDate: { type: Date, required: true },
        status: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);

const Train = mongoose.model("Training_Assignment", TrainSchema);
export default Train;
