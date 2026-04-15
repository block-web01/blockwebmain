import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    service: {
      type: String,
    },
    slot1: {
      date: Date,
      time: String,
    },
    slot2: {
      date: Date,
      time: String,
    },
    status: {
      type: String,
      enum: ["unread", "read", "resolved"],
      default: "unread",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
