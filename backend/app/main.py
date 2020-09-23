from io import BytesIO

import os
# import numpy as np
from flask import Flask, request
from flask.json import jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from .models import resnet50
from .utils import *
# from models import resnet50
# from utils import *
from pprint import pprint


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


@app.route('/upload', methods=['POST'])
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

    # op = np.zeros(40)
    op = list(range(40))
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
        'not_observed': [str(OUTPUT_CLASSES[i]) for i in features['absent']],
    }
    pprint(res)
    print("=="*52)
    return res


# if __name__ == '__main__':
#     app.secret_key = os.urandom(24)
#     app.run(debug=True, host="0.0.0.0", port=5000)
