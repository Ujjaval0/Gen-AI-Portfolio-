"""
Vercel Serverless Function for Resume Chatbot Backend
"""

import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
current_dir = Path(__file__).parent
backend_path = current_dir.parent / 'backend'
sys.path.insert(0, str(backend_path))

# Import the FastAPI app
from main import app

# For Vercel, we need to export the app as 'app'
# Vercel's Python runtime will automatically handle ASGI
__all__ = ['app']
