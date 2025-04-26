from functools import wraps
from flask import request, jsonify,g
import jwt
import os

JWT_SECRET = os.getenv("JWT_SECRET", "your_fallback_secret")
JWT_ALGORITHM = "HS256"

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'User is Unauthorized'}), 401

        try:
            token = token.split(" ")[1]  # Remove "Bearer"
            decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            g.user = decoded  # Optional: attach user info
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        return f(*args, **kwargs)
    return decorated_function
