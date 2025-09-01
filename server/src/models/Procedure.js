import mongoose from "mongoose";

const procedureSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true },
  baseCost: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model("Procedure", procedureSchema);
