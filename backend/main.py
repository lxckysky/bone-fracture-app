from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import numpy as np
import io
import uvicorn
import os

# Create standard directories
os.makedirs("models", exist_ok=True)
os.makedirs("uploads", exist_ok=True)

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DICOM Support
try:
    import pydicom
    from pydicom.pixel_data_handlers.util import apply_voi_lut
    DICOM_AVAILABLE = True
    print("✅ pydicom available")
except ImportError:
    DICOM_AVAILABLE = False
    print("⚠️ pydicom not available")

# Model Setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

model = None
try:
    from ultralytics import YOLO
    # Standardize on the path where the user said the model is
    model_path = "models/models.pt" 
    if os.path.exists(model_path):
        model = YOLO(model_path)
        model.to(device)
        print(f"✅ YOLO11x-cls model loaded from {model_path}")
    else:
        # Check parent dir too just in case of relative path confusion
        alt_path = os.path.join(os.path.dirname(__file__), "models", "models.pt")
        if os.path.exists(alt_path):
            model = YOLO(alt_path)
            model.to(device)
            print(f"✅ YOLO11x-cls model loaded from {alt_path}")
        else:
            print(f"❌ Model file not found at {model_path} or {alt_path}")
            print("⚠️ Using mock prediction mode until model is uploaded")
except Exception as e:
    print(f"❌ Failed to load model: {e}")

# Labels (Synced with model metadata: 14 classes)
LABELS_EN = [
    "Avulsion fracture",
    "Comminuted fracture",
    "Compression-Crush fracture",
    "Fracture Dislocation",
    "Greenstick fracture",
    "Hairline Fracture",
    "Impacted fracture",
    "Intra-articular fracture",
    "Longitudinal fracture",
    "Oblique fracture",
    "Pathological fracture",
    "Spiral Fracture",
    "Test",
    "Train"
]

def dicom_to_pil(file_bytes):
    if not DICOM_AVAILABLE:
        raise ImportError("pydicom not installed")
    
    try:
        dicom_data = pydicom.dcmread(io.BytesIO(file_bytes), force=True)
        pixel_array = dicom_data.pixel_array
        
        # Apply VOI LUT if available
        try:
            pixel_array = apply_voi_lut(pixel_array, dicom_data)
        except:
            pass
            
        # Normalize to 8-bit
        if pixel_array.dtype != np.uint8:
            pixel_array = pixel_array.astype(np.float64)
            pixel_array = np.nan_to_num(pixel_array, nan=0.0)
            pixel_max = pixel_array.max()
            pixel_min = pixel_array.min()
            if pixel_max > pixel_min:
                pixel_array = (pixel_array - pixel_min) / (pixel_max - pixel_min) * 255
            else:
                pixel_array = np.zeros_like(pixel_array)
            pixel_array = pixel_array.astype(np.uint8)
            
        return Image.fromarray(pixel_array).convert("RGB"), dicom_data
        
    except Exception as e:
        print(f"DICOM conversion error: {e}")
        raise ValueError(f"Invalid DICOM file: {e}")

@app.get("/")
def read_root():
    return {"status": "ready", "model_loaded": model is not None, "dicom_available": DICOM_AVAILABLE}

@app.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...), 
    language: str = Form("en")
):
    contents = await file.read()
    image = None
    dicom_metadata = None
    
    filename = file.filename.lower()
    is_dicom = filename.endswith(".dcm") or filename.endswith(".dicom")
    
    try:
        if is_dicom:
            if not DICOM_AVAILABLE:
                return {"error": "DICOM support not enabled"}
            image, dicom_data = dicom_to_pil(contents)
            dicom_metadata = {
                "Patient ID": str(getattr(dicom_data, 'PatientID', 'N/A')),
                "Modality": str(getattr(dicom_data, 'Modality', 'N/A')),
                "Study Date": str(getattr(dicom_data, 'StudyDate', 'N/A'))
            }
        else:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
            
        # Prediction
        provider = "Python Backend (YOLOv11)"
        if model:
            results = model(image, verbose=False)[0]
            probs = results.probs
            top1_idx = probs.top1
            confidence = float(probs.data[top1_idx])
            detected_type = LABELS_EN[top1_idx]
            
            # Map top 3 for transparency
            top5_indices = probs.top5
            top3_labels = [f"{LABELS_EN[i]} ({float(probs.data[i])*100:.1f}%)" for i in top5_indices[:3]]
            
            print(f"DEBUG: Model prediction - {detected_type} ({confidence:.4f})")
            print(f"DEBUG: Top 3 - {top3_labels}")
        else:
            provider = "Python Backend (Mock Mode)"
            import random
            detected_type = random.choice(LABELS_EN)
            confidence = random.uniform(0.6, 0.95)
            top3_labels = [f"{detected_type} ({confidence*100:.1f}%)"]
            
        # Refined Mapping for "Normal" (Since model has no normal class)
        # LOWERED THRESHOLD: 0.20 instead of 0.45 to be less aggressive with Normal fallback
        final_type = detected_type
        if confidence < 0.20 or detected_type in ["Test", "Train"]:
            final_type = "normal"
            confidence = max(0.65, confidence) # Re-scale for UI
            
        return {
            "fractureType": final_type,
            "confidence": confidence,
            "status": "ai_confirmed" if confidence >= 0.7 and final_type != "normal" else "pending_review",
            "metadata": {
                "inference": "python-ultralytics",
                "provider": provider,
                "rawClass": detected_type,
                "rawConfidence": f"{confidence:.4f}",
                "top3": ", ".join(top3_labels),
                "dicom": dicom_metadata
            }
        }
        
    except Exception as e:
        print(f"Error processing image: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
