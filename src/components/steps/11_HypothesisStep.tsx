import React from 'react';
import { Lightbulb, Target, Activity } from 'lucide-react';
import { DiagnosticData } from '../../types';

interface HypothesisStepProps {
  activeData: DiagnosticData;
}

export const HypothesisStep: React.FC<HypothesisStepProps> = ({ activeData }) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-white flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-yellow-400" /> Revenue Hypothesis
          </h2>
          <p className="text-slate-400 mt-2">
            Các giả định "What-If" để bứt phá doanh thu dựa trên hiện trạng.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mb-4 border border-yellow-400/30">
              <Target className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Giả thuyết #1: Tối ưu Phễu & Khách hàng cũ
            </h3>
            <p className="text-sm text-slate-400 mb-6 italic">
              "{activeData.marketing?.reason}"
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700">
                <div className="text-xs font-bold text-slate-500 uppercase mb-1">Hành động cốt lõi</div>
                <div className="text-sm text-slate-200">
                  {activeData.marketing?.recommendation} & {activeData.customerInsight?.recommendation}
                </div>
              </div>
              <div className="p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
                <div className="text-xs font-bold text-emerald-500 uppercase mb-1">Tác động kỳ vọng (Impact)</div>
                <div className="text-sm text-emerald-200 font-medium">
                  Giảm rủi ro phụ thuộc quảng cáo, có thể giúp giảm CAC xuống 30% và cải thiện LTV.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
            <div className="w-12 h-12 bg-indigo-400/20 rounded-full flex items-center justify-center mb-4 border border-indigo-400/30">
              <Activity className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Giả thuyết #2: Đột phá Chuỗi giá trị
            </h3>
            <p className="text-sm text-slate-400 mb-6 italic">
              "{activeData.revenueDiv?.reason}"
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700">
                <div className="text-xs font-bold text-slate-500 uppercase mb-1">Hành động cốt lõi</div>
                <div className="text-sm text-slate-200">
                  {activeData.revenueDiv?.recommendation} & {activeData.businessValue?.recommendation}
                </div>
              </div>
              <div className="p-4 bg-indigo-900/20 rounded-xl border border-indigo-500/20">
                <div className="text-xs font-bold text-indigo-400 uppercase mb-1">Tác động kỳ vọng (Impact)</div>
                <div className="text-sm text-indigo-200 font-medium">
                  Đa dạng hóa dòng tiền, chuyển từ bán đứt sang doanh thu định kỳ (ARR), biên lợi nhuận cao hơn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
