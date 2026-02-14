---
title: Bone Fracture Detector
emoji: 🦴
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
---

# Bone Fracture Detection API

AI-powered bone fracture detection using YOLO11x classification model.

## API Endpoints

### POST /analyze
Upload X-ray image for analysis

**Parameters:**
- `file`: Image file (JPEG, PNG)
- `language`: Language code (en, th, zh, ja)

**Response:**
```json
{
  "fractureType": "patella",
  "confidence": 0.95,
  "status": "ai_confirmed",
  "metadata": {
    "provider": "Hugging Face Space",
    "model": "YOLO11x-cls"
  }
}
```

### GET /health
Health check endpoint

## Model

- **Architecture:** YOLO11x Classification
- **Classes:** 13 (normal + 12 fracture types)
- **Input:** 224x224 RGB images
- **Framework:** Ultralytics YOLO

## Usage

```python
import requests

files = {'file': open('xray.jpg', 'rb')}
response = requests.post(
    'https://YOUR_USERNAME-bone-fracture-detector.hf.space/analyze',
    files=files
)
print(response.json())
```

## License

For medical research and educational purposes only.
