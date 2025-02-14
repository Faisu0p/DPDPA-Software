# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# from ai_model import preprocess_image, compare_images, extract_text, match_text

# app = FastAPI()

# @app.post("/process-image/")
# async def process_image(master_files: list[UploadFile], user_file: UploadFile):
#     master_images = []
#     master_texts = []

#     for master_file in master_files:
#         master_bytes = await master_file.read()
#         master_thresh, _ = preprocess_image(master_bytes)
#         master_images.append(master_thresh)
#         master_texts.append(extract_text(master_thresh))

#     user_bytes = await user_file.read()
#     user_thresh, user_original = preprocess_image(user_bytes)
#     user_text = extract_text(user_thresh)

#     best_match = None
#     best_score = 0

#     for i, master_thresh in enumerate(master_images):
#         score = compare_images(master_thresh, user_thresh)
#         if score > best_score:
#             best_score = score
#             best_match = i

#     if best_score < 50:
#         return JSONResponse(content={"message": "❌ No matching master image found!", "color": "🔴 Red"}, status_code=200)

#     # Text similarity check
#     text_similarity = match_text(master_texts[best_match], user_text)

#     # Color Code
#     if text_similarity < 60:
#         color = "🔴 Red"
#     elif text_similarity < 81:
#         color = "🟠 Orange"
#     elif text_similarity < 96:
#         color = "🟢 Green"
#     else:
#         color = "🟢🟢 Dark Green"

#     return JSONResponse(content={
#         "best_match": best_match,
#         "image_similarity": f"{best_score:.2f}%",
#         "text_similarity": f"{text_similarity:.2f}%",
#         "color": color,
#         "master_text": master_texts[best_match],
#         "user_text": user_text
#     })

# # Run server: uvicorn main:app --host 0.0.0.0 --port 8000 --reload


from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from ai_model import preprocess_image, compare_images, extract_text, match_text
from typing import List  # Import List for type hinting

app = FastAPI()

@app.post("/process-image/")
async def process_image(
    master_files: List[UploadFile] = File(...),  # List of master images
    user_file: UploadFile = File(...)           # Single user image
):
    master_images = []
    master_texts = []

    for master_file in master_files:
        master_bytes = await master_file.read()
        master_thresh, _ = preprocess_image(master_bytes)
        master_images.append(master_thresh)
        master_texts.append(extract_text(master_thresh))

    user_bytes = await user_file.read()
    user_thresh, user_original = preprocess_image(user_bytes)
    user_text = extract_text(user_thresh)

    best_match = None
    best_score = 0

    for i, master_thresh in enumerate(master_images):
        score = compare_images(master_thresh, user_thresh)
        if score > best_score:
            best_score = score
            best_match = i

    if best_score < 50:
        return JSONResponse(content={"message": "❌ No matching master image found!", "color": "🔴 Red"}, status_code=200)

    # Text similarity check
    text_similarity = match_text(master_texts[best_match], user_text)

    # Color Code
    if text_similarity < 60:
        color = "🔴 Red"
    elif text_similarity < 81:
        color = "🟠 Orange"
    elif text_similarity < 96:
        color = "🟢 Green"
    else:
        color = "🟢🟢 Dark Green"

    return JSONResponse(content={
        "best_match": best_match,
        "image_similarity": f"{best_score:.2f}%",
        "text_similarity": f"{text_similarity:.2f}%",
        "color": color,
        "master_text": master_texts[best_match],
        "user_text": user_text
    })

# Run server: uvicorn main:app --host 0.0.0.0 --port 8021 --reload
