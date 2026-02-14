# Model Placeholder

This directory will contain your TensorFlow.js model files.

## How to add your model:

### 1. Convert your Keras/TensorFlow model:

```bash
pip install tensorflowjs

tensorflowjs_converter \
  --input_format keras \
  --output_format tfjs_layers_model \
  path/to/your/model.h5 \
  public/models/fracture_detection
```

### 2. The converter will generate:
- `model.json` - Model architecture
- `group1-shard1of*.bin` - Model weights

### 3. Files should be in this structure:
```
public/models/fracture_detection/
├── model.json
└── group1-shard*.bin files
```

## For testing without a model:

The app will show an error when trying to load the model.
You'll need to either:
1. Add your actual model files here
2. Or modify `lib/client-model.ts` to use a mock/demo model

## Model Requirements:

- **Input:** 224x224x3 RGB image tensor
- **Output:** Fracture detection prediction (adjust `interpretPrediction` method as needed)
- **Format:** TensorFlow.js Layers Model
