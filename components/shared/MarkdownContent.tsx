import React from 'react';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * A simple markdown parser component that handles:
 * - Bold text: **bold**
 * - Italic text: *italic*
 * - Line breaks: \n
 * - List items: 1. or • or - or *
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  if (!content) return null;

  // Split by newlines initially
  const lines = content.split('\n');

  const renderTextWithFormatting = (text: string) => {
    // Regex for bold (**text**) and italic (*text*)
    // We split by these patterns while keeping the delimiters to process them
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    
    return parts.map((part, i) => {
      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-extrabold text-slate-900 mx-[1px]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-slate-700 mx-[1px]">
            {part.slice(1, -1)}
          </em>
        );
      }
      // Plain text
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className={cn("flex flex-col gap-3 text-justify", className)}>
      {lines.map((line, idx) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return <div key={idx} className="h-1" />;

        // Check for list patterns: "1. ", "• ", "- ", "* "
        const listMatch = trimmedLine.match(/^(\d+\.|[•\-*])\s+(.*)/);
        
        if (listMatch) {
          const marker = listMatch[1];
          const text = listMatch[2];
          
          return (
            <div key={idx} className="flex gap-3 pl-1 group">
              <span className="shrink-0 font-black text-slate-400 group-hover:text-amber-500 transition-colors">
                {marker.includes('.') ? marker : '•'}
              </span>
              <p className="text-slate-600 leading-relaxed flex-1 text-justify">
                {renderTextWithFormatting(text)}
              </p>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-slate-600 leading-relaxed text-justify">
            {renderTextWithFormatting(line)}
          </p>
        );
      })}
    </div>
  );
}
