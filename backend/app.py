
'''
# MVP
import os
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True, host="0.0.0.0", port=5000)

'''
import os
from tarfile import filemode
from flask import Flask, flash, request, redirect, url_for, session
from flask.json import jsonify
from werkzeug.debug import console
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

# logging.basicConfig(level=logging.INFO)

logging.basicConfig(filename='example.log', filemode='w', level=logging.INFO)

logger = logging.getLogger('HELLO WORLD1')


UPLOAD_FOLDER = './'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def hello():
    logger.info(jsonify({"dts": "Hello from Docker!!"}))
    return "Hello from Docker "


@app.route('/upload', methods=['POST'])
def fileUpload():
    print(request)
    target = os.path.join(UPLOAD_FOLDER, 'upload_test1')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    session['uploadFilePath'] = destination
    response = jsonify({'data': 'success, may be :/'})
    return response


if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True, host="0.0.0.0", port=5000)
