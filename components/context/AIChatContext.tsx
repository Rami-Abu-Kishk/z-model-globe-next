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

        if (lowerText.includes('russia') || lowerText.includes('ukraine')) {
          botText = "Sovereign Intelligence Briefing: The Russia–Ukraine Conflict is categorized as 'CRITICAL' (95% Severity). It represents a systemic threat to global energy systems and agricultural supply chains. Beyond the kinetic front, our neural engine tracks a 98% complexity score due to hybrid warfare and NATO-bloc strategic decoupling. Would you like a breakdown of the impact on European energy flows?";
        } else if (lowerText.includes('trump') || lowerText.includes('domestic policy')) {
          botText = "Strategic Assessment: US Domestic Policy Protests are currently in the 'WARNING' category. While the case highlights deep ideological polarization, U.S. institutional frameworks remain resilient. We estimate a moderate (65%) impact on near-term market sentiment. Our focus is on regulatory predictability and capital flow continuity. Shall I analyze the specific sectors most exposed to these policy shifts?";
        } else if (lowerText.includes('iran-israel-us') || (lowerText.includes('iran') && lowerText.includes('israel'))) {
          botText = "Sovereign Intelligence Report: The Iran–Israel–US confrontation is a 'CRITICAL' multi-domain conflict (97% Complexity). It poses high-intensity risks to Strait of Hormuz freedom of navigation and regional energy infrastructure. Stakeholders including the UAE and Saudi Arabia are strategically exposed to potential kinetic spillovers. Would you like a deep-dive into the maritime security vectors?";
        } else if (lowerText.includes('israel-lebanon') || (lowerText.includes('israel') && lowerText.includes('lebanon'))) {
          botText = "Geopolitical Briefing: The Israel–Lebanon conflict reflects a volatile and asymmetric confrontation with high (88%) escalation potential. The involvement of regional state and non-state actors (Hezbollah/Iran) positions this as a central front in the Eastern Mediterranean security architecture. Would you like to review the specific implications for regional investor risk perception?";
        } else if (lowerText.includes('tell me more') || lowerText.includes('give more info')) {
          // Context-aware deep dive
          const lastBotMessage = messages.filter(m => m.sender === 'bot').reverse()[0];
          const context = lastBotMessage?.text.toLowerCase() || '';

          if (context.includes('russia') || context.includes('ukraine')) {
            botText = "Geopolitical Deep-Dive: The conflict has triggered a structural shift in global defense spending cycles and energy architecture. We are tracking a 92% sensitivity core among Eastern European energy stakeholders. Strategic emphasis is now on LNG terminal expansion and agricultural supply route diversification to mitigate the 'Critical' status impact.";
          } else if (context.includes('trump')) {
            botText = "Policy Analysis: The primary drivers of domestic tension are shifts in taxation, trade regulation, and immigration policy. While governance continuity is expected, international investors are monitoring political stability indicators. Neural forecasts suggest that while 'Warning' levels persist, the structural resilience of the US economy caps systemic downside.";
          } else if (context.includes('iran')) {
            botText = "Strategic Deep-Dive: The confrontation operates across direct deterrence and indirect proxy arenas. A key risk factor is the disruption of approximately 20% of global oil and LNG trade via the Strait of Hormuz. We project a +15% geopolitical risk premium on regional energy assets if security is not normalized by Q3 2026.";
          } else if (context.includes('lebanon')) {
            botText = "Conflict Analysis: Dynamics include cross-border missile exchanges and targeted strikes. The core risk is an escalation into a multi-front regional war. This affects Eastern Mediterranean energy infrastructure and maritime shipping routes. We recommend a high-vigilance posture for all regional logistics operations.";
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
