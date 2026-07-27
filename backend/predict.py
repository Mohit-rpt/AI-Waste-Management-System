import numpy as np
import tensorflow as tf
from PIL import Image

# Load model once when the server starts
model = tf.keras.models.load_model("model/waste_classifier.keras")

CLASS_NAMES = [
    "cardboard",
    "glass",
    "metal",
    "paper",
    "plastic",
    "trash"
]


def predict_image(image_file):
    image = Image.open(image_file).convert("RGB")
    image = image.resize((224, 224))

    image_array = np.array(image, dtype=np.float32)
    image_array = np.expand_dims(image_array, axis=0)

    predictions = model.predict(image_array)

    probabilities = tf.nn.softmax(predictions[0]).numpy()

    predicted_index = np.argmax(probabilities)

    return {
        "prediction": CLASS_NAMES[predicted_index],
        "confidence": round(float(probabilities[predicted_index]) * 100, 2)
    }