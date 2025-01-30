import express from 'express';
import path from 'path';
import multer from 'multer';
import { exec } from 'child_process';
import fs from 'fs';

// Create a router
const router = express.Router();

// Resolve the path to the 'uploads' directory based on the current working directory
const uploadDir = path.join(process.cwd(), 'Ai-Model-Files/'); // Explicitly use process.cwd()

// Ensure the 'Uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer for file upload
const upload = multer({
  dest: uploadDir, // Set the upload directory
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Route for uploading images to train the model
router.post('/upload', upload.array('files', 10), (req, res) => {
  const uploadedFiles = req.files.map(file => file.filename);
  res.json({ files: uploadedFiles });
});

// Route to start model training
router.post('/train', (req, res) => {
  console.log("Training started...");

  // Call the train_model.py script to start training
  exec('python3 AiModel/train_model.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing train_model.py: ${error}`);
      return res.status(500).send('Error during model training.');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error during model training.');
    }
    console.log(`stdout: ${stdout}`);
    res.send('Model training started.');
  });
});

// Route to make predictions on an uploaded image
router.post('/predict', upload.single('file'), (req, res) => {
  const imagePath = path.resolve(uploadDir, req.file.filename); // Adjust path to uploadDir
  console.log(`Making prediction for image: ${imagePath}`);

  // Call the predict_image.py script to make predictions
  exec(`python3 AiModel/predict_image.py ${imagePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing predict_image.py: ${error}`);
      return res.status(500).send('Error during prediction.');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error during prediction.');
    }

    console.log(`stdout: ${stdout}`);
    res.send({ prediction: stdout.trim() }); // Send prediction result back to the frontend
  });
});

export default router;
