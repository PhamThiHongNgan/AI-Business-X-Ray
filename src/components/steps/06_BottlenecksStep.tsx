import React from 'react';
import { ShieldAlert, AlertCircle } from 'lucide-react';
import { SortedCriterionItem } from '../../types';

interface BottlenecksStepProps {
  sortedDataList: SortedCriterionItem[];
}

export const BottlenecksStep: React.FC<BottlenecksStepProps> = ({ sortedDataList }) => {
  const bottlenecks = sortedDataList.filter(item => typeof item.score === 'number' && item.score <= 40);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-white flex items-center">
            <ShieldAlert className="w-8 h-8 mr-3 text-rose-500" /> Root Cause Analysis
          </h2>
          <p className="text-slate-400 mt-2">
            Các vấn đề nghiêm trọng cản trở sự phát triển (Điểm số &le; 40).
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bottlenecks.length > 0 ? bottlenecks.map(item => (
            <div key={item.id} className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertCircle className="w-24 h-24 text-rose-500" />
              </div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center mr-4">
                  <span className="text-rose-500 font-black">{item.score}</span>
                </div>
                <h4 className="text-lg font-bold text-rose-200">{item.name}</h4>
              </div>
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="text-xs font-bold text-rose-500/70 uppercase mb-1">Thực trạng</div>
                  <p className="text-sm text-slate-300">{item.evidence}</p>
                </div>
                <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                  <div className="text-xs font-bold text-rose-400 uppercase mb-1">Rủi ro (Impact)</div>
                  <p className="text-sm text-rose-100">{item.risk}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-2 p-8 text-center text-emerald-400 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl">
              Không phát hiện vấn đề nghiêm trọng (Tất cả chỉ số đều &gt; 40).
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
