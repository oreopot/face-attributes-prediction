from io import BytesIO

import os
# import numpy as np
from flask import Flask, request
from flask.json import jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from .utils import *
# from utils import *

app = Flask(__name__)
app.config.update(
    UPLOAD_FOLDER=UPLOAD_FOLDER_PATH,
)

CORS(app)


@app.route('/')
def index():
    return jsonify({'data': 'Hello from Docker 👋'})


@app.route('/upload', methods=['POST'])
def fileUpload():
    if request.method == 'POST':
        # file = request.files['file']
        file = request.files.get('file')
        if file is None or file.filename == "":
            return jsonify({'error': 'no file'})
        if not allowed_file(file.filename):
            return jsonify({'error': 'format not supported'})

        target = os.path.join(UPLOAD_FOLDER_PATH, 'images')

        if not os.path.isdir(target):
            os.makedirs(target)
        try:
            filename = secure_filename(file.filename)
            destination = "/".join([target, filename])
            file.save(destination)
        except:
            return jsonify({'error': "Error during uploading file."})
            # return predict(destination)
        result = predict(destination)
        print(result['image'])
        return jsonify({'data': result['features']})


def predict(imagePath=''):
    result = getPrediction(imagePath)
    return result


# if __name__ == '__main__':
#     app.secret_key = os.urandom(24)
#     app.run(debug=True, host="0.0.0.0", port=5000)
