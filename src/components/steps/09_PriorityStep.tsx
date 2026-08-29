import React from 'react';
import { CheckSquare } from 'lucide-react';
import { SortedCriterionItem } from '../../types';

interface PriorityStepProps {
  sortedDataList: SortedCriterionItem[];
}

export const PriorityStep: React.FC<PriorityStepProps> = ({ sortedDataList }) => {
  const priorities = sortedDataList.slice(0, 5); 

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="mb-6">
          <h2 className="text-3xl font-black text-white flex items-center">
            <CheckSquare className="w-8 h-8 mr-3 text-amber-500" /> Action Priorities
          </h2>
          <p className="text-slate-400 mt-2">
            Top 5 vấn đề cấp bách cần giải quyết ngay lập tức.
          </p>
        </header>
        <div className="space-y-4">
          {priorities.map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-start group hover:border-amber-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-black text-xl mr-6 flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                  {item.name} 
                  <span className="ml-3 px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">
                    Score: {item.score}
                  </span>
                </h3>
                <p className="text-sm text-slate-300 mb-3">
                  <span className="text-rose-400 font-medium">Risk:</span> {item.risk}
                </p>
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                  <span className="text-xs font-bold text-indigo-400 uppercase mr-2">Action Required:</span>
                  <span className="text-sm text-indigo-100">{item.recommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
