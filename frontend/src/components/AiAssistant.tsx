import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';
import { sendChatMessage } from '../services/api';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  standards?: string[];
  timestamp: string;
}

export const AiAssistant: React.FC<{ lang: 'en' | 'hi' }> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: lang === 'hi'
        ? 'नमस्ते! मैं "मानक मित्र" हूँ, आपका बीआईएस विनियामक एआई सहायक। भारतीय मानक, अनिवार्य क्यूसीओ, लैब परीक्षण या प्रमाणन योजनाओं के बारे में कुछ भी पूछें!'
        : 'Welcome! I am "Manak Mitra", your autonomous BIS Regulatory AI Assistant. Ask me about Indian Standards (IS), mandatory QCO orders, test clauses, or the differences between Scheme-I (ISI Mark) and Scheme-II (CRS)!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQueries = [
    "What is the penalty for selling goods without ISI mark under BIS Act?",
    "What is the difference between Scheme-I (ISI Mark) and Scheme-II (CRS)?",
    "What mandatory tests are required for lithium power banks under IS 16046?",
    "Is BIS certification mandatory for packaged drinking water?",
    "What are the safety standards for children electric toys?"
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendChatMessage(text);
      const botMsg: Message = {
        sender: 'assistant',
        text: res.reply,
        standards: res.referenced_standards,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: "I am having trouble connecting to the regulatory intelligence service. Please retry in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <Bot className="w-4 h-4" />
          <span>{lang === 'hi' ? 'मानक मित्र एआई' : 'Manak Mitra AI Regulatory Assistant'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'बीआईएस विनियामक एवं मानक सलाहकार' : 'Autonomous Regulatory Compliance Assistant'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Domain-specialized AI trained on the Bureau of Indian Standards Act 2016, gazette notifications, and conformity rules.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="rounded-2xl bg-[#0e172e] border border-slate-800 shadow-2xl flex flex-col h-[550px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-md">
                  BIS
                </div>
              )}

              <div className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
              }`}>
                <div className="whitespace-pre-line">{m.text}</div>

                {m.standards && m.standards.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-slate-400 font-bold">Referenced Standards:</span>
                    {m.standards.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-amber-400 font-mono text-[10px] border border-slate-800">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className={`text-[9px] mt-1.5 text-right ${m.sender === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center text-xs flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                BIS
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-2 text-xs text-slate-400">
                <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span>Consulting Manak-AI Regulatory Corpus...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Queries Chips */}
        <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none text-[11px]">
          <span className="text-slate-500 flex items-center space-x-1 whitespace-nowrap pl-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Try:</span>
          </span>
          {sampleQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap border border-slate-700/60 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask about BIS Act 2016, clauses, lab test protocols, or exemptions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 disabled:opacity-50 transition"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
