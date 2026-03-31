from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import os

app = Flask(__name__)

# Load trained model
model = load_model("model/brain_tumor_model.h5")

# Load class indices
with open("model/class_indices.json") as f:
    class_indices = json.load(f)

# Convert index → class name
class_names = {v: k for k, v in class_indices.items()}


# Home Route
@app.route("/")
def home():
    return "Brain Tumor Detection API is running"


# Diagnosis Generator
def generate_report(tumor_type):
    reports = {
        "glioma": {
            "description": "Glioma is a tumor arising from glial cells in the brain.",
            "seriousness": "High",
            "diagnosis": "Immediate neurological consultation recommended."
        },
        "meningioma": {
            "description": "Meningioma is a tumor arising from the meninges.",
            "seriousness": "Medium",
            "diagnosis": "Usually slow-growing. Surgical evaluation advised."
        },
        "pituitary": {
            "description": "Pituitary tumor affects hormone regulation.",
            "seriousness": "Medium",
            "diagnosis": "Hormonal evaluation required."
        },
        "notumor": {
            "description": "No tumor detected in the MRI scan.",
            "seriousness": "None",
            "diagnosis": "Normal brain scan."
        }
    }

    return reports.get(tumor_type, {
        "description": "Unknown condition.",
        "seriousness": "Unknown",
        "diagnosis": "Further medical review required."
    })


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files["file"]
    filepath = "temp.jpg"
    file.save(filepath)

    img = image.load_img(filepath, target_size=(150, 150))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_index = np.argmax(prediction)
    predicted_class = class_names[predicted_index]
    confidence = float(np.max(prediction)) * 100

    os.remove(filepath)

    report = generate_report(predicted_class)

    return jsonify({
        "prediction": predicted_class,
        "confidence": round(confidence, 2),
        "description": report["description"],
        "seriousness": report["seriousness"],
        "diagnosis": report["diagnosis"]
    })


if __name__ == "__main__":
    app.run(debug=True)