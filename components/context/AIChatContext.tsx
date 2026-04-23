'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  insightData?: any;
  kpiLabel?: string;
  updatesLabel?: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  date: Date;
  messages: ChatMessage[];
}

export interface ChatTriggerContext {
  module: string;
  section: string;
  title: string;
  value: string;
}

interface AIChatContextType {
  messages: ChatMessage[];
  history: ChatHistoryItem[];
  isOpen: boolean;
  isMinimized: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsMinimized: (isMinimized: boolean) => void;
  sendMessage: (text: string, sender: 'user' | 'bot', insightData?: any) => void;
  triggerChatFromCard: (context: ChatTriggerContext) => void;
  clearChat: () => void;
  deleteHistoryItem: (id: string) => void;
  loadHistoryItem: (item: ChatHistoryItem) => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Greetings! I'm the Z-Model Executive AI. How can I assist you with global or regional insights today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const sendMessage = (text: string, sender: 'user' | 'bot', insightData?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      insightData
    };
    setMessages(prev => [...prev, newMessage]);

    // Simple Mock Response Logic
    if (sender === 'user') {
      setTimeout(() => {
        let botText = "I'm processing that request. Analyzing relevant geopolitical and economic vectors...";

        const lowerText = text.toLowerCase();

        if (lowerText.includes('strait of hormuz') || lowerText.includes('hormuz closure')) {
          botText = "Sovereign Intelligence Briefing: The potential closure of the Strait of Hormuz is categorized as an 'EXTREME SEVERITY' (93%) scenario. For the region, security impact is near maximum (95%), directly threatening major maritime trade hubs. We estimate a 92% economic impact due to the region's central role as a global logistics and energy export hub. Would you like a deeper dive into the regional vs global complexity scores?";
        } else if (lowerText.includes('red sea maritime security')) {
          botText = "Sovereign Intelligence Report: Red Sea Maritime Security is currently categorized as 'CRITICAL'. The Bab-el-Mandeb strait is seeing a 45% increase in insurance premiums for all commercial freight. Our neural engine suggests escalation risks are mounting due to asymmetrical threat vectors. Would you like a breakdown of the specific involved parties?";
        } else if (lowerText.includes('tell me more') || lowerText.includes('give more info')) {
          // Context-aware deep dive
          const lastBotMessage = messages.filter(m => m.sender === 'bot').reverse()[0];
          const context = lastBotMessage?.text.toLowerCase() || '';

          if (context.includes('strait of hormuz')) {
            botText = "Geopolitical Deep-Dive: A closure would disrupt approximately 20% of global LNG and oil trade. Analysis shows regional security impact at 94%, while global geopolitical complexity reaches a staggering 98%. As a critical global chokepoint, the region is structurally the most exposed. Strategic acceleration of alternative export routes (pipelines and bypass ports) is currently the primary defensive counter-measure.";
          } else if (context.includes('red sea')) {
            botText = "Deep-Dive Analysis: The primary drivers of instability in the Red Sea sector are a combination of local kinetic shifts and global energy price volatility. Specifically, we are tracking a mobilization of strategic assets in the Gulf of Aden. Impact on international strategic trade corridors is estimated at -2.4% annually if security is not normalized by Q3 2026.";
          } else {
            botText = "Beyond the primary metrics, we are seeing a shift in multi-lateral alignment. Both regional and global powers are recalibrating their deterrence frameworks. Would you like me to analyze the specific impact on your active investment portfolio or current geopolitical files?";
          }
        } else if (lowerText.includes('analyze investment potential')) {
          botText = "Neural Analysis complete. The target shows a high alpha score with significant regulatory tailwinds. However, exposure to regional currency volatility remains a Tier-2 risk. I recommend a weighted allocation strategy focusing on infrastructure-backed sovereign bonds.";
        }

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botText,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const triggerChatFromCard = (context: ChatTriggerContext) => {
    // 1. Open and un-minimize the chat
    setIsOpen(true);
    setIsMinimized(false);

    // 2. Format based on module
    let userText = `Analyze: ${context.title} (${context.value})`;

    if (context.module === 'Politics') {
      userText = `Requesting Geopolitical Briefing: ${context.title}`;
    } else if (context.module === 'Media') {
      userText = `Perform Sentiment Analysis & Fact-Check: ${context.title}`;
    } else if (context.module === 'Investment') {
      userText = `Generate Investment Thesis: ${context.title}`;
    }

    sendMessage(userText, 'user');
  };

  const clearChat = () => {
    // Before clearing, save to history if there are messages
    if (messages.length > 1) {
      const newHistoryItem: ChatHistoryItem = {
        id: Date.now().toString(),
        title: messages[1]?.text.substring(0, 30) + '...',
        lastMessage: messages[messages.length - 1].text,
        date: new Date(),
        messages: [...messages]
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    }

    setMessages([
      {
        id: '1',
        text: "New session started. How can I assist?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const loadHistoryItem = (item: ChatHistoryItem) => {
    setMessages(item.messages);
    setIsMinimized(false);
    setIsOpen(true);
  };

  return (
    <AIChatContext.Provider value={{
      messages,
      history,
      isOpen,
      isMinimized,
      setIsOpen,
      setIsMinimized,
      sendMessage,
      triggerChatFromCard,
      clearChat,
      deleteHistoryItem,
      loadHistoryItem
    }}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const context = useContext(AIChatContext);
  if (context === undefined) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
}
