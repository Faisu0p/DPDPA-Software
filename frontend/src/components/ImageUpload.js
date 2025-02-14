import { useState } from "react";

const ImageUpload = ({ onUpload }) => {
  const [masterFiles, setMasterFiles] = useState([]);
  const [userFile, setUserFile] = useState(null);

  const handleMasterChange = (e) => {
    setMasterFiles([...e.target.files]);
  };

  const handleUserChange = (e) => {
    setUserFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userFile || masterFiles.length === 0) {
      alert("Please select master and user images.");
      return;
    }

    const formData = new FormData();
    masterFiles.forEach((file) => formData.append("masterImages", file)); // ✅ Correct field name
    formData.append("userImage", userFile); // ✅ Correct field name
    

    try {
      const response = await fetch("http://localhost:8021/api/v1/images/compare", { 
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("AI Response:", result);
      onUpload(result); // Pass response to parent component
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h3>Upload Images</h3>
      <input type="file" multiple onChange={handleMasterChange} />
      <input type="file" onChange={handleUserChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default ImageUpload;
