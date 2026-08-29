import React from 'react';
import { Dna } from 'lucide-react';
import { SortedCriterionItem, AiCognitiveState } from '../../types';

interface DNAStepProps {
  sortedDataList: SortedCriterionItem[];
  aiState: AiCognitiveState;
}

export const DNAStep: React.FC<DNAStepProps> = ({ sortedDataList, aiState }) => {
  const topStrength = sortedDataList[sortedDataList.length - 1];
  const topWeakness = sortedDataList[0];

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-white flex items-center">
            <Dna className="w-8 h-8 mr-3 text-teal-400" /> Business DNA Profile
          </h2>
          <p className="text-slate-400 mt-2">
            Hồ sơ phân tích "Gen" cốt lõi của doanh nghiệp.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-3 bg-slate-900 border border-slate-700 p-8 rounded-2xl flex items-center justify-between overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10">
              <Dna className="w-64 h-64 text-indigo-500" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">
                Chuỗi Gen Hiện Tại
              </h3>
              <p className="text-xl text-slate-200 leading-relaxed font-medium">
                {aiState.conclusion || "Mô hình kinh doanh đang có sự chênh lệch lớn giữa năng lực bán hàng và nền tảng dữ liệu, cần tái cấu trúc nền tảng trước khi tăng trưởng nóng."}
              </p>
            </div>
          </div>

          <div className="bg-emerald-900/10 border border-emerald-500/30 p-6 rounded-xl flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Gen Trội (Core Strength)
            </h4>
            <div className="flex-1">
              <div className="text-2xl font-black text-white mb-2">{topStrength?.name}</div>
              <div className="text-sm text-slate-400 mb-4">{topStrength?.evidence}</div>
            </div>
            <div className="text-xs bg-emerald-500/20 text-emerald-300 p-3 rounded-lg">
              <strong>Lợi thế:</strong> Đây là đòn bẩy chính của bạn, cần tận dụng tối đa để tạo đà chuyển đổi.
            </div>
          </div>

          <div className="bg-rose-900/10 border border-rose-500/30 p-6 rounded-xl flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-4">
              Gen Lặn (Core Weakness)
            </h4>
            <div className="flex-1">
              <div className="text-2xl font-black text-white mb-2">{topWeakness?.name}</div>
              <div className="text-sm text-slate-400 mb-4">{topWeakness?.evidence}</div>
            </div>
            <div className="text-xs bg-rose-500/20 text-rose-300 p-3 rounded-lg">
              <strong>Rủi ro:</strong> Yếu tố chí tử cản trở sự phát triển, {topWeakness?.risk}
            </div>
          </div>

          <div className="bg-indigo-900/10 border border-indigo-500/30 p-6 rounded-xl flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4">
              Hướng Đột Biến (Evolution)
            </h4>
            <div className="flex-1">
              <div className="text-xl font-bold text-white mb-2">Số hóa & Tự động hóa</div>
              <div className="text-sm text-slate-400 mb-4">
                Chuyển dịch từ mô hình phụ thuộc con người sang hệ thống Data-Driven.
              </div>
            </div>
            <div className="text-xs bg-indigo-500/20 text-indigo-300 p-3 rounded-lg">
              <strong>Ưu tiên:</strong> {topWeakness?.recommendation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
