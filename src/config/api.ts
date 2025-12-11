// API configuration for production and development
export const API_BASE_URL = import.meta.env.PROD
    ? '/.netlify/functions'  // Production: Use Netlify serverless functions
    : 'http://localhost:8000';  // Development: Use local backend

export const CHAT_ENDPOINT = `${API_BASE_URL}/chat`;
export const HEALTH_ENDPOINT = `${API_BASE_URL}/chat`; // Same endpoint handles health
