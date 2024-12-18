from flask import Flask, Blueprint, jsonify, request, g
from flask_autoindex import AutoIndex
import os

from flask_cors import CORS



def count_files_in_directories(root_dir):
    # print('count')
    # ret_val = []
    ret_val = dict()
    for dirpath, dirnames, filenames in os.walk(root_dir):
        filenames = [f for f in filenames if f != '.DS_Store']
        # print(filenames)
        file_count = len(filenames)
        # print(f"Directory: {dirpath} - Files: {file_count}")
        if dirpath.count('/') == 2:
            ret_val[dirpath[5:]] = file_count
            # ret_val.append({dirpath: file_count})
        # print(ret_val)
    return ret_val

# Initialize the Flask app
app = Flask(__name__)

CORS(app)


# Set the upload folder and allowed file types
UPLOAD_FOLDER = 'exam/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


'''
http://localhost:8080/upload?subject=a&topic=b
'''
@app.route('/upload', methods=['POST'])
def upload_file():
    
    subject = request.args.get('subject')
    topic = request.args.get('topic')
    
    print(subject, topic)
    num_file = count_files_in_directories('exam/')
    print(num_file)
    
    
    # return 'OK'
    
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    if file and allowed_file(file.filename):
        # filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file_name_in_num = num_file[f'{subject}/{topic}']+1
        print(file_name_in_num)
        filename = os.path.join(app.config['UPLOAD_FOLDER'], f'{subject}/{topic}/{file_name_in_num:03d}.png')
        file.save(filename)
        
        # filename = 'testa'
        return f'File uploaded successfully to {filename}!', 200

    return 'Invalid file type', 400

# Define the base directory where files are stored
BASE_DIRECTORY = os.path.join(app.root_path, 'exam')

# Set the directory to be used by AutoIndex
ppath = BASE_DIRECTORY  # Path to the 'exam' directory

# Create a Blueprint for AutoIndex to mount at '/exam'
exam_blueprint = Blueprint('exam', __name__)

# Initialize AutoIndex for the blueprint with '/exam' as the URL prefix
AutoIndex(exam_blueprint, browse_root=ppath)

# Register the blueprint to mount it at the '/exam' URL path
app.register_blueprint(exam_blueprint, url_prefix='/exam')



        
@app.route('/q')
def num_file():
    # return jsonify(count_files_in_directories('exam/'))
    num_file = count_files_in_directories('exam/')
    return num_file


# Run the application
if __name__ == "__main__":
    # app.run(host='127.0.0.1', port=8080, debug=True)
    app.run(host='0.0.0.0', port=8080, debug=True)
