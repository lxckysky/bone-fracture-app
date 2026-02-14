from ultralytics import YOLO
import shutil
import os

# Paths
model_path = "backend/models/models.pt"
output_path = "backend/models/models.onnx"
public_dir = "public/models"
public_model_path = os.path.join(public_dir, "model.onnx")

# Ensure public dir exists
os.makedirs(public_dir, exist_ok=True)

try:
    print(f"Loading model from {model_path}...")
    model = YOLO(model_path)
    
    print("Exporting to ONNX...")
    # Export to ONNX - imgsize 224 for classification is standard, opset 12 for web compatibility
    model.export(format="onnx", imgsz=224, opset=12)
    
    # Check if export was successful (it usually saves next to the .pt file)
    if os.path.exists(output_path):
        print(f"Moving {output_path} to {public_model_path}...")
        shutil.move(output_path, public_model_path)
        print("Success! Model is ready for web.")
    else:
        # Sometimes export name might be different
        print("Export finished but checking file location...")
        # fallback check
        base_dir = os.path.dirname(model_path)
        possible_onnx = os.path.join(base_dir, "best.onnx")
        if os.path.exists(possible_onnx):
             shutil.move(possible_onnx, public_model_path)
             print(f"Moved {possible_onnx} to {public_model_path}")
             
except Exception as e:
    print(f"Error during conversion: {e}")
