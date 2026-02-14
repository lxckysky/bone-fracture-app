import onnxruntime as ort
import numpy as np

model_path = "public/models/model.onnx"
try:
    session = ort.InferenceSession(model_path)
    print("MODEL_INFO_START")
    for input in session.get_inputs():
        print(f"Input: {input.name}, Shape: {input.shape}, Type: {input.type}")
    for output in session.get_outputs():
        print(f"Output: {output.name}, Shape: {output.shape}, Type: {output.type}")
    print("MODEL_INFO_END")
except Exception as e:
    print(f"Error: {e}")
