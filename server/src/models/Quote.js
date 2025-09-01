import mongoose from "mongoose";

const scheduleItem = new mongoose.Schema({
  month: Number,
  principal: Number,
  interest: Number,
  balance: Number
}, { _id: false });

const quoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  procedureId: { type: mongoose.Schema.Types.ObjectId, ref: "Procedure", required: true },
  amount: { type: Number, required: true, min: 0 },
  tenureMonths: { type: Number, required: true, min: 1 },
  interestRate: { type: Number, required: true, min: 0 }, // annual %
  emi: { type: Number, required: true, min: 0 },
  schedule: [scheduleItem]
}, { timestamps: true });

export default mongoose.model("Quote", quoteSchema);
