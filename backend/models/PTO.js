import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PTOSchema = new Schema(
  {
    requesterId: { type: Number, required: false },
    requesteeId: { type: Number, required: false },
    type: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    dueDate: { type: Date, required: false },
    notes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const PTO = mongoose.model("PTO", PTOSchema);
export default PTO;
