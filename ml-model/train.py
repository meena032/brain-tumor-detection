# import tensorflow as tf
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras import layers, models
# import os

# IMG_SIZE = 224
# BATCH_SIZE = 32

# train_dir = "train"

# # Data generator
# train_datagen = ImageDataGenerator(
#     rescale=1./255,
#     validation_split=0.2
# )

# train_data = train_datagen.flow_from_directory(
#     train_dir,
#     target_size=(IMG_SIZE, IMG_SIZE),
#     batch_size=BATCH_SIZE,
#     class_mode='categorical',
#     subset='training'
# )

# val_data = train_datagen.flow_from_directory(
#     train_dir,
#     target_size=(IMG_SIZE, IMG_SIZE),
#     batch_size=BATCH_SIZE,
#     class_mode='categorical',
#     subset='validation'
# )

# # Simple CNN Model
# model = models.Sequential([
#     layers.Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),
#     layers.MaxPooling2D(2,2),

#     layers.Conv2D(64, (3,3), activation='relu'),
#     layers.MaxPooling2D(2,2),

#     layers.Flatten(),
#     layers.Dense(128, activation='relu'),
#     layers.Dense(4, activation='softmax')
# ])

# model.compile(
#     optimizer='adam',
#     loss='categorical_crossentropy',
#     metrics=['accuracy']
# )

# model.fit(
#     train_data,
#     validation_data=val_data,
#     epochs=5
# )

# # Save model
# os.makedirs("model", exist_ok=True)
# model.save("model/brain_tumor_model.h5")

# print("Model trained and saved successfully!")



import os
import json
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

# Paths
train_dir = "train"
val_dir = "test"

# Image preprocessing
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=15,
    zoom_range=0.1,
    horizontal_flip=True
)

val_datagen = ImageDataGenerator(rescale=1./255)

train_data = train_datagen.flow_from_directory(
    train_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode="categorical"
)

val_data = val_datagen.flow_from_directory(
    val_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode="categorical"
)

# Model
model = Sequential([
    Conv2D(32, (3,3), activation="relu", input_shape=(150,150,3)),
    MaxPooling2D(2,2),

    Conv2D(64, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    Conv2D(128, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    Flatten(),
    Dense(128, activation="relu"),
    Dropout(0.5),
    Dense(train_data.num_classes, activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

model.fit(
    train_data,
    validation_data=val_data,
    epochs=15
)

# Save model
os.makedirs("model", exist_ok=True)
model.save("model/brain_tumor_model.h5")

# Save class indices permanently
with open("model/class_indices.json", "w") as f:
    json.dump(train_data.class_indices, f)

print("Model trained and saved successfully!")