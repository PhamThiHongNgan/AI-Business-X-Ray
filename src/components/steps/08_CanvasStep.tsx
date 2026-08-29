import React from 'react';
import { LayoutDashboard, Zap } from 'lucide-react';
import { DiagnosticData } from '../../types';

interface CanvasStepProps {
  activeData: DiagnosticData;
}

export const CanvasStep: React.FC<CanvasStepProps> = ({ activeData }) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-2 flex items-center">
          <LayoutDashboard className="w-8 h-8 mr-3 text-indigo-400" /> Digital Business Canvas
        </h2>
        <p className="text-slate-400 mb-8">
          Bức tranh mô hình kinh doanh được AI tái cấu trúc từ dữ liệu thực tế.
        </p>
        
        <div className="grid grid-cols-5 gap-4 min-h-[600px]">
          <div className="col-span-1 bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Key Partners (Ecosystem)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              {activeData.ecosystem?.evidence || "Cần mạng lưới đối tác bổ trợ."}
            </p>
          </div>
          
          <div className="col-span-1 flex flex-col gap-4">
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Key Activities (Operations)
              </h3>
              <p className="text-sm text-slate-300">{activeData.operation?.evidence}</p>
              <div className="mt-3 text-xs text-amber-400 bg-amber-400/10 p-2 rounded">
                {activeData.operation?.recommendation}
              </div>
            </div>
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Key Resources (Data & Assets)
              </h3>
              <p className="text-sm text-slate-300">{activeData.dataMaturity?.evidence}</p>
            </div>
          </div>
          
          <div className="col-span-1 bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 w-full h-1 bg-indigo-500 left-0"></div>
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest text-center mb-4">
              Value Proposition
            </h3>
            <p className="text-base font-medium text-indigo-100 text-center leading-relaxed">
              {activeData.usp?.recommendation || "Cần xác định rõ lợi thế cạnh tranh."}
            </p>
            <div className="mt-6 text-xs text-indigo-300/70 text-center border-t border-indigo-500/20 pt-4">
              Current Issue: {activeData.usp?.reason}
            </div>
          </div>
          
          <div className="col-span-1 flex flex-col gap-4">
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Customer Relationships (Sales)
              </h3>
              <p className="text-sm text-slate-300">{activeData.sales?.evidence}</p>
              <div className="mt-3 text-xs text-emerald-400 bg-emerald-400/10 p-2 rounded">
                {activeData.sales?.recommendation}
              </div>
            </div>
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Channels (Marketing)
              </h3>
              <p className="text-sm text-slate-300">{activeData.marketing?.reason}</p>
            </div>
          </div>
          
          <div className="col-span-1 bg-emerald-900/10 border border-emerald-500/30 rounded-xl p-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
              Customer Segments
            </h3>
            <p className="text-sm text-emerald-100 mb-4">{activeData.customerInsight?.evidence}</p>
            <div className="mt-3 text-xs text-emerald-400 bg-emerald-500/20 p-2 rounded border border-emerald-500/30 font-medium">
              Action: {activeData.customerInsight?.recommendation}
            </div>
          </div>
          
          <div className="col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-4 min-h-[140px] flex flex-col justify-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Cost Structure (Scalability)
            </h3>
            <p className="text-sm text-rose-300">{activeData.scalability?.risk}</p>
            <p className="text-xs text-slate-400 mt-2">Nguyên nhân: {activeData.scalability?.reason}</p>
          </div>
          
          <div className="col-span-3 bg-teal-900/10 border border-teal-500/30 rounded-xl p-4 min-h-[140px] flex flex-col justify-center">
            <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
              Revenue Streams (Diversification)
            </h3>
            <p className="text-base text-teal-100 font-medium">{activeData.revenueDiv?.evidence}</p>
            <p className="text-sm text-teal-300 mt-2 flex items-center">
              <Zap className="w-4 h-4 mr-1" /> Solution: {activeData.revenueDiv?.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
