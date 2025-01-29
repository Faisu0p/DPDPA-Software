import React, { useState } from 'react';
import axios from 'axios';
import './AiModel.css'; // Import the CSS

const AiModel = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    const formData = new FormData();
    
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      // Send the files to the server for processing
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the uploaded files state
      setUploadedFiles([...uploadedFiles, ...response.data.files]);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="ai-model-container">
      <h1 className="ai-model-header">AI Model</h1>
      <p className="ai-model-description">This AI Model will train itself based on the uploaded files.</p>
      
      {/* File upload form */}
      <input
        type="file"
        multiple
        className="ai-model-file-input"
        onChange={handleFileChange}
      />
      <button
        className="ai-model-upload-button"
        onClick={handleFileUpload}
      >
        Upload Files
      </button>

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
    </div>
  );
};

export default AiModel;
