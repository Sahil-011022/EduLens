import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { askGemini } from '../lib/gemini';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hi! I'm your EduLens AI assistant. Ask me about student analytics, learning gaps, attendance, or teaching strategies." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const context = messages.slice(-4).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const response = await askGemini(userMsg, context);
      setMessages(prev => [...prev, { role: 'ai', content: response || "I'm sorry, I couldn't process that." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Which students are most at risk?",
    "How to improve math scores?",
    "What causes absenteeism?",
    "Tips for personalised learning?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-4xl space-y-8"
    >
      <div className="text-center">
        <span className="inline-block rounded-full border border-[#818cf8]/30 bg-[#818cf8]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#818cf8]">
          AI Assistant
        </span>
        <h2 className="mt-4 font-syne text-3xl font-extrabold text-white">Ask About <span className="text-[#38bdf8]">Any Student</span></h2>
        <p className="mt-2 font-instrument text-[#64748b]">Powered by Gemini. Ask about performance, learning gaps, or strategies.</p>
      </div>

      <div className="flex h-[600px] flex-col rounded-3xl border border-white/10 bg-[#0f1a2e] shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={cn(
              "flex gap-4",
              msg.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}>
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                msg.role === 'user' ? "bg-[#38bdf8]/10 text-[#38bdf8]" : "bg-[#818cf8]/10 text-[#818cf8]"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-white" 
                  : "bg-[#0b1220] border border-white/5 text-[#e2e8f0]"
              )}>
                {msg.role === 'ai' && (
                  <div className="mb-2 flex items-center gap-2 font-syne text-[10px] font-bold uppercase tracking-wider text-[#818cf8]">
                    <Sparkles size={12} />
                    EduLens AI
                  </div>
                )}
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#818cf8]/10 text-[#818cf8]">
                <Bot size={20} />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-[#0b1220] p-4">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#64748b]" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#64748b] delay-150" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#64748b] delay-300" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#64748b] transition-all hover:border-[#38bdf8] hover:text-[#38bdf8]"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about students, subjects, or strategies..."
              className="flex-1 rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#38bdf8]"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#38bdf8] text-[#050a12] transition-all hover:scale-105 hover:bg-[#7dd3fc] disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
