import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PTOSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    taskId: {type: Number, required: true},
    assignedTo: { type: String, required: false },
    assignedBy: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    dueDate: { type: Date, required: false },
    status: {type: String, required: false}
  },
  {
    timestamps: true,
  }
);

const PTO = mongoose.model("PTO", PTOSchema);
export default PTO;
