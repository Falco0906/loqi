"use client";

import { useState, useEffect } from "react";

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function ConsentModal({ isOpen, onClose, onAccept }: ConsentModalProps) {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedAge, setAgreedAge] = useState(false);
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(isOpen);

  // Reset state and handle mount/unmount animations
  useEffect(() => {
    if (isOpen) {
      setAgreedTerms(false);
      setAgreedAge(false);
      setRender(true);
      // Small delay to allow element to mount before triggering transition
      const frame = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(frame);
    } else {
      setShow(false);
      const timer = setTimeout(() => setRender(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard support (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!render) return null;

  const canContinue = agreedTerms && agreedAge;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-150 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-[500px] bg-surface-light border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 transform transition-all duration-150 ease-out ${show ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-2'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
          Before you continue
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed mb-8">
          You are about to be redirected to Telegram. Loqi will act as your AI outbound assistant inside the chat. Please review and agree to our terms before proceeding.
        </p>

        <div className="space-y-4 mb-8">
          {/* Checkbox 1: Terms */}
          <label className="flex items-start gap-3.5 cursor-pointer group">
            <div className="relative flex items-center justify-center min-w-[20px] mt-0.5">
              <input 
                type="checkbox" 
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="peer appearance-none w-5 h-5 border border-slate-700/80 rounded bg-surface focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent checked:bg-accent checked:border-accent transition-all cursor-pointer" 
              />
              <svg 
                className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[14px] text-slate-300 group-hover:text-slate-200 transition-colors leading-snug">
              I agree to the <a href="/legal/terms" target="_blank" onClick={(e) => e.stopPropagation()} className="text-accent-light hover:text-white transition-colors">Terms of Service</a> and <a href="/legal/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-accent-light hover:text-white transition-colors">Privacy Policy</a>
            </span>
          </label>

          {/* Checkbox 2: Age */}
          <label className="flex items-start gap-3.5 cursor-pointer group">
            <div className="relative flex items-center justify-center min-w-[20px] mt-0.5">
              <input 
                type="checkbox" 
                checked={agreedAge}
                onChange={(e) => setAgreedAge(e.target.checked)}
                className="peer appearance-none w-5 h-5 border border-slate-700/80 rounded bg-surface focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent checked:bg-accent checked:border-accent transition-all cursor-pointer" 
              />
              <svg 
                className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[14px] text-slate-300 group-hover:text-slate-200 transition-colors leading-snug">
              I confirm I am 18 years or older and can enter into this agreement
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-700/50 text-slate-300 font-medium hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            Cancel
          </button>
          
          <button
            onClick={onAccept}
            disabled={!canContinue}
            className="flex-1 py-3 px-4 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-light/50 flex items-center justify-center gap-2"
          >
            Continue
            <svg
              className="w-4 h-4 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
