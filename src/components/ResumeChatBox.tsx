import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const ResumeChatBox = () => {
    const [displayedLines, setDisplayedLines] = useState<any[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // THE SCRIPT: A "Self-Correcting" Financial Agent
    const scriptLines = [
        // 1. SETUP & CONFIG (Shows you understand parameters)
        { text: "agent-cli run --mode autonomous --model gpt-4o --temp 0.1", cmd: true },
        { text: ">> [SYSTEM] Initializing Vector Store (Pinecone env: production)...", color: "text-gray-400" },
        { text: ">> [SYSTEM] Memory buffer loaded. Context window: 128k", color: "text-gray-400" },

        // 2. THE COMPLEX TASK
        { text: ">> [INPUT] User: 'Compare our Q3 revenue growth against competitor X based on recent market data.'", color: "text-white" },

        // 3. REASONING (Chain of Thought)
        { text: ">> [PLANNER] Step 1: Retrieve internal Q3 reports.", color: "text-blue-400" },
        { text: ">> [PLANNER] Step 2: Search web for Competitor X Q3 data.", color: "text-blue-400" },

        // 4. RAG EXECUTION (Shows vector DB skills)
        { text: ">> [RAG] Querying namespace 'financial-docs'...", color: "text-purple-400" },
        { text: "   --> Retrieved 4 chunks. Top cosine_similarity: 0.89", color: "text-gray-500" },

        // 5. THE "PROBLEM" (Evaluation / Guardrails)
        { text: ">> [CRITIC] Evaluating retrieved context...", color: "text-yellow-400" },
        { text: "!! ERROR: Internal data cutoff is Aug 2024. Q3 data missing.", color: "text-red-400" },

        // 6. THE FIX (Tool Use / Orchestration - The "Senior" Skill)
        { text: ">> [ROUTER] Rerouting to 'Financial_API_Tool'...", color: "text-purple-400" },
        { text: ">> [TOOL] Executing GET /api/v1/revenue?ticker=COMP_X", color: "text-gray-300" },
        { text: "   < 200 OK > Data received: $4.2B (+12% YoY)", color: "text-green-500" },

        // 7. FINAL SYNTHESIS
        { text: ">> [LLM] Synthesizing internal + external data...", color: "text-blue-400" },
        { text: ">> [OUTPUT] Report Generated. Audit trail saved to /logs/f8a2.json", color: "text-green-400" },
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayedLines, currentText]);

    useEffect(() => {
        if (currentLineIndex >= scriptLines.length) return;

        const lineData = scriptLines[currentLineIndex];
        const fullText = lineData.text;

        // Typing speed: Fast for logs, slower for "reasoning"
        const typingSpeed = lineData.cmd ? 30 : 10;

        if (currentText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setCurrentText(fullText.slice(0, currentText.length + 1));
            }, typingSpeed + Math.random() * 10);
            return () => clearTimeout(timeout);
        } else {
            // Pause between lines to simulate "processing time"
            const isError = lineData.text.includes("ERROR");
            const isTool = lineData.text.includes("TOOL");
            const pauseTime = isError || isTool ? 800 : 350; // Pause longer on errors/tools

            const pause = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, lineData]);
                setCurrentText("");
                setCurrentLineIndex((prev) => prev + 1);
            }, pauseTime);
            return () => clearTimeout(pause);
        }
    }, [currentText, currentLineIndex]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-sm mx-auto shadow-2xl rounded-lg overflow-hidden bg-[#0d1117] border border-gray-800 font-mono text-xs sm:text-sm h-[550px] flex flex-col relative"
        >
            {/* Window Controls */}
            <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-gray-500 text-xs">agent_orchestrator.py</div>
                <div className="w-8"></div>
            </div>

            {/* Terminal Content */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-1 scrollbar-hide">
                {displayedLines.map((line, index) => (
                    <div key={index} className={`${line.color || 'text-gray-300'} break-words`}>
                        {line.cmd && <span className="text-green-500 font-bold mr-2">➜ ~</span>}
                        {line.text}
                    </div>
                ))}

                {/* Current Typing Line */}
                {currentLineIndex < scriptLines.length && (
                    <div className={`${scriptLines[currentLineIndex].color || 'text-gray-300'} break-words`}>
                        {scriptLines[currentLineIndex].cmd && <span className="text-green-500 font-bold mr-2">➜ ~</span>}
                        {currentText}
                        <span className="animate-pulse inline-block w-2 h-4 bg-gray-500 ml-1 align-middle"></span>
                    </div>
                )}

                {/* Replay Button (Appears when finished) */}
                {currentLineIndex >= scriptLines.length && (
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => {
                                setDisplayedLines([]);
                                setCurrentLineIndex(0);
                                setCurrentText("");
                            }}
                            className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-green-400 border border-gray-800 hover:border-green-900 px-4 py-2 rounded transition-all"
                        >
                            Re-Run Simulation
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
