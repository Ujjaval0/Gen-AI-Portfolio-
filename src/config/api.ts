// Central API Configuration
// Best Practice: Set VITE_API_URL in your Vercel/Netlify environment variables.

// 1. Determine the Base URL (Priority: Env Var > Hardcoded Production URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://terminal.zeabur.app';

// 2. Export Helper Endpoints
export const CHAT_ENDPOINT = `${API_BASE_URL}/chat`;
export const HEALTH_ENDPOINT = `${API_BASE_URL}/health`;
