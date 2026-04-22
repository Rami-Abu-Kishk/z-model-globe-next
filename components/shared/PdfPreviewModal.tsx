"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
}

export function PdfPreviewModal({ isOpen, onClose, title, fileUrl }: PdfPreviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[32px] shadow-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 px-8 border-b border-white/50 bg-white/20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none mb-1">
                    Intelligence Report Alpha
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[300px] md:max-w-[500px]">
                    {title}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(fileUrl, '_blank')}
                  className="rounded-full h-10 px-4 hover:bg-white/50 text-slate-500 hover:text-slate-900 transition-all font-black text-[10px] uppercase tracking-widest hidden md:flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Open in New Tab
                </Button>
                <div className="w-px h-6 bg-slate-200/50 mx-1 hidden md:block" />
                <Button
                  onClick={onClose}
                  variant="ghost"
                  className="rounded-full w-10 h-10 p-0 hover:bg-slate-900 hover:text-white transition-all group"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* PDF Viewer Area */}
            <div className="flex-1 bg-slate-50/50 relative overflow-hidden">
               <iframe 
                 src={`${fileUrl}#toolbar=0&navpanes=0`} 
                 className="w-full h-full border-none"
                 title="PDF Preview"
               />
               
               {/* Decorative Gradient Overlays */}
               <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
               <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Footer */}
            <div className="p-4 px-8 border-t border-white/50 bg-white/20 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Z-Model Vault Connection Active</span>
               </div>
               
               <div className="flex gap-4">
                 <Button
                    variant="outline"
                    className="rounded-2xl h-11 border-slate-200 hover:border-slate-900 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-white/50"
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = fileUrl;
                        link.download = title.replace(/\s+/g, '_') + '.pdf';
                        link.click();
                    }}
                 >
                   <Download className="w-4 h-4" /> Secure Download
                 </Button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
