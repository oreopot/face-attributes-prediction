from io import BytesIO
import os
from PIL.Image import Image
from flask import Flask, flash, request, redirect, url_for, session
from flask.json import jsonify
import numpy as np
from werkzeug.debug import console
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
from collections import OrderedDict
from models import resnet50
import torch
import torch.nn as nn
import torch.nn.parallel
import torch.backends.cudnn as cudnn
import torch.distributed as dist
import torch.optim
import torch.utils.data
import torch.utils.data.distributed
import torchvision.transforms as transforms
import torchvision.datasets as datasets

from math import cos, pi
from pprint import pprint

logging.basicConfig(filename='example.log', filemode='w', level=logging.INFO)

logger = logging.getLogger('HELLO WORLD1')

BASE = os.getcwd()
ASSET_PATH = os.path.join(BASE, 'assets')
DEFAULT_WORKERS = 4
OUTPUT_CLASSES = []
IMAGE_WIDTH = 178
IMAGE_HEIGHT = 218

UPLOAD_FOLDER = './user-uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
res50 = resnet50()

app = Flask(__name__)
# app.config.update(
#     {
#         TESTING: True,

#     }

# )
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index():
    return jsonify({'data': 'Hello from Docker 👋'})


@app.route('/upload', methods=['POST'])
def fileUpload():
    print(request)
    # target = os.path.join(UPLOAD_FOLDER, 'images')
    target = UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    # return predict(destination)
    response = jsonify({'data': 'success, may be 🎉🥳  :/'})
    return response


def loadClasses():
    global OUTPUT_CLASSES
    with open('./output_classes.txt') as f:
        text = f.readlines()
    OUTPUT_CLASSES = [c.replace('_', ' ') for c in text[0].split()]


def loadModelWeights():
    global res50
    PATH = os.path.join(ASSET_PATH, 'model_best.pth.tar')
    model = torch.load(PATH, map_location=torch.device('cpu'))

    state_dict = model['state_dict']

    # create new OrderedDict that does not contain `module.`
    new_state_dict = OrderedDict()
    for k, v in state_dict.items():
        name = k[7:]  # remove `module.`
        new_state_dict[name] = v

    return new_state_dict


res50.load_state_dict(loadModelWeights())


def getTransforms():
    normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
    return transforms.Compose([
        transforms.Resize((IMAGE_WIDTH, IMAGE_HEIGHT)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        normalize,
    ])


def pil_loader(path):
    # open path as file to avoid ResourceWarning (https://github.com/python-pillow/Pillow/issues/835)
    with open(path, 'rb') as f:
        img = Image.open(f)
        return img.convert('RGB')


def predict(imagePath=''):
    global res50
    res50.eval()
    input = pil_loader(imagePath)

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
