"""
PyTorch to TensorFlow.js Conversion Script
Converts models.pt to TensorFlow.js format for browser deployment
"""

import torch
import torch.onnx
import os

# Paths
PYTORCH_MODEL_PATH = r"C:\Users\hp\.gemini\antigravity\playground\infinite-belt\backend\models\models.pt"
ONNX_OUTPUT_PATH = r"C:\Users\hp\Desktop\Bone demo\public\models\fracture_detection\model.onnx"
TFJS_OUTPUT_PATH = r"C:\Users\hp\Desktop\Bone demo\public\models\fracture_detection"

print("Step 1: Loading PyTorch model...")

# Load PyTorch model (Ultralytics YOLO model)
model = torch.load(PYTORCH_MODEL_PATH, map_location='cpu', weights_only=False)

# If model is from Ultralytics, it might be a dict
if isinstance(model, dict):
    if 'model' in model:
        model = model['model']  # Extract model from checkpoint dict
    elif 'ema' in model:
        model = model['ema']  # Some checkpoints use 'ema'

# Set to float for ONNX export
if hasattr(model, 'float'):
    model = model.float()

model.eval()  # Set to evaluation mode

print("Model loaded successfully")
print(f"Model type: {type(model)}")

# Create dummy input (adjust size based on your model)
# Common sizes: 224x224, 640x640 (for YOLO)
print("\nStep 2: Creating dummy input...")

# For YOLO models, typically 640x640
dummy_input = torch.randn(1, 3, 224, 224)  # Batch size 1, 3 channels (RGB), 224x224

print(f"Dummy input shape: {dummy_input.shape}")

print("\nStep 3: Exporting to ONNX...")

# Export to ONNX
torch.onnx.export(
    model,
    dummy_input,
    ONNX_OUTPUT_PATH,
    export_params=True,
    opset_version=11,
    do_constant_folding=True,
    input_names=['input'],
    output_names=['output'],
    dynamic_axes={
        'input': {0: 'batch_size'},
        'output': {0: 'batch_size'}
    }
)

print(f"ONNX model saved to: {ONNX_OUTPUT_PATH}")

print("\n📋 Next steps:")
print("1. Install onnx-tf and tensorflowjs:")
print("   pip install onnx-tf tensorflowjs")
print("\n2. Run conversion:")
print(f"   onnx-tf convert -i {ONNX_OUTPUT_PATH} -o temp_tf_model")
print(f"   tensorflowjs_converter --input_format=tf_saved_model temp_tf_model {TFJS_OUTPUT_PATH}")
print("\n3. Or use the all-in-one script: convert_to_tfjs_step2.py")
