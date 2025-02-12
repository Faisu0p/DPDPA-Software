import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import MasterImage from "../models/MasterImage.js"; // Ensure your model file has .js extension in ESM
import mongoose from "mongoose";
const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../uploads/master-images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Uploads directory created:", uploadDir);
} else {
  console.log("📂 Uploads directory exists:", uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload master image for a specific row
router.post("/upload-master-image", upload.single("masterImage"), async (req, res) => {
  try {
    console.log("🛠 Received request body:", req.body);
    console.log("🛠 Received file:", req.file);

    const assetId = req.body.assetId?.toString();
    const actionId = req.body.actionId?.toString();
    const controlId = req.body.controlId?.toString();
    const familyId = req.body.familyId?.toString();
    const scopeId = req.body.scopeId?.toString() || null; // ✅ Now optional
    const username = req.body.username?.toString() || "Unknown";

    console.log("🔍 Parsed Fields:");
    console.log("Asset ID:", assetId);
    console.log("Action ID:", actionId);
    console.log("Control ID:", controlId);
    console.log("Family ID:", familyId);
    console.log("Scope ID (Optional):", scopeId);

    // ✅ Allow scopeId to be null, but others must be present
    if (!req.file || !assetId || !actionId || !controlId || !familyId) {
      console.error("❌ Missing required fields (except Scope ID)!");
      return res.status(400).json({ error: "Missing required fields (except Scope ID)" });
    }

    const masterImage = new MasterImage({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      fileUrl: `/uploads/master-images/${req.file.filename}`,
      assetId,
      actionId,
      controlId,
      familyId,
      scopeId, // ✅ Now allowed to be null
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await masterImage.save();
    res.status(201).json({ message: "Master image uploaded successfully", masterImage });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Failed to upload master image" });
  }
});


// Get master image by rowId
router.get("/get-master-image/:rowId", async (req, res) => {
  try {
    const { rowId } = req.params;

    // Validate if rowId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(rowId)) {
      return res.status(400).json({ error: "Invalid Row ID format" });
    }

    // Find by MongoDB _id field
    const masterImage = await MasterImage.findById(rowId);

    if (!masterImage) {
      return res.status(404).json({ error: "Master Image not found" });
    }

    res.status(200).json({ masterImage });
  } catch (error) {
    console.error("Error fetching master image:", error);
    res.status(500).json({ error: "Failed to retrieve master image" });
  }
});

export default router;

