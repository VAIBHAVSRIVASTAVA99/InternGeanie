# database/db_connection.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_db_connection():
    """Create a connection to the MongoDB database"""
    try:
        mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
        db_name = os.environ.get('DB_NAME', 'resume_processor_db')
        client = MongoClient(mongo_uri)
        db = client[db_name]
        return db
    except Exception as e:
        raise Exception(f"Database connection error: {str(e)}")

def init_database():
    """Initialize database with required collections and indexes"""
    try:
        db = get_db_connection()

        # Create collections if they don't exist
        if "resumes" not in db.list_collection_names():
            db.create_collection("resumes")

        if "users" not in db.list_collection_names():
            db.create_collection("users")

        # Create useful indexes
        db.resumes.create_index("upload_date")
        db.users.create_index("email", unique=True)

        return True
    except Exception as e:
        raise Exception(f"Database initialization error: {str(e)}")
