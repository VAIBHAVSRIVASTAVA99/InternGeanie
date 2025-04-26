# app.py
from flask import Flask
from flask_cors import CORS
import os
from routes.internship_routes import internship_blueprint
from routes.auth import auth_blueprint
from routes.resumeRoute import main_blueprint
from routes.linkedin_routes import linkedin_bp
from controllers.unstop_controller import scraper_bp
from routes.internshala_routes import internshala_bp
from views.api import internship_blueprint as api_internship_blueprint

def create_app():
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = 'uploads/'
    app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    cors_options = {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
        "supports_credentials": True
    }

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    # Register blueprints
    app.register_blueprint(main_blueprint)
    app.register_blueprint(internship_blueprint, url_prefix='/api/internships')
    app.register_blueprint(auth_blueprint, url_prefix='/user')
    app.register_blueprint(linkedin_bp)
    app.register_blueprint(internshala_bp)
    app.register_blueprint(scraper_bp, url_prefix='/api/v1')
    app.register_blueprint(api_internship_blueprint, url_prefix='/api/v1/internships')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)