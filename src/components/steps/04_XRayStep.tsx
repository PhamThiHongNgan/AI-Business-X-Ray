import React from 'react';
import { Activity } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip as RechartsTooltip 
} from 'recharts';
import { OverallScoreResult, RadarDataPoint } from '../../types';
import { getTier } from '../../utils';

interface XRayStepProps {
  scoringResult: OverallScoreResult;
  radarData: RadarDataPoint[];
}

export const XRayStep: React.FC<XRayStepProps> = ({ scoringResult, radarData }) => {
  const currentTier = getTier(scoringResult.final);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0B1120] animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-white flex items-center">
            <Activity className="w-8 h-8 mr-3 text-indigo-400" /> Business X-Ray
          </h2>
          <p className="text-slate-400 mt-2">
            Đánh giá sức khỏe tổng thể qua 13 lăng kính quản trị.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center h-[400px]">
            <div className={`absolute top-0 w-full h-1 ${currentTier.bg.replace('/10','')} bg-opacity-100`}></div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
              Digital Business Score
            </h3>
            <div className={`text-9xl font-black mb-4 ${currentTier.color}`}>
              {scoringResult.final}
            </div>
            <div className={`px-6 py-2 rounded-full text-sm font-bold border ${currentTier.border} ${currentTier.color}`}>
              {currentTier.label}
            </div>
            {scoringResult.penaltyApplied && (
              <div className="mt-6 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-xs text-rose-300 text-left">
                <strong>Cảnh báo Penalty:</strong> Điểm bị giới hạn ở 50 do Business Fundamentals quá yếu. Không nên áp dụng công nghệ số hóa vào một quy trình đang lỗi.
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-[400px] flex flex-col">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-indigo-400" /> Biểu đồ Năng lực Cốt lõi
            </h3>
            <div className="flex-1 w-full relative -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569' }} />
                  <Radar 
                    name="Score" 
                    dataKey="score" 
                    stroke="#6366f1" 
                    strokeWidth={2} 
                    fill="#6366f1" 
                    fillOpacity={0.4} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
