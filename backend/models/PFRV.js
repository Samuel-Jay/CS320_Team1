import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PFRVSchema = new Schema(
  {
    reviewerId: { type: Number, required: false },
    revieweeId: { type: Number, required: false },
    companyId: { type: Number, required: false },
    companyName: { type: String, required: false },
    overallComments: { type: String, required: false },
    growthFeedbackScore: { type: Number, required: false },
    growthFeedbackComment: { type: String, required: false },
    kindnessFeedbackScore: { type: Number, required: false },
    kindnessFeedbackComment: { type: String, required: false },
    deliveryFeedbackScore: { type: Number, required: false },
    deliveryFeedbackComment: { type: String, required: false },
    dueDate: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const PFRV = mongoose.model("PFRV", PFRVSchema);
export default PFRV;
