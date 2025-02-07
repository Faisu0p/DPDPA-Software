from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load the trained model
model = tf.keras.models.load_model("ai_model/best_model.h5")

# Define label encoding
label_encoder = {0: "Off", 1: "On"}

def predict_image(image_path):
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_label_index = np.argmax(predictions)
    predicted_label = label_encoder[predicted_label_index]

    return predicted_label

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join("uploads", file.filename)

    # Save the uploaded file
    os.makedirs("uploads", exist_ok=True)
    file.save(file_path)

    # Get prediction
    result = predict_image(file_path)

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
