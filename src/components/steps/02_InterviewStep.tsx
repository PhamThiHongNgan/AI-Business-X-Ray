import React, { useRef, useEffect } from 'react';
import { User, Cpu, ArrowRight } from 'lucide-react';
import { BusinessProfile, ChatMessage, AiCognitiveState } from '../../types';
import { FormatText, CognitivePanel } from '../common';

interface InterviewStepProps {
  businessProfile: BusinessProfile | null;
  messages: ChatMessage[];
  input: string;
  isTyping: boolean;
  aiState: AiCognitiveState;
  onChangeInput: (val: string) => void;
  onSendMessage: () => void;
}

export const InterviewStep: React.FC<InterviewStepProps> = ({
  businessProfile,
  messages,
  input,
  isTyping,
  aiState,
  onChangeInput,
  onSendMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col bg-[#0B1120] relative">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 z-10"></div>
        
        {/* SMALL BUSINESS PROFILE PANEL */}
        {businessProfile && (
          <div className="bg-slate-900 border-b border-slate-800 p-4 shrink-0 flex gap-6 text-sm shadow-md z-10">
            <div className="flex-1 border-r border-slate-800 pr-4">
              <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Doanh nghiệp</span>
              <span className="text-slate-200 font-bold truncate block">{businessProfile.q1 || '---'}</span>
            </div>
            <div className="flex-1 border-r border-slate-800 pr-4">
              <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Lĩnh vực</span>
              <span className="text-slate-200 truncate block">{businessProfile.q2 || '---'}</span>
            </div>
            <div className="flex-1 border-r border-slate-800 pr-4">
              <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Doanh thu</span>
              <span className="text-slate-200 truncate block">{businessProfile.q10 || '---'}</span>
            </div>
            <div className="flex-[2]">
              <span className="text-amber-500 font-bold uppercase tracking-wider block mb-1">Ưu tiên 90 ngày tới</span>
              <span className="text-amber-100 line-clamp-1 italic">"{businessProfile.q13 || '---'}"</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center mb-1 ${msg.role === 'user' ? 'text-slate-400' : 'text-indigo-400'}`}>
                  {msg.role === 'user' ? (
                    <>
                      <span className="text-sm font-bold mr-2">CEO</span>
                      <User className="w-5 h-5 bg-slate-800 rounded-full p-1" />
                    </>
                  ) : (
                    <>
                      <Cpu className="w-5 h-5 bg-indigo-500/20 rounded-full p-1 border border-indigo-500/30 mr-2" />
                      <span className="text-sm font-bold uppercase tracking-wider">AI Challenger</span>
                    </>
                  )}
                </div>
                <div className={`p-4 rounded-2xl text-base leading-relaxed whitespace-pre-wrap shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tr-sm' 
                    : 'bg-indigo-950/30 text-indigo-100 border border-indigo-500/30 rounded-tl-sm'
                }`}>
                  <FormatText text={msg.text} />
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-indigo-950/30 p-4 rounded-2xl rounded-tl-sm border border-indigo-500/30 flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-500/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-500/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-500/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="relative flex items-end bg-slate-800 border border-slate-700 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
            <textarea
              value={input}
              onChange={(e) => onChangeInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Trả lời câu hỏi của AI (Nhấn Enter để gửi)..."
              className="w-full bg-transparent text-slate-200 p-4 outline-none resize-none text-base placeholder:text-slate-500"
              rows={2} 
              disabled={isTyping}
            />
            <button 
              onClick={onSendMessage} 
              disabled={!input.trim() || isTyping} 
              className="m-2 p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <CognitivePanel aiState={aiState} />
    </div>
  );
};
