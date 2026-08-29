import React from 'react';
import { Cpu, CheckCircle2, HelpCircle, Database } from 'lucide-react';
import { AiCognitiveState } from '../../types';

interface CognitivePanelProps {
  aiState: AiCognitiveState;
}

export const CognitivePanel: React.FC<CognitivePanelProps> = ({ aiState }) => (
  <div className="bg-slate-900 border-l border-slate-800 p-6 w-[350px] flex-shrink-0 flex flex-col h-full overflow-y-auto">
    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
      <Cpu className="w-4 h-4 mr-2 text-indigo-500" /> AI Cognitive Engine
    </h3>
    
    <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-slate-300 font-medium">Confidence Level</span>
        <span className="text-emerald-400 font-bold">{aiState.confidenceLevel}%</span>
      </div>
      <div className="w-full bg-slate-900 rounded-full h-2">
        <div 
          className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
          style={{ width: `${Math.min(100, Math.max(0, aiState.confidenceLevel))}%` }}
        />
      </div>
      {aiState.confidenceLevel > 80 && (
        <div className="mt-2 text-[10px] text-emerald-400 flex items-center justify-end font-bold">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Đủ dữ liệu để chẩn đoán
        </div>
      )}
    </div>

    <div className="space-y-6 flex-1">
      <div>
        <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center uppercase tracking-wider">
          <CheckCircle2 className="w-3 h-3 mr-1.5" /> What AI Knows
        </h4>
        <ul className="space-y-1.5 text-sm text-slate-300">
          {aiState.whatAiKnows && aiState.whatAiKnows.length > 0 ? (
            aiState.whatAiKnows.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-emerald-500 mr-1.5">•</span>
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-slate-500 italic">Đang cập nhật từ hồ sơ...</li>
          )}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-bold text-amber-400 mb-2 flex items-center uppercase tracking-wider">
          <HelpCircle className="w-3 h-3 mr-1.5" /> Areas to Investigate
        </h4>
        <ul className="space-y-1.5 text-sm text-slate-300">
          {aiState.whatAiDoesntKnow && aiState.whatAiDoesntKnow.length > 0 ? (
            aiState.whatAiDoesntKnow.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-amber-500 mr-1.5">•</span>
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-slate-500 italic">Đang phân tích khoảng trống...</li>
          )}
        </ul>
      </div>

      <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
        <h4 className="text-[10px] font-bold text-indigo-400 mb-1 uppercase tracking-wider">Current Hypothesis</h4>
        <p className="text-sm text-indigo-100 leading-relaxed">{aiState.conclusion || "Đang hình thành giả thuyết từ Business Intake..."}</p>
      </div>

      {aiState.evidence && (
        <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
          <h4 className="text-[10px] font-bold text-teal-400 mb-1 uppercase tracking-wider flex items-center">
            <Database className="w-3 h-3 mr-1" /> Bằng chứng đang xem xét
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed italic">"{aiState.evidence}"</p>
        </div>
      )}
    </div>
  </div>
);
