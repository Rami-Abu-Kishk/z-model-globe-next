'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIChat } from '../context/AIChatContext';
import { AIInsightContent } from './AIInsightContent';
import { chatbotData, ChatBotResponse, COUNTRY_DATA } from '@/lib/mock-data/chatbot-data';
import { useZModelStore } from '@/lib/store';
import { 
  X, 
  Minus, 
  Plus, 
  MoreHorizontal, 
  Paperclip, 
  Mic, 
  Send, 
  User, 
  Bot,
  History,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormattedText } from './FormattedText';


export function AIChatBot() {
  const { 
    messages, 
    history,
    isOpen, 
    isMinimized, 
    isTyping,
    statusMessage,
    setIsOpen, 
    setIsMinimized, 
    sendMessage, 
    setStatus,
    clearChat,
    deleteHistoryItem,
    loadHistoryItem 
  } = useAIChat();
  const [showHistory, setShowHistory] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitor panel states to adjust position
  const viewState = useZModelStore(s => s.viewState);
  const focusedCardId = useZModelStore(s => s.focusedCardId);
  const activeCountry = useZModelStore(s => s.activeCountry);

  const isPanelOpen = (viewState === 'CARD_FOCUS' && focusedCardId !== null) || !!activeCountry;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-respond to card triggers & contextual prompts
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.sender !== 'user') return;

    const text = lastMessage.text;
    const isTrigger = 
      text.startsWith('Analyze:') || 
      text.startsWith('Requesting') || 
      text.startsWith('Perform') || 
      text.startsWith('Generate');

    if (isTrigger) {
      setStatus("I'm processing that request. Analyzing relevant geopolitical and economic vectors...");
      const timer = setTimeout(() => {
        const response = getMockResponse(text);
        
        if (response.status) {
          setStatus(response.status);
          setTimeout(() => {
            if (response.text) {
               sendMessage(response.text, 'bot', response.insightData);
            }
            setStatus(null);
          }, 2000);
        } else {
          sendMessage(response.text, 'bot', response.insightData);
          setStatus(null);
        }
        
        if (response.event) {
          window.dispatchEvent(new CustomEvent(response.event.type, { 
            detail: response.event.payload 
          }));
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && !showHistory) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, showHistory, isTyping]);

  /**
   * PURE DATA FUNCTION
   * Routes input to the mock data dictionary and returns a structured response object.
   */
  const getMockResponse = (input: string): ChatBotResponse => {
    const lowerInput = input.toLowerCase();
    const store = useZModelStore.getState();
    const activeCountryCode = store.selectedCountry;
    const activeCountryName = store.activeCountry;

    // --- PRIORITY 1: Card Triggers (Explicit requests) ---
    const triggerPrefixes = [
      'Analyze: ', 
      'Requesting Geopolitical Briefing: ', 
      'Perform Sentiment Analysis & Fact-Check: ', 
      'Generate Investment Thesis: '
    ];

    let label = '';
    for (const prefix of triggerPrefixes) {
      if (input.startsWith(prefix)) {
        const rawLabel = input.replace(prefix, '').split(' (')[0];
        label = rawLabel.trim().toUpperCase();
        break;
      }
    }

    if (label && chatbotData.TRIGGERS && chatbotData.TRIGGERS[label]) {
      return chatbotData.TRIGGERS[label];
    }

    if (label) {
      const bestMatch = Object.keys(chatbotData.TRIGGERS).find(key => 
        label.includes(key.toUpperCase()) || key.toUpperCase().includes(label)
      );
      if (bestMatch) return chatbotData.TRIGGERS[bestMatch];
    }

    // --- PRIORITY 2: Global Context ---
    if (lowerInput.includes('global') || lowerInput.includes('globe') || lowerInput.includes('world') || lowerInput.includes('international')) {
      return COUNTRY_DATA["GLOBAL"];
    }

    // --- PRIORITY 3: Supported Country Logic ---
    const countryContext = activeCountryCode || (
      lowerInput.includes('uae') || lowerInput.includes('emirates') ? 'AE' :
      lowerInput.includes('saudi') || lowerInput.includes('ksa') ? 'SA' :
      lowerInput.includes('jordan') ? 'JO' :
      lowerInput.includes('usa') || lowerInput.includes('america') || lowerInput.includes('us ') ? 'US' : null
    );

    if (countryContext && COUNTRY_DATA[countryContext]) {
      return COUNTRY_DATA[countryContext];
    }

    // --- PRIORITY 4: Fallback for Unsupported Countries ---
    const words = input.split(' ');
    const potentialCountry = words.find(w => 
      w.length > 2 && 
      w[0] === w[0].toUpperCase() && 
      !['Analyze:', 'Requesting', 'Z-Model', 'The', 'How', 'What'].includes(w)
    );

    const extractedName = activeCountryName || potentialCountry || "this region";
    
    return {
      text: "", 
      status: `I am currently gathering more data on ${extractedName}. Please check back later for a full analysis.`
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    sendMessage(userMessage, 'user');
    setInputValue('');

    // Set initial status
    setStatus("I'm processing that request. Analyzing relevant geopolitical and economic vectors...");

    // Process Bot Response after short delay
    setTimeout(() => {
      const response = getMockResponse(userMessage);
      
      if (response.status) {
        setStatus(response.status);
        // If it's a "tell me more" or gathering data case, keep status then clear
        setTimeout(() => {
          if (response.text) {
             sendMessage(response.text, 'bot', response.insightData);
          }
          setStatus(null);
        }, 2000);
      } else {
        sendMessage(response.text, 'bot', response.insightData);
        setStatus(null);
      }

      if (response.event) {
        window.dispatchEvent(new CustomEvent(response.event.type, { 
          detail: response.event.payload 
        }));
      }
    }, 1500);
  };

  const startNewChat = () => {
    clearChat();
    setShowHistory(false);
  };

  return (
    <div 
      className={cn(
        "fixed bottom-6 z-[9999] flex flex-col pointer-events-auto transition-all duration-500 ease-in-out left-9",
      )}
    >
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 20, 
              scale: 0.9, 
              transformOrigin: isPanelOpen ? 'bottom left' : 'bottom right' 
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] sm:w-[400px] h-[600px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden flex flex-col relative"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shadow-lg relative z-20">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  title="History"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Z-Model AI</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Online
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={startNewChat}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  title="New Chat"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden bg-slate-50">
              {/* History Overlay */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute inset-0 z-30 bg-white p-6 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <History className="w-5 h-5 text-indigo-600" />
                        Chat History
                      </h3>
                      <button 
                        onClick={() => setShowHistory(false)}
                        className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {history.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            loadHistoryItem(item);
                            setShowHistory(false);
                          }}
                          className="w-full text-left p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group flex items-start justify-between cursor-pointer"
                        >
                          <div className="flex-1">
                            <div className="font-bold text-sm text-slate-700 truncate">{item.title}</div>
                            <div className="text-xs text-slate-400 mt-1 line-clamp-1">{item.lastMessage}</div>
                            <div className="text-[10px] text-slate-300 mt-2">{item.date.toLocaleDateString()}</div>
                          </div>
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHistoryItem(item.id);
                            }}
                            className="p-1 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-slate-200 group-hover:text-rose-400 hover:text-rose-600 transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Messages */}
              <div className="h-full overflow-y-auto p-4 space-y-4 flex flex-col">
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%]`}>
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className={`
                        p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${msg.sender === 'user' 
                          ? 'bg-slate-900 text-white rounded-br-none' 
                          : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                        }
                      `}>
                        <FormattedText 
                          text={msg.text} 
                          className={msg.sender === 'user' ? 'text-white' : 'text-slate-700'} 
                          stream={msg.sender === 'bot'}
                          speed={10}
                        />
                        {msg.insightData && (
                          <div className="mt-4 p-4 bg-white rounded-xl border border-slate-100 text-slate-800 overflow-hidden min-w-[240px]">
                            <AIInsightContent 
                              data={msg.insightData} 
                              variant="chat" 
                              kpiLabel={msg.kpiLabel}
                              updatesLabel={msg.updatesLabel}
                            />
                          </div>
                        )}
                        <div className={`text-[9px] mt-2 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-slate-600" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Status Indicator */}
                <AnimatePresence>
                  {isTyping && statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="flex items-end gap-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 animate-pulse">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="p-4 rounded-2xl text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 rounded-bl-none shadow-sm flex items-center gap-3 italic">
                          <div className="flex gap-1">
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
                          </div>
                          {statusMessage}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-2 px-3 focus-within:ring-2 focus-within:ring-slate-200 transition-all">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700 py-2"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`
                    p-2 rounded-xl transition-all
                    ${inputValue.trim() 
                      ? 'bg-slate-900 text-white shadow-lg hover:scale-110 active:scale-95 cursor-pointer' 
                      : 'text-slate-300 pointer-events-none'
                    }
                  `}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          if (isMinimized) setIsMinimized(false);
          setIsOpen(!isOpen || isMinimized);
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(15, 23, 42, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center justify-center rounded-full shadow-[0_10px_40px_-5px_rgba(0,0,0,0.4)] p-5
          bg-slate-900 text-white backdrop-blur-md
          relative cursor-pointer group border border-white/20
        `}
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              className="flex items-center"
            >
              <Bot className="w-7 h-7" />
              {(isMinimized || !isOpen) && (
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-bold text-sm">
                  Chat with AI
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
