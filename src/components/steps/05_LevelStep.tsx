import React from 'react';
import { Layers } from 'lucide-react';
import { OverallScoreResult } from '../../types';
import { getTier } from '../../utils';

interface LevelStepProps {
  scoringResult: OverallScoreResult;
}

export const LevelStep: React.FC<LevelStepProps> = ({ scoringResult }) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-white flex items-center">
            <Layers className="w-8 h-8 mr-3 text-indigo-400" /> Business Maturity Level
          </h2>
          <p className="text-slate-400 mt-2">
            Phân tích mức độ trưởng thành theo 4 nhóm năng lực chính.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(scoringResult.groups).map(([key, group]) => {
            const tier = getTier(group.score);
            return (
              <div 
                key={key} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-600 transition-all"
              >
                <div className={`absolute top-0 w-full h-1 left-0 ${tier.bar}`}></div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">{group.name}</h3>
                  <div className={`text-3xl font-black ${tier.color}`}>{group.score}</div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
                  <div className={`h-3 rounded-full ${tier.bar}`} style={{ width: `${group.score}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mt-4">
                  <span>Trọng số: {group.weight}%</span>
                  <span className={tier.color}>{tier.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
