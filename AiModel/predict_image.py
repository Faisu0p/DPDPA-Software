import sys
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# Get the image path from the command line argument
image_path = sys.argv[1]

# Ensure the image exists
if not os.path.exists(image_path):
    print("Image not found.")
    sys.exit(1)

# Load the trained model (replace with the actual path to your trained model)
model = load_model('path_to_your_trained_model.h5')

# Load the image and preprocess it (ensure you match the model's input size)
img = image.load_img(image_path, target_size=(224, 224))  # Adjust to your model's expected input
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
img_array = img_array / 255.0  # Normalize if necessary

# Make prediction
prediction = model.predict(img_array)

# Output the prediction result
# Assuming a classification task, you may want to map prediction to class labels
# For example, if it's a binary classification task:
if prediction[0] > 0.5:
    print("Class 1 (positive)")
else:
    print("Class 0 (negative)")

# For multi-class classification, you could use:
# predicted_class = np.argmax(prediction, axis=1)
# print(f"Predicted class: {predicted_class[0]}")

