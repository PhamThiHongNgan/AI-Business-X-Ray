import React from 'react';
import { BrainCircuit, CheckCircle2, Lightbulb } from 'lucide-react';
import { AiCognitiveState } from '../../types';

interface UnderstandingStepProps {
  aiState: AiCognitiveState;
}

export const UnderstandingStep: React.FC<UnderstandingStepProps> = ({ aiState }) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-white flex items-center">
            <BrainCircuit className="w-8 h-8 mr-3 text-indigo-400" /> AI Understanding
          </h2>
          <p className="text-slate-400 mt-2">
            Tổng hợp nhận thức của AI về doanh nghiệp sau phiên phỏng vấn.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Dữ liệu đã thu thập
            </h3>
            <ul className="space-y-3 text-sm text-emerald-100/80">
              {aiState.whatAiKnows && aiState.whatAiKnows.length > 0 ? (
                aiState.whatAiKnows.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-0.5">●</span> 
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li>Sử dụng dữ liệu Demo</li>
              )}
            </ul>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" /> Giả thuyết Tăng trưởng
            </h3>
            <p className="text-sm text-indigo-100/90 leading-relaxed italic">
              "{aiState.conclusion || "Mô hình cần chuẩn hóa dữ liệu khách hàng để tối ưu tỷ lệ chuyển đổi và vòng đời khách hàng, trước khi mở rộng quy mô."}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
