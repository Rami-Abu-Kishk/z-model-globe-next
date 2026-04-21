'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MarkdownTextProps {
  content: string;
  className?: string;
}

export function MarkdownText({ content, className }: MarkdownTextProps) {
  // Very basic markdown partial implementation
  // Handles bold, italic, and newlines
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Handle bold **text**
      const boldParts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = boldParts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        
        // Handle italic *text*
        const italicParts = part.split(/(\*.*?\*)/g);
        return italicParts.map((iPart, k) => {
          if (iPart.startsWith('*') && iPart.endsWith('*')) {
            return <em key={k} className="italic">{iPart.slice(1, -1)}</em>;
          }
          return iPart;
        });
      });

      return <p key={i} className={cn("mb-2 last:mb-0", className)}>{formattedLine}</p>;
    });
  };

  return <div className="markdown-content">{formatText(content)}</div>;
}
