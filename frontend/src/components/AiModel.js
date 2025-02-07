import { useState } from "react";
import "./AiModel.css"; // Import the updated CSS

const AiModel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="ai-model-container">
      <h1 className="ai-model-heading">AI Model</h1>
      <p className="ai-model-description">
        This AI model analyzes your screenshot to determine whether Bluetooth is
        turned <strong>ON</strong> or <strong>OFF</strong> in the settings. Just
        upload an image, and let the AI handle the rest!
      </p>

      <div className="ai-model-feature-card">
        <h3>Smart & Fast Detection</h3>
        <p>
          Powered by machine learning, this AI can instantly analyze your image
          and give an accurate prediction.
        </p>
      </div>

      <div className="ai-model-upload-section">
        <input
          type="file"
          className="ai-model-file-input"
          onChange={handleFileChange}
        />
        <button className="ai-model-button" onClick={handleUpload}>
          Confirm & Predict
        </button>
      </div>

      {prediction && (
        <div className="ai-model-result-box">
          <p className="ai-model-result-text">
            🔵 Bluetooth is <strong>{prediction}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default AiModel;
