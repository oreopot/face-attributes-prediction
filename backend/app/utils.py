
import os
import torch
import torchvision.transforms as transforms
# from models import resnet50
from .models import resnet50
from PIL import Image
from collections import OrderedDict

BASE = os.path.join(os.getcwd(), 'app')
ASSET_PATH = os.path.join(BASE, 'assets')
UPLOAD_FOLDER_PATH = os.path.join(BASE, 'user-uploads')

DEFAULT_WORKERS = 4
OUTPUT_CLASSES = []
IMAGE_WIDTH = 178
IMAGE_HEIGHT = 218
DEVICE = torch.device('cpu')
PATH = os.path.join(ASSET_PATH, 'model_best.pth.tar')
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


def allowed_file(filename):
    # xxx.png
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def loadClasses():
    global OUTPUT_CLASSES
    with open(os.path.join(ASSET_PATH, 'output_classes.txt')) as f:
        text = f.readlines()
    OUTPUT_CLASSES = [c.replace('_', ' ') for c in text[0].split()]


def getTransforms(image_tensor):
    normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
    transformsList = transforms.Compose([
        transforms.Resize((IMAGE_WIDTH, IMAGE_HEIGHT)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        normalize,
    ])

    return transformsList(image_tensor).unsqueeze(0)


def pilLoader(path):
    # open path as file to avoid ResourceWarning (https://github.com/python-pillow/Pillow/issues/835)
    with open(path, 'rb') as f:
        img = Image.open(f)
        return img.convert('RGB')


model_pt = os.path.join(ASSET_PATH, "model.pt")


def removeModuleFromCheckpointStateDict(state_dict):
    """
    Removes the prefix `module` from weight names that gets added by
    torch.nn.DataParallel()
    """
    from collections import OrderedDict
    new_state_dict = OrderedDict()
    for k, v in state_dict.items():
        name = k[7:]  # remove `module.`
        new_state_dict[name] = v
    return new_state_dict


def getModelWeights():
    best_model = torch.load(PATH, map_location=DEVICE)
    return removeModuleFromCheckpointStateDict(best_model['state_dict'])


def getPrediction(imagePath):
    image_array = pilLoader(imagePath)
    transformed_img = getTransforms(image_array)
    image_tensor = transformed_img  # .reshape(-1, IMAGE_WIDTH * IMAGE_HEIGHT)
    output = model(image_tensor)

    # op = np.zeros(40)
    op = list(range(40))

    features = {'present': [], 'absent': []}

    for i in range(0, len(output)):
        val = torch.max(output[i].data[0], 0).indices
        op[i] = val

        if val:
            features["present"].append(str(OUTPUT_CLASSES[i]))
        else:
            features["absent"].append(str(OUTPUT_CLASSES[i]))
    result = {
        'image': imagePath,
        # 'prediction': output,
        'features': features,
    }
    return result


loadClasses()
model = resnet50()
model.load_state_dict(getModelWeights())
model.eval()
