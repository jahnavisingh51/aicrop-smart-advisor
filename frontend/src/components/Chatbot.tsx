import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { 
  MessageSquare, 
  Send, 
  User, 
  Bot, 
  X, 
  Mic, 
  Volume2,
  Sparkles,
  Leaf,
  Minus,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${import.meta.env.VITE_API_BASE_URL}/ai/chat`
    }),
    initialMessages: [
      { id: 'welcome', role: 'assistant', content: 'Hello! I am your AI Smart Farming Assistant. How can I help you today? You can ask about crop recommendations, disease diagnosis, or market prices.' } as any
    ]
  } as any);

  const isGenerating = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isGenerating) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  const getMessageText = (message: any): string => {
    let fullText = message.content || '';
    const parts = message.parts || [];
    if (parts.length > 0) {
      fullText = parts
        .filter((part: any) => part.type === 'text')
        .map((part: any) => part.text)
        .join('');
    }
    return fullText;
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-20 h-20 bg-primary-green text-white rounded-[2rem] shadow-[0_20px_50px_rgba(46,125,50,0.3)] flex items-center justify-center z-50 group transition-colors hover:bg-emerald-700"
      >
        <MessageSquare className="w-10 h-10 group-hover:rotate-12 transition-transform" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full border-4 border-white dark:border-slate-900" 
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '80px' : '650px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-8 right-8 w-full max-w-[450px] bg-card-white dark:bg-slate-900 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-slate-200 dark:border-slate-800 flex flex-col z-[60] overflow-hidden transition-all duration-500 ease-in-out"
          >
            
            {/* Header */}
            <div className="bg-primary-green p-6 text-white flex items-center justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Leaf className="w-20 h-20" />
              </div>

              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-base uppercase tracking-widest">Agri Assistant</h4>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <div className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-[11px] text-emerald-100 font-black uppercase tracking-widest">AI Agent Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 relative z-10">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2.5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-8 space-y-8 bg-bg-light/50 dark:bg-slate-950/50 scroll-smooth no-scrollbar"
                >
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-end space-x-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                          message.role === 'user' ? 'bg-primary-green text-white' : 'bg-slate-900 dark:bg-slate-800 text-white'
                        }`}>
                          {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                        </div>
                        <div className={`p-5 rounded-[2rem] text-sm font-bold leading-relaxed shadow-xl border ${
                          message.role === 'user' 
                            ? 'bg-primary-green text-white rounded-br-none border-primary-green/20' 
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-800 rounded-bl-none'
                        }`}>
                          {getMessageText(message)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-3">
                         <div className="w-9 h-9 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Bot className="w-5 h-5" />
                         </div>
                         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] rounded-bl-none border border-slate-100 dark:border-slate-800 shadow-xl flex items-center space-x-2">
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-2 h-2 bg-primary-green rounded-full" 
                            />
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-primary-green rounded-full" 
                            />
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-primary-green rounded-full" 
                            />
                         </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-8 bg-card-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <form onSubmit={handleSubmit} className="relative">
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask our AI Farming Assistant..."
                      className="w-full pl-8 pr-24 py-5 bg-bg-light dark:bg-slate-800 border-2 border-transparent focus:border-primary-green focus:bg-white dark:focus:bg-slate-950 rounded-[2rem] focus:outline-none transition-all text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-bold"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <button 
                        type="button"
                        className="p-2.5 text-slate-400 hover:text-primary-green transition-colors"
                        title="Voice Input"
                      >
                        <Mic className="w-6 h-6" />
                      </button>
                      <button 
                        type="submit"
                        disabled={!input.trim() || isGenerating}
                        className="p-3.5 bg-primary-green text-white rounded-2xl shadow-xl shadow-primary-green/30 hover:bg-emerald-700 disabled:opacity-50 disabled:scale-95 transition-all"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                  <div className="mt-5 flex items-center justify-center space-x-6">
                     <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>AI Powered</span>
                     </div>
                     <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <Volume2 className="w-4 h-4 text-accent-blue" />
                        <span>Voice Enabled</span>
                     </div>
                  </div>
                </div>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;