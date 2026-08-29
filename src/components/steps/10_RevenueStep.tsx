import React from 'react';
import { LineChart } from 'lucide-react';
import { DiagnosticData } from '../../types';
import { SCORING_SCHEMA } from '../../constants';
import { getTier } from '../../utils';

interface RevenueStepProps {
  activeData: DiagnosticData;
}

export const RevenueStep: React.FC<RevenueStepProps> = ({ activeData }) => {
  const revKeys = ['marketing', 'sales', 'revenueDiv', 'scalability'];

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-white flex items-center">
            <LineChart className="w-8 h-8 mr-3 text-emerald-500" /> Revenue Engine
          </h2>
          <p className="text-slate-400 mt-2">
            Động cơ tăng trưởng và khả năng mở rộng quy mô.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {revKeys.map(key => {
            const item = activeData[key];
            const name = SCORING_SCHEMA.growth.items.find(i => i.id === key)?.name;
            const tier = getTier(item?.score);
            return (
              <div key={key} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
                <div className={`absolute right-0 top-0 w-2 h-full ${tier.bar}`}></div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <span className={`text-2xl font-black ${tier.color}`}>{item?.score || 0}</span>
                </div>
                <div className="space-y-3">
                  <div className="text-sm text-slate-300">
                    <span className="text-slate-500 font-medium">Hiện trạng:</span> {item?.evidence}
                  </div>
                  <div className="text-sm text-slate-300">
                    <span className="text-slate-500 font-medium">Nguyên nhân:</span> {item?.reason}
                  </div>
                  <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-200">
                    <span className="font-bold text-emerald-400 mr-2">Giải pháp:</span> {item?.recommendation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
