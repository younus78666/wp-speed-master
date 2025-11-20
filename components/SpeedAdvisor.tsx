import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const SpeedAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      content: "Hi! I'm your Speed Strategy Advisor. Ask me anything about your slow WordPress site, Core Web Vitals, or plugins."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare history for context, excluding system messages if we had them in UI
      const history = messages.map(m => ({ role: m.role as 'user' | 'model', content: m.content }));
      history.push({ role: 'user', content: userMessage.content });

      const responseText = await sendMessageToGemini(userMessage.content, history);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Sorry, I couldn't connect to the server. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="advisor" className="py-20 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-4">
             <Sparkles className="w-4 h-4 mr-2" />
             <span>Powered by Gemini 2.5</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">AI Speed Strategy Advisor</h2>
          <p className="text-slate-400">Not sure why your site is slow? Ask the AI expert for a quick diagnostic.</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-slate-700' : 'bg-speed'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-slate-300" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-700 text-white rounded-tr-none' 
                    : 'bg-slate-900 text-slate-300 rounded-tl-none border border-slate-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-speed flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                 </div>
                 <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl rounded-tl-none border border-slate-800">
                    <Loader2 className="w-5 h-5 animate-spin text-speed" />
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-slate-700">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 'Why is my LCP so high on mobile?'"
                className="w-full bg-slate-800 text-white rounded-xl py-4 pl-4 pr-12 border border-slate-700 focus:border-speed focus:ring-1 focus:ring-speed outline-none transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 p-2 bg-speed text-white rounded-lg hover:bg-speed-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-600 uppercase tracking-wider">
                AI responses are simulated based on best practices.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeedAdvisor;