import React from 'react';
import { Loader2, Check } from 'lucide-react';

interface LoadingOverlayProps {
  status: number; // 1 to 5
}

const STEPS_LIST = [
  { step: 1, text: "Đã xác định mô hình kinh doanh" },
  { step: 2, text: "Đã xác định khách hàng và thị trường" },
  { step: 3, text: "Đã phân tích vị thế cạnh tranh" },
  { step: 4, text: "Đã phân tích tình hình kinh doanh" },
  { step: 5, text: "Đang xác định các vấn đề cần đào sâu..." },
];

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ status }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#050810] animate-in fade-in duration-300 relative">
      <div className="absolute inset-0 bg-indigo-900/10 z-0"></div>
      <div className="relative z-10 flex flex-col items-center max-w-md w-full bg-slate-900/80 p-8 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-md">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-8">AI đang đọc hồ sơ doanh nghiệp...</h3>
        
        <div className="w-full space-y-4">
          {STEPS_LIST.map(item => (
            <div key={item.step} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 transition-all duration-500 ${
                status > item.step 
                  ? 'bg-emerald-500/20 text-emerald-500' 
                  : status === item.step 
                    ? 'bg-indigo-500 text-white animate-pulse' 
                    : 'bg-slate-800 text-slate-600'
              }`}>
                {status > item.step ? (
                  <Check className="w-4 h-4" />
                ) : status === item.step ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-all duration-500 ${status >= item.step ? 'text-slate-200' : 'text-slate-600'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
