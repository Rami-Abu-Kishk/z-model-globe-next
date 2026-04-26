'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  Minimize2, 
  Send, 
  Bot,
  Sparkles,
  User, 
  X,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { FormattedText } from './FormattedText';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MediaAssistantChatbotProps {
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  isOpen: boolean;
}

export function MediaChatView({ className }: { className?: string }) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Z-Bot, your Media Assistant. How can I help you analyze the current intelligence feed?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Process Bot Response
    setTimeout(() => {
      let botText = "I'm processing that request. Based on the latest signals from Sky News, there is a significant trend spike in regional energy security reports.";
      
      const lowerInput = userMessage.toLowerCase();
      const isHealthcareQuery = 
        (lowerInput.includes('health') && lowerInput.includes('initiative') && lowerInput.includes('improve')) ||
        (lowerInput.includes('strengthen') && lowerInput.includes('healthcare')) ||
        (lowerInput.includes('prevention') && lowerInput.includes('innovation')) ||
        (lowerInput.includes('high-quality services') && lowerInput.includes('residents'));

      if (isHealthcareQuery) {
        botText = `The Government of the United Arab Emirates launches a national health initiative that strengthens prevention, accelerates innovation, and unifies quality standards across all emirates\n\nThe Government of the United Arab Emirates has launched a national health initiative that reorients the system toward prevention, accelerates the translation of innovation from the laboratory to the clinic, and implements unified quality standards across all of the country’s emirates; ensuring earlier disease detection, reduced waiting times, and the provision of high-quality, consistent healthcare for all.`;
      }

      const isAllegationQuery = 
        (lowerInput.includes('best practices') && lowerInput.includes('responding') && lowerInput.includes('media allegations')) ||
        (lowerInput.includes('allegations') && lowerInput.includes('united arab emirates')) ||
        (lowerInput.includes('best practices') && lowerInput.includes('uae'));

      if (isAllegationQuery) {
        botText = `### Best practices for responding to media allegations against the United Arab Emirates:

*   **Disciplined Response**: Maintain precise messaging and clear lines of authority; avoid emotional reactions.
*   **Strategic Assessment**: Assess seriousness and impact before responding; do not amplify marginal claims.
*   **Federal Coordination**: Coordinate with competent authorities on diplomatic or security matters to ensure a unified message.
*   **Factual Integrity**: Use documented facts and attributable figures; avoid accusatory language.
*   **Judicial Sensitivity**: Separate description from investigation; use cautious formulations for active court matters.
*   **Right of Reply**: Request clarifications be published with the same prominence and timing as the original allegation.
*   **Proportional Representation**: Designate an appropriate spokesperson; avoid unnecessarily elevating the platform.
*   **Deliberate Timing**: Respond fast enough to preempt narratives without rushing before information into complete.
*   **Core Messaging**: Use a single core message supported by two secondary points; do not repeat allegations in headlines.
*   **Balanced Tone**: Reflect state values of respect, tolerance, and non-escalation.
*   **Legal Review**: Conduct prior legal review for defamation or contractual risks.
*   **Impact Monitoring**: Follow up on media impact and update messages as new information emerges.`;
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div 
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-6 custom-scrollbar scroll-smooth"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div
                className={cn(
                  "p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm",
                  msg.sender === 'user'
                    ? "bg-slate-900 text-white rounded-tr-none"
                    : "bg-white/95 text-slate-800 border border-white/60 rounded-tl-none"
                )}
              >
                <FormattedText 
                  text={msg.text} 
                  stream={msg.sender === 'bot'} 
                  speed={10} 
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-white/40 bg-white/20 backdrop-blur-md sticky bottom-0">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white/80 rounded-2xl p-2 border border-white/60 shadow-inner focus-within:ring-1 focus-within:ring-slate-400/20 focus-within:border-slate-400 transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message to analyze intelligence..."
            className="flex-1 bg-transparent border-none focus:outline-none text-[13px] px-3 font-medium text-slate-800 placeholder:text-slate-400"
          />
          <Button
            size="icon"
            disabled={!inputValue.trim()}
            onClick={handleSendMessage}
            className={cn(
              "w-10 h-10 rounded-xl transition-all",
              inputValue.trim() 
                ? "bg-slate-900 text-white hover:scale-105 active:scale-95 shadow-md shadow-slate-900/10" 
                : "bg-slate-100 text-slate-400"
            )}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MediaAssistantChatbot({ constraintsRef, onClose, isOpen }: MediaAssistantChatbotProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={isMaximized ? {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        x: 0,
        y: 0,
        borderRadius: '1.5rem'
      } : {
        width: 360,
        height: 480,
        borderRadius: '1.5rem',
        top: 'calc(100% - 480px - 24px)',
        left: 'calc(100% - 360px - 24px)',
        x: 0,
        y: 0
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={cn(
        "absolute z-50 flex flex-col shadow-2xl overflow-hidden",
        "bg-white/60 backdrop-blur-xl border border-white/60",
        isMaximized ? "m-0" : "",
        !isOpen && "pointer-events-none"
      )}
      style={{
        position: 'absolute',
        touchAction: 'none',
        display: isOpen ? 'flex' : 'none'
      }}
    >
      <div 
        className={cn(
          "flex items-center justify-between p-4 border-b border-white/70 select-none bg-white/80"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-900 rounded-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">
              Media Assistant & Advisor
            </h3>
            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter mt-1">
              Active Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg hover:bg-white/40 transition-colors"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-slate-600" />
            ) : (
              <Maximize2 className="w-4 h-4 text-slate-600" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg hover:bg-white/40 transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
      </div>

      <MediaChatView />
    </motion.div>
  );
}
