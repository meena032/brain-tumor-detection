import tensorflow as tf
import numpy as np
from PIL import Image
import sys

# Load model
model = tf.keras.models.load_model("model/brain_tumor_model.h5")

class_names = ["glioma", "meningioma", "notumor", "pituitary"]

def predict_image(image_path):
    image = Image.open(image_path).resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)
    predicted_class = class_names[np.argmax(prediction)]

    print("Prediction:", predicted_class)

if __name__ == "__main__":
    image_path = input("Enter image path: ")
    predict_image(image_path)