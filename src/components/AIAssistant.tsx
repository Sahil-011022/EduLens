import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, Bot, Trash2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserProfile } from '../types';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  user: UserProfile;
}

export default function AIAssistant({ user }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello ${user.displayName.split(' ')[0]}! I'm your EduLens AI Assistant. How can I help you with your ${user.role === 'student' ? 'studies' : 'students'} today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-[calc(100vh-160px)] flex-col gap-6">
      <div className="page-header">
        <h2 className="syne text-3xl font-extrabold text-white">AI Assistant</h2>
        <p className="text-sm text-muted-brand">Powered by Gemini 1.5 Flash · Academic Support</p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a1a2e]/60 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-brand/10">
              <Sparkles className="h-4 w-4 text-blue-brand" />
            </div>
            <div>
              <h3 className="syne text-sm font-bold text-white">EduLens AI</h3>
              <span className="text-[10px] text-mint uppercase tracking-widest">Online</span>
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ role: 'assistant', content: `Chat cleared. How can I help you, ${user.displayName.split(' ')[0]}?` }])}
            className="rounded-lg p-2 text-muted-brand hover:bg-white/5 hover:text-red-brand transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto p-6 scrollbar-hide">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-4", m.role === 'user' ? "flex-row-reverse" : "flex-row")}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                m.role === 'user' ? "bg-blue-brand/20" : "bg-mint/20"
              )}>
                {m.role === 'user' ? <User className="h-4 w-4 text-blue-brand" /> : <Bot className="h-4 w-4 text-mint" />}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl p-4 text-[13px] leading-relaxed",
                m.role === 'user' ? "bg-blue-brand text-white" : "bg-white/5 text-muted-brand"
              )}>
                <div className="markdown-body">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint/20">
                <Bot className="h-4 w-4 text-mint" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-white/5 px-4 py-3">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-mint/40" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-mint/40 [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-mint/40 [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/5 p-6">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about student performance, study plans, or reports..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-6 pr-14 text-[13px] text-white outline-none transition-all focus:border-blue-brand/30 focus:bg-white/[0.08]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-blue-brand p-2.5 text-bg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] text-muted-brand">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
