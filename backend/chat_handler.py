"""
Chat Handler
Processes chat requests using LangChain with Groq primary and OpenRouter fallback
"""
from typing import Dict, Any, Optional
from langchain.chains.conversation.base import ConversationChain
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage
from session_manager import session_manager
from llm_config import (
    get_groq_llm,
    get_openrouter_llm,
    RESUME_CONTEXT,
)


def create_conversation_chain(llm, memory):
    """Create a conversation chain with the given LLM and memory"""
    prompt = ChatPromptTemplate.from_messages([
        ("system", RESUME_CONTEXT),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}")
    ])
    
    chain = ConversationChain(
        llm=llm,
        memory=memory,
        prompt=prompt,
        verbose=False
    )
    
    return chain


async def process_chat_message(
    message: str,
    session_id: str
) -> Dict[str, Any]:
    """
    Process a chat message with Groq primary and OpenRouter fallback
    
    Args:
        message: User's message
        session_id: Session identifier
    
    Returns:
        Dict with response, provider, and token count
    """
    # Get or create session memory
    memory = session_manager.get_or_create_session(session_id)
    
    # Try Groq first (primary)
    groq_llm = get_groq_llm()
    if groq_llm:
        try:
            chain = create_conversation_chain(groq_llm, memory)
            response = await chain.ainvoke({"input": message})
            
            # ConversationChain returns dict with 'response' key
            response_text = response.get("response", response.get("output", str(response)))
            
            # Extract token usage from response metadata if available
            tokens_used = 0
            if isinstance(response, dict) and "response_metadata" in response:
                usage = response.get("response_metadata", {}).get("token_usage", {})
                tokens_used = usage.get("total_tokens", 0)
            
            return {
                "response": response_text,
                "provider": "Groq",
                "tokensUsed": tokens_used,
                "sessionId": session_id
            }
        except Exception as e:
            import traceback
            print(f"Groq error: {e}")
            print(f"Groq error type: {type(e)}")
            print(f"Groq traceback: {traceback.format_exc()}")
            # Continue to fallback
    
    # Try OpenRouter (fallback)
    openrouter_llm = get_openrouter_llm()
    if openrouter_llm:
        try:
            chain = create_conversation_chain(openrouter_llm, memory)
            response = await chain.ainvoke({"input": message})
            
            # ConversationChain returns dict with 'response' key
            response_text = response.get("response", response.get("output", str(response)))
            
            # Extract token usage
            tokens_used = 0
            if isinstance(response, dict) and "response_metadata" in response:
                usage = response.get("response_metadata", {}).get("token_usage", {})
                tokens_used = usage.get("total_tokens", 0)
            
            return {
                "response": response_text,
                "provider": "OpenRouter",
                "tokensUsed": tokens_used,
                "sessionId": session_id
            }
        except Exception as e:
            print(f"OpenRouter error: {e}")
    
    # Both failed - return static fallback
    return {
        "response": "I'm Ujjaval's AI assistant! I'd love to tell you about his AI engineering work, but I'm having trouble connecting right now. Please try again in a moment!",
        "provider": "fallback",
        "tokensUsed": 0,
        "sessionId": session_id
    }


def get_session_stats() -> Dict[str, int]:
    """Get statistics about active sessions"""
    return {
        "active_sessions": session_manager.get_session_count()
    }
