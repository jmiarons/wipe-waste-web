import tensorflow as tf
from keras.models import load_model
import numpy as np
from fastapi import FastAPI, File
from PIL import Image
import io

model = load_model('./trained_model/model.h5')
classes = ['Aluminium', 'Carton', 'Glass', 'Organic Waste', 'Other Plastics', 'Paper and Cardboard', 'Plastic', 'Textiles', 'Wood']

app = FastAPI()

@app.post("/tagImage")
async def UploadImage(file: bytes = File(...)):
    img = Image.open(io.BytesIO(file)).resize((256,256))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) 

    predictions = model.predict(img_array)

    return {'trashType':classes[np.argmax(predictions)], 'confidence':f"{predictions[0][np.argmax(predictions)]*100}"}