import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrainSchema = new Schema(
  {
    taskId: {type: Number, required: false},
    assignerId: { type: Number, required: false },
    assigneeId: { type: Number, required: false },
    taskName: {type: String, required: false},
    taskLink: {type: String, required: false},
    taskDescription: {type: String, required: false},
    dueDate: { type: Date, required: false },
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model("Training_Assignment", TrainSchema);
export default Train;
