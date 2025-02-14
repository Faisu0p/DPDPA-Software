import { useState } from "react";
import { Cpu } from "lucide-react";



const ImageUpload = ({ statusId, actionId, controlId, assetId, onUpload }) => {
  const [loading, setLoading] = useState(false);
  const [colorIndicator, setColorIndicator] = useState("gray"); // Default Grey Circle

  const fetchImagesAndCompare = async () => {
    try {
      setLoading(true);
      setColorIndicator("gray"); // Reset to default before fetching

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
      onUpload(aiResult);

      // Update Color Based on AI Response
      const colorMap = {
        "🔴 Red": "red",
        "🟠 Orange": "orange",
        "🟢 Green": "green",
        "🟢🟢 Dark Green": "darkgreen",
      };

      setColorIndicator(colorMap[aiResult.color] || "gray"); // Default to gray if not found

    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* <button onClick={fetchImagesAndCompare} disabled={loading}>
        {loading ? "Processing..." : "Go"}
      </button> */}

<button
  onClick={fetchImagesAndCompare}
  disabled={loading}
  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition duration-300 disabled:opacity-50"
>
  <Cpu className="w-5 h-5" /> {/* AI icon */}
  {loading ? "Processing..." : "AI"}
</button>


  
      {/* Color Indicator */}
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: colorIndicator === "darkgreen" ? "transparent" : colorIndicator,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: colorIndicator === "darkgreen" ? "2px solid green" : "none",
        }}
      >
        {colorIndicator === "darkgreen" ? "✔️" : ""}
      </div>
  
      {/* Status Text */}
      <span style={{ fontSize: "14px", fontWeight: "bold" }}>
        {colorIndicator === "gray" && "⏳ Not Checked"}
        {colorIndicator === "red" && "❌ Not Matched"}
        {colorIndicator === "orange" && "⚠️ Partial Match"}
        {colorIndicator === "green" && "✅ Similar Match"}
        {colorIndicator === "darkgreen" && "✅ Perfect Match"}
      </span>
    </div>
  );
  
};

export default ImageUpload;
