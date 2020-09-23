from io import BytesIO

import os
import numpy as np
from PIL.Image import Image
from flask import Flask, flash, request, redirect, url_for, session, jsonify
# from flask.json import jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from .models import resnet50
from .utils import *

from pprint import pprint


UPLOAD_FOLDER_PATH = os.path.join('.', 'user-uploads')
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config.update(
    # TESTING=True,
    # DEBUG=True,
    UPLOAD_FOLDER=UPLOAD_FOLDER_PATH,
)

CORS(app)


res50 = resnet50()
res50.load_state_dict(getModelWeights())
res50.eval()


@app.route('/')
def index():
    return jsonify({'data': 'Hello from Docker 👋'})


@app.route('/api/upload', methods=['POST'])
def fileUpload():
    print(request)
    target = os.path.join(UPLOAD_FOLDER_PATH, 'images')
    target = UPLOAD_FOLDER_PATH
    if not os.path.isdir(target):
        os.makedirs(target)

    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    # return predict(destination)
    response = jsonify({'data': 'success, may be 🎉🥳  :/'})
    return response


def predict(imagePath=''):

    input = pilLoader(imagePath)

    output = res50(input)

    op = np.zeros(40)
    features = {'present': [], 'absent': []}

    for i in range(0, len(output)):
        val = torch.max(output[i].data[0], 0).indices
        op[i] = val

        if val:
            features["present"].append(i)
        else:
            features["absent"].append(i)

    pil_im = Image.open(imagePath, 'r')
    res = {
        'image': imagePath,
        'prediction': output,
        'features_observed': [str(OUTPUT_CLASSES[i]) for i in features['present']],
        'not_observed': [str(OUTPUT_CLASSESt[i]) for i in features['absent']],
    }
    pprint(res)
    print("=="*52)
    return res
