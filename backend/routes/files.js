import express from "express";
import mongoose from "mongoose";
import MasterImage from "../models/MasterImage.js";
import Evidence from "../models/Evidence.js";

const router = express.Router();

router.get("/master-image/:statusId", async (req, res) => {
    console.log("🔹 Received request");  // Log when request is received

    try {
        const { statusId } = req.params;
        console.log(`🔹 Extracted statusId: ${statusId}`);

        if (!mongoose.Types.ObjectId.isValid(statusId)) {
            console.log("❌ Invalid statusId format.");
            return res.status(400).json({ message: "Invalid statusId format." });
        }

        const statusObjId = new mongoose.Types.ObjectId(statusId);
        console.log(`🔍 Searching for MasterImage with statusId: ${statusObjId}`);

        // **THIS MIGHT BE GETTING STUCK**
        const masterImage = await MasterImage.findOne({ statusId: statusObjId });
        console.log("✅ Query executed");

        if (!masterImage) {
            console.log("❌ MasterImage not found.");
            return res.status(404).json({ message: "Master Image not found." });
        }

        const masterFileUrl = `http://localhost:8021${masterImage.fileUrl}`;
        console.log(`✅ Found MasterImage: ${masterFileUrl}`);

        return res.json({
            fileName: masterImage.fileName,
            fileType: masterImage.fileType,
            fileSize: masterImage.fileSize,
            fileUrl: masterFileUrl,
            createdAt: masterImage.createdAt,
        });

    } catch (error) {
        console.error("❌ Error fetching Master Image:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.get('/evidence', async (req, res) => {
    try {
        const { actionId, controlId, assetId } = req.query;

        if (!actionId || !controlId || !assetId) {
            return res.status(400).json({ message: 'Missing required query parameters' });
        }

        // Convert string IDs to ObjectId for MongoDB query
        const query = {
            actionId: new mongoose.Types.ObjectId(actionId),
            controlId: new mongoose.Types.ObjectId(controlId),
            assetId: new mongoose.Types.ObjectId(assetId)
        };

        // Find the evidence matching all three IDs
        const evidence = await Evidence.findOne(query);

        if (!evidence) {
            return res.status(404).json({ message: 'Evidence not found' });
        }

        // Construct the full file URL
        const evidenceFileUrl = `http://localhost:8021${evidence.fileUrl}`;

        res.json({
            fileName: evidence.fileName,
            fileType: evidence.fileType,
            fileSize: evidence.fileSize,
            fileUrl: evidenceFileUrl,
            createdAt: evidence.createdAt
        });

    } catch (error) {
        console.error('Error fetching evidence:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;
