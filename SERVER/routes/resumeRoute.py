from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from controllers.resume_controller import ResumeController

main_blueprint = Blueprint('main', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf'}

@main_blueprint.route('/api/process-resume', methods=['POST'])
def process_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        upload_folder = 'uploads/'
        os.makedirs(upload_folder, exist_ok=True)
        filename = secure_filename(file.filename)
        filepath = os.path.join(upload_folder, filename)
        file.save(filepath)
        
        # Process the resume using controller (includes ATS score now)
        resume_controller = ResumeController()
        result = resume_controller.process_resume(filepath)
        
        if result.get('success'):
            return jsonify(result), 200
        else:
            return jsonify({'error': result.get('error', 'Unknown error')}), 500
    
    return jsonify({'error': 'File type not allowed'}), 400
