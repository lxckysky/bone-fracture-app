"""
ONNX to TensorFlow.js Conversion Script (Step 2)
Converts ONNX model to TensorFlow.js format
"""

import subprocess
import os
import shutil

ONNX_PATH = r"C:\Users\hp\Desktop\Bone demo\public\models\fracture_detection\model.onnx"
TEMP_TF_PATH = r"C:\Users\hp\Desktop\Bone demo\temp_tf_model"
TFJS_OUTPUT = r"C:\Users\hp\Desktop\Bone demo\public\models\fracture_detection"

print("🔄 Converting ONNX to TensorFlow SavedModel...")

# Convert ONNX to TensorFlow SavedModel
cmd1 = f'onnx-tf convert -i "{ONNX_PATH}" -o "{TEMP_TF_PATH}"'
result = subprocess.run(cmd1, shell=True, capture_output=True, text=True)

if result.returncode != 0:
    print(f"❌ Error: {result.stderr}")
    exit(1)

print("✅ ONNX → TensorFlow conversion successful")

print("\n🔄 Converting TensorFlow to TensorFlow.js...")

# Convert TensorFlow SavedModel to TensorFlow.js
cmd2 = f'tensorflowjs_converter --input_format=tf_saved_model "{TEMP_TF_PATH}" "{TFJS_OUTPUT}"'
result = subprocess.run(cmd2, shell=True, capture_output=True, text=True)

if result.returncode != 0:
    print(f"❌ Error: {result.stderr}")
    exit(1)

print("✅ TensorFlow → TensorFlow.js conversion successful")

# Clean up temp directory
if os.path.exists(TEMP_TF_PATH):
    shutil.rmtree(TEMP_TF_PATH)
    print("\n🧹 Cleaned up temporary files")

print("\n✅ Conversion complete!")
print(f"Model files saved to: {TFJS_OUTPUT}")
print("\nYou should now see:")
print("  - model.json")
print("  - group1-shard*.bin files")
