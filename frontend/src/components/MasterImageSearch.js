import React, { useState, useEffect } from "react";
import axios from "axios";

const MasterImageSearch = ({ rowId }) => {
  const [masterImage, setMasterImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (rowId) {
      handleSearch();
    }
  }, [rowId]); // Auto-fetch when rowId changes

  const handleSearch = async () => {
    if (!rowId) {
      setError("Invalid Row ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8021/api/v1/master-image/get-by-status/${rowId}`
      );
      setMasterImage(response.data.masterImage);
    } catch (err) {
      setMasterImage(null);
      setError("Master Image not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <button
        onClick={handleSearch}
        className={`w-full p-2 text-white rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : masterImage
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!masterImage || loading}
      >
        {loading ? "Searching..." : "View Image"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {masterImage && (
        <div className="mt-2">
          <img
            src={masterImage.fileUrl}
            alt="Master Image"
            className="w-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default MasterImageSearch;
