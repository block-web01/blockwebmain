import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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

InquirySchema.index({ userId: 1, createdAt: -1 });
InquirySchema.index({ createdAt: -1 });

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
