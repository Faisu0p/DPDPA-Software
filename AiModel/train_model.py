import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint

# Set the path to the training data
train_data_dir = 'AiModel/Uploads'  # Path where your images are uploaded

# Parameters
img_width, img_height = 224, 224  # Image size to be resized to
batch_size = 32
epochs = 10

# Set up data augmentation for training images
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

# Set up validation data generator (you can modify this for validation if needed)
validation_datagen = ImageDataGenerator(rescale=1./255)

# Flow the images from the directory for training
train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=(img_width, img_height),
    batch_size=batch_size,
    class_mode='binary'  # Change to 'categorical' if multi-class classification
)

# Build the CNN model
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(img_width, img_height, 3)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(1, activation='sigmoid'))  # Use softmax if it's a multi-class problem

# Compile the model
model.compile(
    optimizer=Adam(),
    loss='binary_crossentropy',  # Use 'categorical_crossentropy' for multi-class classification
    metrics=['accuracy']
)

# Save the model after each epoch to avoid losing progress
checkpoint = ModelCheckpoint('AiModel/trained_model.h5', save_best_only=True, monitor='val_loss', mode='min')

# Train the model
model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    epochs=epochs,
    callbacks=[checkpoint]
)

# Save the trained model to disk
model.save('AiModel/trained_model.h5')
print("Model training complete and saved as trained_model.h5")
