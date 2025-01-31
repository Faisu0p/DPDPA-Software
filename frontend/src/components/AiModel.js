import React, { useState } from "react";
import axios from "axios";
import "./AiModel.css"; // Import the CSS

const AiModel = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [verifyImage, setVerifyImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection for training
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Handle file upload for training the AI model
  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8021/api/train/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedFiles([...uploadedFiles, ...response.data.files]);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image selection for verification
  const handleVerifyImageChange = (e) => {
    setVerifyImage(e.target.files[0]);
  };

  // Handle the verification process (image prediction)
  const handleVerifyImage = async () => {
    if (!verifyImage) {
      alert("Please select an image for verification.");
      return;
    }

    const formData = new FormData();
    formData.append("image", verifyImage);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8021/api/train/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPredictionResult(response.data.prediction);
      setVerifyImage(null);
    } catch (error) {
      console.error("Error verifying image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-model-container">
      <h1 className="ai-model-header">AI Model</h1>
      <p className="ai-model-description">Upload files to train the AI model and verify image predictions.</p>

      {/* File Upload Section */}
      <div className="ai-model-section">
        <h2>Upload Training Data</h2>
        <input type="file" multiple className="ai-model-file-input" onChange={handleFileChange} disabled={loading} />
        <button className="ai-model-upload-button" onClick={handleFileUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Files"}
        </button>
      </div>

      {/* Display Uploaded Files */}
      <div className="ai-model-uploaded-files">
        <h2>Uploaded Files</h2>
        {uploadedFiles.length > 0 ? (
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        ) : (
          <p className="ai-model-placeholder">No files uploaded yet.</p>
        )}
      </div>

      {/* Image Verification Section */}
      <div className="ai-model-section">
        <h2>Verify Image for Prediction</h2>
        <input type="file" className="ai-model-file-input" onChange={handleVerifyImageChange} disabled={loading} />
        <button className="ai-model-upload-button" onClick={handleVerifyImage} disabled={loading}>
          {loading ? "Verifying..." : "Verify Image"}
        </button>
      </div>

      {/* Prediction Result Display */}
      {predictionResult && (
        <div className="ai-model-prediction-result">
          <h3>Prediction Result:</h3>
          <p>{predictionResult}</p>
        </div>
      )}
    </div>
  );
};

export default AiModel;
