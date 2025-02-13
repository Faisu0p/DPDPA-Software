import mongoose from 'mongoose';

const AiStatusSchema = new mongoose.Schema({
    actionId: { type: String, required: true }, // Reference to action
    controlId: { type: String, required: true }, // Reference to control
    similarityScore: { type: Number, required: true }, // AI model's similarity score
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Completed'], 
        default: 'Pending' 
    }, // Processing status
    createdAt: { type: Date, default: Date.now } // Auto timestamp
});

// Create index to enforce unique actionId + controlId combination
AiStatusSchema.index({ actionId: 1, controlId: 1 }, { unique: true });

const AiStatus = mongoose.model('AiStatus', AiStatusSchema);

export default AiStatus;
