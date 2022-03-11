import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrainSchema = new Schema(
  {
    requesterId: { type: Number, required: false },
    traineeId: { type: Number, required: false },
    source: { type: String, required: false },
    dueDate: { type: Date, required: false },
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model("Training_Assignment", TrainSchema);
export default Train;
