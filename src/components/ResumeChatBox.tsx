import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CHAT_ENDPOINT } from "@/config/api";

interface Message {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
    tokens?: number;      // Tokens used for this message
    provider?: string;    // Which AI provider responded
}

// Typing Dots Loading Component
const TypingDots = () => (
    <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#fbbf24]"
                animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                }}
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                }}
            />
        ))}
    </div>
);

export function ResumeChatBox() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "system",
            content: "~ Hey! I'm Lando Norris, Ujjaval's AI assistant. Ask me anything about his work!",
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [totalTokens, setTotalTokens] = useState(0);
    const [currentProvider, setCurrentProvider] = useState("");
    const [conversationHistory, setConversationHistory] = useState<
        Array<{ role: string; content: string }>
    >([]);
    const [isTerminalHovered, setIsTerminalHovered] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages]);

    const sendMessage = async (messageText?: string) => {
        const textToSend = messageText || inputMessage.trim();

        if (!textToSend) return;

        // Add user message to UI
        const userMessage: Message = {
            role: "user",
            content: `$ ${textToSend}`,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            // Call backend API with conversation history
            const response = await fetch(CHAT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: textToSend,
                    conversationHistory: conversationHistory  // Send history for context
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response from server");
            }

            const data = await response.json();

            // Update token counter
            setTotalTokens((prev) => prev + (data.tokensUsed || 0));
            setCurrentProvider(data.provider || "");

            // Add assistant message with metadata
            const assistantMessage: Message = {
                role: "assistant",
                content: data.response,
                timestamp: new Date(),
                tokens: data.tokensUsed,
                provider: data.provider,
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // Update conversation history (without terminal prefix)
            setConversationHistory((prev) => [
                ...prev,
                { role: "user", content: textToSend },
                { role: "assistant", content: data.response },
            ]);
        } catch (error) {
            console.error("Chat error:", error);

            // Add error message
            const errorMessage: Message = {
                role: "system",
                content: "[ERROR] Backend not connected\n→ cd backend && pip install -r requirements.txt\n→ Add API keys to .env\n→ uvicorn main:app --reload --port 8000",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onMouseEnter={() => setIsTerminalHovered(true)}
            onMouseLeave={() => setIsTerminalHovered(false)}
            className="w-full max-w-[380px] sm:max-w-[380px] rounded-lg shadow-2xl overflow-hidden border border-[#1a1a1a] bg-gradient-to-b from-[#2d2d2d] to-[#1e1e1e] transition-all duration-300 relative"
            style={{
                cursor: isTerminalHovered ? 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z\' fill=\'%2360a5fa\' stroke=\'%23fbbf24\' stroke-width=\'2\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") 4 4, pointer' : 'default',
                boxShadow: isInputFocused ? '0 0 30px rgba(96, 165, 250, 0.3)' : undefined,
            }}
        >
            {/* macOS Window Header with Traffic Lights */}
            <div className="bg-[#2d2d2d] px-3 py-2.5 flex items-center gap-2 border-b border-[#1a1a1a]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff6b63] transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffc943] transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#36d34f] transition-colors cursor-pointer" />
                </div>
            </div>

            {/* Token Counter Header */}
            {totalTokens > 0 && (
                <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#1a1a1a]">
                    <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#fbbf24] flex items-center gap-2">
                            ⚡ Tokens Used:
                            <span className="font-bold text-[#22c55e]">
                                {totalTokens.toLocaleString()}
                            </span>
                        </span>
                        {currentProvider && (
                            <span className="text-[#60a5fa] text-[10px]">{currentProvider}</span>
                        )}
                    </div>
                </div>
            )}


            {/* Terminal Messages */}
            <ScrollArea ref={scrollAreaRef} className="h-[420px] bg-[#1e1e1e]">
                <div className="p-4 space-y-2 font-mono text-xs">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                                delay: index === messages.length - 1 ? 0.1 : 0
                            }}
                            className="leading-relaxed"
                        >
                            {message.role === "system" && (
                                <div className="text-[#22c55e]">{message.content}</div>
                            )}

                            {message.role === "user" && (
                                <div className="text-[#60a5fa] font-semibold">{message.content}</div>
                            )}

                            {message.role === "assistant" && (
                                <div className="space-y-1">
                                    <div className="text-[#e5e7eb] whitespace-pre-wrap pl-2 border-l-2 border-[#374151]">
                                        {message.content}
                                    </div>
                                    {message.tokens && message.tokens > 0 && (
                                        <div className="text-[#9ca3af] text-[10px] pl-2">
                                            +{message.tokens.toLocaleString()} tokens {message.provider && `• ${message.provider}`}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* Loading indicator with typing dots */}
                    <AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="flex items-center gap-3 text-[#fbbf24] pl-2"
                            >
                                <TypingDots />
                                <motion.span
                                    className="text-xs"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Thinking...
                                </motion.span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ScrollArea>

            {/* Terminal Input */}
            <div className="bg-[#1a1a1a] px-4 py-3 border-t border-[#2d2d2d]">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-[#22c55e] font-mono text-sm font-bold">$</span>
                    <input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder="type your question..."
                        disabled={isLoading}
                        className="flex-1 bg-transparent text-[#e5e7eb] font-mono text-xs outline-none placeholder:text-[#6b7280]"
                        autoComplete="off"
                        style={{
                            caretColor: '#22c55e',
                        }}
                    />
                </form>
            </div>
        </motion.div>
    );
}
