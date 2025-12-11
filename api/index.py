"""
Vercel Serverless Function for Resume Chatbot Backend
This wraps the FastAPI app for deployment on Vercel
"""

import sys
import os

# Add the backend directory to the Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, backend_path)

# Import the FastAPI app
from main import app

# Mangum adapter for AWS Lambda/Vercel
from mangum import Mangum

# Create the handler for Vercel
handler = Mangum(app, lifespan="off")
