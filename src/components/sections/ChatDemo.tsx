"use client";
import { useState, useRef, MouseEvent as ReactMouseEvent } from "react";

const messages = [
  {
    sender: "bot",
    text: 'I found 12 leads matching "SaaS founders, Series A, based in the US."',
    time: "2:14 PM",
  },
  {
    sender: "bot",
    text: "Here are the top 3. I've drafted short, personalized emails for each one. Want to review?",
    time: "2:14 PM",
  },
  {
    sender: "user",
    text: "Show me the drafts",
    time: "2:15 PM",
  },
  {
    sender: "bot",
    text: '1. Alex Chen (Trello alt) — "Hey Alex, saw your PLG approach to project management..."\n2. Maria Santos (Fintech) — "Hi Maria, loved your take on embedded banking..."\n3. Dev Patel (DevTools) — "Dev, saw your talk on developer experience..."',
    time: "2:15 PM",
  },
  {
    sender: "user",
    text: "These look great. Send all three ✉️",
    time: "2:16 PM",
  },
  {
    sender: "bot",
    text: "Done — all 3 emails sent. I'll let you know when someone replies.",
    time: "2:16 PM",
    status: "sent",
  },
];

export default function ChatDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Clean, subtle tilt (4deg max)
    const rotateY = -((x - centerX) / centerX) * 4;
    const rotateX = ((y - centerY) / centerY) * 4;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section id="demo" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-sm uppercase tracking-widest text-accent-light/70 mb-4 font-medium">
            In action
          </p>
          <h2 className="text-display-sm font-semibold text-white">
            A real conversation with Loqi
          </h2>
          <p className="text-body text-slate-500 mt-4">
            This is what using Loqi actually looks like — in Telegram or WhatsApp.
          </p>
        </div>

        <div className="animate-on-scroll" style={{ perspective: '1000px' }}>
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-blue-400/[0.04] rounded-3xl blur-[16px]" />
            
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative bg-[#12141c]/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden glow-accent transform-gpu z-10"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale3d(1.02, 1.02, 1.02) translateY(-6px)' : 'scale3d(1, 1, 1) translateY(0)'}`,
                transition: isHovered 
                  ? 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease-out' 
                  : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s ease-out',
                boxShadow: isHovered 
                  ? '0 30px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(37, 99, 235, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset' 
                  : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Interactive Hover Shine */}
              <div 
                className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.06), transparent 40%)`
                }} 
              />
              
              {/* Chat header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800/40 bg-surface-light/30">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white text-sm font-bold">
                  L
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Loqi</p>
                  <p className="text-xs text-emerald-400">Active now</p>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4" style={{ minHeight: "420px" }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "gap-3"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-slate-700/50 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-[10px] text-slate-400 font-bold">L</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                        msg.sender === "user"
                          ? "bg-accent/90 rounded-tr-sm"
                          : "bg-surface-light rounded-tl-sm"
                      }`}
                    >
                      <p
                        className={`text-sm whitespace-pre-line ${
                          msg.sender === "user" ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {msg.status === "sent" && (
                          <span className="text-emerald-400 mr-1">✓</span>
                        )}
                        {msg.text}
                      </p>
                      <p
                        className={`text-[11px] mt-1.5 ${
                          msg.sender === "user"
                            ? "text-blue-200/50"
                            : "text-slate-600"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-slate-800/40 bg-surface-light/20">
                <div className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 border border-slate-800/30">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm text-slate-400 outline-none placeholder:text-slate-600"
                    readOnly
                  />
                  <div className="w-8 h-8 rounded-lg bg-accent/80 flex items-center justify-center cursor-pointer hover:bg-accent transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
