import React, { useState } from 'react';
import axios from 'axios';
import './AiModel.css'; // Import the CSS

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
    
    // Loop through selected files and append them to the FormData object
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      setLoading(true); // Set loading state to true while uploading

      // Send the files to the server for processing (training)
      const response = await axios.post('http://localhost:8021/api/train/upload', formData, { // Use backend URL with port 5000
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the backend returns the names of the uploaded files
      setUploadedFiles([...uploadedFiles, ...response.data.files]);

      // Reset file input and state
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setLoading(false); // Set loading state to false once the upload is complete
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
    formData.append('image', verifyImage);

    try {
      setLoading(true); // Set loading state to true while verifying

      // Send the image to the backend for prediction
      const response = await axios.post('http://localhost:8021/api/train/predict', formData, { // Use backend URL with port 5000
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the backend returns the prediction result
      setPredictionResult(response.data.prediction);

      // Reset verification state
      setVerifyImage(null);
    } catch (error) {
      console.error('Error verifying image:', error);
    } finally {
      setLoading(false); // Set loading state to false once verification is complete
    }
  };

  return (
    <div className="ai-model-container">
      <h1 className="ai-model-header">AI Model</h1>
      <p className="ai-model-description">
        Upload files to train the AI model and verify image predictions.
      </p>

      {/* File upload form for training */}
      <div>
        <h2>Upload Training Data:</h2>
        <input
          type="file"
          multiple
          className="ai-model-file-input"
          onChange={handleFileChange}
          disabled={loading} // Disable file input during upload
        />
        <button
          className="ai-model-upload-button"
          onClick={handleFileUpload}
          disabled={loading} // Disable button during upload
        >
          {loading ? 'Uploading...' : 'Upload Files'}
        </button>
      </div>

      {/* Display uploaded files */}
      <div className="ai-model-uploaded-files">
        <h2>Uploaded Files:</h2>
        <ul>
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </ul>
      </div>

      {/* Image upload for verification */}
      <div>
        <h2>Verify Image for Prediction:</h2>
        <input
          type="file"
          className="ai-model-file-input"
          onChange={handleVerifyImageChange}
          disabled={loading} // Disable file input during upload
        />
        <button
          className="ai-model-upload-button"
          onClick={handleVerifyImage}
          disabled={loading} // Disable button during upload
        >
          {loading ? 'Verifying...' : 'Verify Image'}
        </button>
      </div>

      {/* Display the prediction result */}
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
