import React, { useState } from "react";
import { Upload } from "lucide-react";

const actions = Array.from({ length: 172 }, (_, i) => `Action ${i + 1}`);

function MasterImages() {
  const [images, setImages] = useState({});
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event, action) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prevImages) => ({
          ...prevImages,
          [action]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload Images for Actions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actions.map((action) => (
          <div key={action} className="p-4 border rounded-lg shadow-md text-center">
            <p className="mb-2 font-medium">{action}</p>
            <label className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              <Upload className="inline-block mr-2" size={16} /> Upload
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, action)} className="hidden" />
            </label>
            {images[action] && (
              <>
                <img
                  src={images[action]}
                  alt={action}
                  className="mt-4 w-full h-32 object-cover rounded-md cursor-pointer"
                  onClick={() => setPreview(images[action])}
                />
                {preview && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={() => setPreview(null)}>
                    <img src={preview} alt="Preview" className="w-auto h-auto max-w-full max-h-full rounded-lg" />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasterImages;
