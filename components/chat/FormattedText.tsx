import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FormattedTextProps {
  text: string;
  className?: string;
  stream?: boolean;
  speed?: number;
  delay?: number;
}

/**
 * FormattedText Component
 * Handles streaming (typing effect) and renders markdown content.
 */
export function FormattedText({ text, className = '', stream = false, speed = 15, delay = 0 }: FormattedTextProps) {
  const [displayedText, setDisplayedText] = useState(stream ? '' : text);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!stream) {
      setDisplayedText(text);
      return;
    }

    const startStreaming = () => {
      setIsStreaming(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
          setIsStreaming(false);
        }
      }, speed);
      return interval;
    };

    let intervalId: any;
    const timeoutId = setTimeout(() => {
      intervalId = startStreaming();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, stream, speed, delay]);

  if (!displayedText && stream) return null;

  return (
    <div className={`${className} relative`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({node, ...props}) => <p className="mb-2 last:mb-0 inline" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
          li: ({node, ...props}) => <li className="mb-1" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-md font-bold mb-2" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-slate-900 leading-tight" {...props} />,
          code: ({node, ...props}) => <code className="bg-slate-100 px-1 rounded text-rose-500" {...props} />,
        }}
      >
        {displayedText}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-1.5 h-4 bg-indigo-500/80 ml-1 animate-pulse align-middle" />
      )}
    </div>
  );
}
