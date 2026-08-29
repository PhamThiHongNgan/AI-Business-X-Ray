import React from 'react';
import { Route } from 'lucide-react';
import { SortedCriterionItem } from '../../types';

interface RoadmapStepProps {
  sortedDataList: SortedCriterionItem[];
}

interface ColumnProps {
  title: string;
  desc: string;
  items: SortedCriterionItem[];
  color: string;
  border: string;
}

const RoadmapColumn: React.FC<ColumnProps> = ({ title, desc, items, color, border }) => (
  <div className={`flex-1 bg-slate-900 border ${border} rounded-2xl p-6 flex flex-col`}>
    <h3 className={`text-xl font-black ${color} mb-1`}>{title}</h3>
    <p className="text-xs text-slate-500 mb-6 font-medium">{desc}</p>
    <div className="space-y-4 flex-1">
      {items.map(item => (
        <div key={item.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <h4 className="text-sm font-bold text-white mb-2">{item.name}</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{item.recommendation}</p>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-sm text-slate-600 italic text-center mt-10">Không có hạng mục</div>
      )}
    </div>
  </div>
);

export const RoadmapStep: React.FC<RoadmapStepProps> = ({ sortedDataList }) => {
  const now = sortedDataList.filter(i => typeof i.score === 'number' && i.score <= 30);
  const next = sortedDataList.filter(i => typeof i.score === 'number' && i.score > 30 && i.score <= 60);
  const later = sortedDataList.filter(i => typeof i.score === 'number' && i.score > 60);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-8 h-full flex flex-col">
        <header>
          <h2 className="text-3xl font-black text-white flex items-center">
            <Route className="w-8 h-8 mr-3 text-indigo-400" /> Transformation Roadmap
          </h2>
          <p className="text-slate-400 mt-2">
            Lộ trình triển khai tự động dựa trên mức độ nghiêm trọng của các vấn đề.
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[500px]">
          <RoadmapColumn 
            title="Phase 1: NOW" 
            desc="Sửa chữa ngay (0 - 30 Ngày)" 
            items={now} 
            color="text-rose-400" 
            border="border-rose-500/30" 
          />
          <RoadmapColumn 
            title="Phase 2: NEXT" 
            desc="Tối ưu & Số hóa (30 - 90 Ngày)" 
            items={next} 
            color="text-amber-400" 
            border="border-amber-500/30" 
          />
          <RoadmapColumn 
            title="Phase 3: LATER" 
            desc="Mở rộng & AI (90+ Ngày)" 
            items={later} 
            color="text-emerald-400" 
            border="border-emerald-500/30" 
          />
        </div>
      </div>
    </div>
  );
};
