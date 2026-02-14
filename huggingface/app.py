"""
Hugging Face Space - Bone Fracture Detection API
FastAPI backend for YOLO fracture detection model
"""

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import io
import os
from ultralytics import YOLO

app = FastAPI(title="Bone Fracture Detection API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for HF Space
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
print("Loading YOLO model...")
model_path = "model.pt"
model = None
if os.path.exists(model_path):
    model = YOLO(model_path)
    print(f"✅ Model loaded: {model_path}")
else:
    print("❌ Model not found")

@app.get("/")
async def root():
    return {
        "message": "Bone Fracture Detection API",
        "status": "online",
        "docs": "/docs"
    }

@app.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...),
    language: str = Form(default="en")
):
    """
    Analyze X-ray image for bone fractures
    """
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Run inference
        results = model(image, verbose=False)
        
        # Get predictions
        top5_probs = results[0].probs.top5
        top1_index = results[0].probs.top1
        confidence = float(results[0].probs.top1conf)
        
        # Get class name directly from model
        # Use model.names which contains the correct mapping
        class_names = results[0].names
        fracture_type = class_names[top1_index]
        
        # Prepare response
        response = {
            "fractureType": fracture_type,
            "confidence": confidence,
            "status": "ai_confirmed" if confidence > 0.7 else "pending_review",
            "metadata": {
                "provider": "Hugging Face Space",
                "model": "YOLO11x-cls",
                "language": language,
                "all_predictions": {class_names[i]: float(results[0].probs.top5conf[idx]) for idx, i in enumerate(top5_probs)}
            }
        }
        
        return response

    except Exception as e:
        return {
            "error": str(e),
            "fractureType": "error",
            "confidence": 0.0
        }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": "loaded" if model else "failed"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)  # HF Space uses port 7860
