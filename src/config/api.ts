// API configuration for production and development
// Set VITE_CHAT_API_URL in .env.local to use deployed backend
export const CHAT_ENDPOINT =
    import.meta.env.VITE_CHAT_API_URL ||
    'https://terminal.zeabur.app/chat';

export const HEALTH_ENDPOINT =
    import.meta.env.VITE_HEALTH_API_URL ||
    'https://terminal.zeabur.app/health';
