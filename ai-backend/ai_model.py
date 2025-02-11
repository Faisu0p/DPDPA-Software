import cv2
import pytesseract
import numpy as np
from skimage.metrics import structural_similarity as ssim
from PIL import Image
import io

def preprocess_image(image_bytes):
    """ Convert image to grayscale and apply thresholding """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = np.array(image)
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    return thresh, image  # Return both processed and original images

def compare_images(img1, img2):
    """ Compare two images using SSIM (Structural Similarity Index) """
    img1_resized = cv2.resize(img1, (img2.shape[1], img2.shape[0]))  # Resize to match dimensions
    score, _ = ssim(img1_resized, img2, full=True)
    return score * 100  # Convert to percentage

def extract_text(image):
    """ Extract text using Tesseract OCR """
    return pytesseract.image_to_string(image, lang="eng").strip()

def match_text(master_text, user_text):
    """ Check how much text from user image exists in master image """
    master_words = set(master_text.split())
    user_words = set(user_text.split())

    if not user_words:
        return 0.0  # No text found in user image

    match_percentage = len(user_words & master_words) / len(user_words) * 100  # Percentage match
    return match_percentage
