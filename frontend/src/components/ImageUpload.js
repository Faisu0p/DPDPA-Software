import { useState } from "react";

const ImageUpload = ({ statusId, actionId, controlId, assetId, onUpload }) => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const fetchImagesAndCompare = async () => {
    try {
      setLoading(true);
  
      // Step 1: Fetch Master Image
      const masterRes = await fetch(`http://localhost:8021/api/abc/master-image/${statusId}`);
      const masterData = await masterRes.json();
      if (!masterRes.ok) throw new Error(masterData.message || "Failed to fetch Master Image");
  
      console.log("✅ Master Image URL:", masterData.fileUrl);
  
      // Step 2: Fetch Evidence Image
      const evidenceRes = await fetch(
        `http://localhost:8021/api/abc/evidence?actionId=${actionId}&controlId=${controlId}&assetId=${assetId}`
      );
      const evidenceData = await evidenceRes.json();
      if (!evidenceRes.ok) throw new Error(evidenceData.message || "Failed to fetch Evidence");
  
      console.log("✅ Evidence Image URL:", evidenceData.fileUrl);
  
      // Step 3: Convert URLs to File Objects
      const masterBlob = await (await fetch(masterData.fileUrl)).blob();
      const evidenceBlob = await (await fetch(evidenceData.fileUrl)).blob();
  
      const masterFile = new File([masterBlob], masterData.fileName, { type: masterData.fileType });
      const evidenceFile = new File([evidenceBlob], evidenceData.fileName, { type: evidenceData.fileType });
  
      // Step 4: Send Images to AI Model
      const formData = new FormData();
      formData.append("masterImages", masterFile);
      formData.append("userImage", evidenceFile);
  
      const aiRes = await fetch("http://localhost:8021/api/v1/images/compare", {
        method: "POST",
        body: formData,
      });
  
      const aiResult = await aiRes.json();
      if (!aiRes.ok) throw new Error(aiResult.message || "AI Model Error");
  
      console.log("✅ AI Response:", aiResult);
      setAiResponse(aiResult);
      onUpload(aiResult);
  
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <button onClick={fetchImagesAndCompare} disabled={loading}>
        {loading ? "Processing..." : "Go"}
      </button>

      {aiResponse && (
        <div>
          <p><strong>Image Similarity:</strong> {aiResponse.image_similarity}</p>
          <p><strong>Text Similarity:</strong> {aiResponse.text_similarity}</p>
          <p><strong>AI Color Code:</strong> {aiResponse.color}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
