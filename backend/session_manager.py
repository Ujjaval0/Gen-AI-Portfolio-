"""
Session Manager
Handles in-memory session storage with ConversationBufferMemory
Sessions are cleared when user refreshes (new session ID generated client-side)
"""
from typing import Dict
from langchain.memory import ConversationBufferMemory
from datetime import datetime, timedelta


class SessionManager:
    """Manages conversation sessions with in-memory storage"""
    
    def __init__(self, session_timeout_minutes: int = 60):
        self.sessions: Dict[str, Dict] = {}
        self.session_timeout = timedelta(minutes=session_timeout_minutes)
    
    def get_or_create_session(self, session_id: str) -> ConversationBufferMemory:
        """Get existing session or create new one"""
        # Clean up old sessions first
        self._cleanup_old_sessions()
        
        if session_id not in self.sessions:
            # Create new session with memory
            memory = ConversationBufferMemory(
                memory_key="chat_history",
                return_messages=True,
                output_key="response"
            )
            self.sessions[session_id] = {
                "memory": memory,
                "created_at": datetime.now(),
                "last_accessed": datetime.now()
            }
        else:
            # Update last accessed time
            self.sessions[session_id]["last_accessed"] = datetime.now()
        
        return self.sessions[session_id]["memory"]
    
    def _cleanup_old_sessions(self):
        """Remove sessions that haven't been accessed recently"""
        current_time = datetime.now()
        expired_sessions = [
            session_id
            for session_id, session_data in self.sessions.items()
            if current_time - session_data["last_accessed"] > self.session_timeout
        ]
        
        for session_id in expired_sessions:
            del self.sessions[session_id]
    
    def get_session_count(self) -> int:
        """Get number of active sessions"""
        return len(self.sessions)
    
    def clear_session(self, session_id: str):
        """Manually clear a specific session"""
        if session_id in self.sessions:
            del self.sessions[session_id]


# Global session manager instance
session_manager = SessionManager()
