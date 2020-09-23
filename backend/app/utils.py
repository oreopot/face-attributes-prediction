
import os
import torch
import torchvision.transforms as transforms
from PIL.Image import Image
from collections import OrderedDict

BASE = os.path.join(os.getcwd(), 'app')
ASSET_PATH = os.path.join(BASE, 'assets')
UPLOAD_FOLDER_PATH = os.path.join(BASE, 'user-uploads')

DEFAULT_WORKERS = 4
OUTPUT_CLASSES = []
IMAGE_WIDTH = 178
IMAGE_HEIGHT = 218


def loadClasses():
    global OUTPUT_CLASSES
    with open('./output_classes.txt') as f:
        text = f.readlines()
    OUTPUT_CLASSES = [c.replace('_', ' ') for c in text[0].split()]


def getTransforms():
    normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
    return transforms.Compose([
        transforms.Resize((IMAGE_WIDTH, IMAGE_HEIGHT)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        normalize,
    ])


def pilLoader(path):
    # open path as file to avoid ResourceWarning (https://github.com/python-pillow/Pillow/issues/835)
    with open(path, 'rb') as f:
        img = Image.open(f)
        return img.convert('RGB')


def getModelWeights():
    PATH = os.path.join(ASSET_PATH, 'model_best.pth.tar')
    model = torch.load(PATH, map_location=torch.device('cpu'))
    state_dict = model['state_dict']
    # create new OrderedDict that does not contain `module.`
    new_state_dict = OrderedDict()
    for k, v in state_dict.items():
        name = k[7:]  # remove `module.`
        new_state_dict[name] = v

    return new_state_dict
