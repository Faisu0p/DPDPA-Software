import mongoose from "mongoose";

const MasterImageSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  fileSize: Number,
  fileUrl: String,
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  actionId: { type: mongoose.Schema.Types.ObjectId, ref: "Action" },
  controlId: { type: mongoose.Schema.Types.ObjectId, ref: "Control" },
  scopeId: { type: mongoose.Schema.Types.ObjectId, ref: "Scope" },
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family" },
  username: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MasterImage = mongoose.model("MasterImage", MasterImageSchema);

export default MasterImage;
