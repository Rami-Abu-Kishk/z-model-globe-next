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
