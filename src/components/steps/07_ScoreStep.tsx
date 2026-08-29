import React from 'react';
import { BarChart } from 'lucide-react';
import { SortedCriterionItem } from '../../types';
import { getTier } from '../../utils';

interface ScoreStepProps {
  sortedDataList: SortedCriterionItem[];
}

export const ScoreStep: React.FC<ScoreStepProps> = ({ sortedDataList }) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="mb-6">
          <h2 className="text-3xl font-black text-white flex items-center">
            <BarChart className="w-8 h-8 mr-3 text-indigo-400" /> Detailed Diagnostic Scores
          </h2>
          <p className="text-slate-400 mt-2">
            Bảng điểm chi tiết 13 tiêu chí chẩn đoán doanh nghiệp.
          </p>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {sortedDataList.map((item, idx) => {
            const tier = getTier(item.score);
            return (
              <div 
                key={item.id} 
                className={`p-4 flex items-center ${
                  idx !== sortedDataList.length - 1 ? 'border-b border-slate-800' : ''
                } hover:bg-slate-800/50 transition-colors`}
              >
                <div className="w-48 flex-shrink-0">
                  <h4 className="text-sm font-bold text-slate-200">{item.name}</h4>
                </div>
                <div className="flex-1 px-6">
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${tier.bar}`} 
                      style={{ width: `${typeof item.score === 'number' ? item.score : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-24 text-right flex-shrink-0 flex items-center justify-end">
                  <span className={`text-lg font-black mr-3 ${tier.color}`}>{item.score}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${tier.border} ${tier.color} uppercase font-bold w-20 text-center`}>
                    {tier.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
