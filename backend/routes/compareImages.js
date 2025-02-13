import axios from 'axios';
import mongoose from 'mongoose';
import AiStatus from '../models/AiStatus.js';
import MasterImage from '../models/MasterImage.js';
import Evidence from '../models/Evidence.js';

const AI_MODEL_URL = 'http://localhost:8021/api/v1/images/compare';

const compareImages = async (actionId, controlId) => {
    try {
        // Ensure actionId and controlId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(actionId) || !mongoose.Types.ObjectId.isValid(controlId)) {
            console.log('❌ Invalid actionId or controlId:', actionId, controlId);
            return { success: false, message: 'Invalid actionId or controlId' };
        }

        // Convert to ObjectId
        const actionObjectId = new mongoose.Types.ObjectId(actionId);
        const controlObjectId = new mongoose.Types.ObjectId(controlId);

        // Fetch Master Image
        const masterImage = await MasterImage.findOne({ actionId: actionObjectId, controlId: controlObjectId });
        console.log('📌 Master Image Found:', masterImage);

        // Fetch Evidence
        const evidenceImage = await Evidence.findOne({ actionId: actionObjectId, controlId: controlObjectId });
        console.log('📌 Evidence Image Found:', evidenceImage);

        // Check if both images exist
        if (!masterImage || !evidenceImage) {
            console.log('⚠️ Master Image or Evidence not found for:', actionId, controlId);
            return { success: false, message: 'Images not found' };
        }

        // Send images to AI model for comparison
        const response = await axios.post(AI_MODEL_URL, {
            masterImageUrl: masterImage.fileUrl, // Use fileUrl as image path
            evidenceImageUrl: evidenceImage.fileUrl
        });

        const { similarityScore } = response.data;

        // Save AI Status
        await AiStatus.findOneAndUpdate(
            { actionId: actionObjectId, controlId: controlObjectId },
            { similarityScore, status: 'Completed' },
            { upsert: true, new: true }
        );

        return { success: true, similarityScore };
    } catch (error) {
        console.error('❌ Error comparing images:', error);
        return { success: false, message: 'AI comparison failed' };
    }
};

export default compareImages;
