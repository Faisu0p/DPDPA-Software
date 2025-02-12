import { useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi"; // Import upload icon

const MasterImageUpload = ({ statusId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(""); // Reset error
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("masterImage", file);

    try {
      const response = await axios.post(
        "http://localhost:8021/api/v1/master-image/upload-master",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.imageUrl) {
        const fullImageUrl = `http://localhost:8021${response.data.imageUrl}`;
        setImageUrl(fullImageUrl);
        onUploadSuccess(statusId, fullImageUrl);
        setError("");
      } else {
        setError("Upload failed. No image URL returned.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      {!imageUrl ? (
        <label style={{ cursor: "pointer", display: "inline-block" }}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <FiUpload size={40} color="#555" />
        </label>
      ) : (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ width: "100px", borderRadius: "5px" }}
        />
      )}

      {file && !imageUrl && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "8px 15px",
            border: "none",
            background: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}

      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
};

export default MasterImageUpload;
