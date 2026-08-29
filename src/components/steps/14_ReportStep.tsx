import React from 'react';
import { Save, FileText, LayoutDashboard, Zap } from 'lucide-react';
import { 
  SortedCriterionItem, 
  OverallScoreResult, 
  AiCognitiveState, 
  BusinessProfile, 
  DiagnosticData 
} from '../../types';

interface ReportStepProps {
  businessProfile: BusinessProfile | null;
  diagnosticData: DiagnosticData | null;
  activeData: DiagnosticData;
  scoringResult: OverallScoreResult;
  sortedDataList: SortedCriterionItem[];
  aiState: AiCognitiveState;
  isPdfReady: boolean;
  isGeneratingPDF: boolean;
  onExportJson: () => void;
  onDownloadPDF: () => void;
}

export const ReportStep: React.FC<ReportStepProps> = ({
  businessProfile,
  diagnosticData,
  activeData,
  scoringResult,
  sortedDataList,
  aiState,
  isPdfReady,
  isGeneratingPDF,
  onExportJson,
  onDownloadPDF
}) => {
  const topStrength = sortedDataList[sortedDataList.length - 1];
  const topWeakness = sortedDataList[0];
  const bottlenecks = sortedDataList.filter(item => typeof item.score === 'number' && item.score <= 40);
  const now = sortedDataList.filter(i => typeof i.score === 'number' && i.score <= 30);
  const next = sortedDataList.filter(i => typeof i.score === 'number' && i.score > 30 && i.score <= 60);
  const later = sortedDataList.filter(i => typeof i.score === 'number' && i.score > 60);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-slate-800 text-slate-900 animate-in zoom-in-95 duration-500 print:bg-white print:p-0 print:overflow-visible">
      <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 p-5 rounded-xl border border-slate-700 shadow-lg print:hidden">
        <div className="text-slate-300 text-center md:text-left">
          <h3 className="font-bold text-lg text-white">Bản xem trước Báo Cáo Tổng Hợp</h3>
          <p className="text-xs text-slate-400 mt-1">
            Tài liệu này tổng hợp toàn bộ 13 lăng kính để lưu trữ hoặc xuất PDF.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={onExportJson}
            disabled={!businessProfile && !diagnosticData}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 text-sm font-bold rounded-lg border border-slate-600 transition-all flex items-center shadow-md hover:shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4 mr-2 text-emerald-400" /> Lưu phiên (JSON)
          </button>
          <button 
            onClick={onDownloadPDF}
            disabled={!isPdfReady || isGeneratingPDF}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 text-white font-bold rounded-lg shadow-lg transition-all flex items-center hover:shadow-indigo-500/25 cursor-pointer"
          >
            {isGeneratingPDF ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span> 
                Đang tạo PDF...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" /> 
                Tải Report (PDF)
              </>
            )}
          </button>
        </div>
      </div>

      <div 
        id="report-pdf-content"
        className="max-w-4xl mx-auto bg-white rounded-none shadow-2xl pb-10"
        style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
      >
        {/* ================= TRANG 1: EXECUTIVE SUMMARY ================= */}
        <div className="p-10">
          <div className="border-b-4 border-indigo-600 pb-6 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">EXECUTIVE X-RAY REPORT</h1>
              <p className="text-slate-500 mt-2 font-medium">Báo cáo Mật độ Trưởng thành Số & Tái cấu trúc</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-400 uppercase">Overall Score</div>
              <div className="text-6xl font-black text-indigo-600">{scoringResult.final}</div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">
              Kết Luận Chẩn Đoán (AI Conclusion)
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg italic bg-slate-50 p-4 rounded-lg border border-slate-100">
              "{aiState.conclusion || "Mô hình kinh doanh đang có sự chênh lệch lớn giữa năng lực bán hàng và nền tảng dữ liệu, cần tái cấu trúc nền tảng trước khi tăng trưởng nóng."}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
                Gen Trội (Core Strength)
              </h3>
              <div className="text-xl font-bold text-emerald-700 mb-2">
                {topStrength?.name} ({topStrength?.score}/100)
              </div>
              <p className="text-sm text-slate-700">{topStrength?.evidence}</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
              <h3 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-4">
                Gen Lặn (Critical Flaw)
              </h3>
              <div className="text-xl font-bold text-rose-700 mb-2">
                {topWeakness?.name} ({topWeakness?.score}/100)
              </div>
              <p className="text-sm text-slate-700 font-medium mb-2">{topWeakness?.risk}</p>
              <div className="text-sm bg-white p-2 rounded border border-rose-200 mt-3">
                <strong className="text-rose-600">Khuyến nghị:</strong> {topWeakness?.recommendation}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">
              Mức Độ Trưởng Thành (Maturity Levels)
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(scoringResult.groups).map(([key, group]) => (
                <div key={key} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-slate-800">{group.name}</h4>
                    <div className="font-black text-indigo-600">{group.score}</div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${group.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="html2pdf__page-break"></div>

        {/* ================= TRANG 2: CHI TIẾT ĐIỂM SỐ & ROOT CAUSE ================= */}
        <div className="p-10 border-t border-slate-200">
          <h3 className="text-2xl font-black text-slate-900 mb-6">Bảng Điểm Chi Tiết 13 Tiêu Chí</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mb-10">
            {sortedDataList.map((item, idx) => (
              <div 
                key={item.id} 
                className={`p-4 flex items-center ${idx !== sortedDataList.length - 1 ? 'border-b border-slate-200' : ''}`}
              >
                <div className="w-48 flex-shrink-0">
                  <h4 className="text-sm font-bold text-slate-700">{item.name}</h4>
                </div>
                <div className="flex-1 px-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-indigo-500" 
                      style={{ width: `${typeof item.score === 'number' ? item.score : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right">
                  <span className="font-black text-slate-800">{item.score}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-6">
            Phân Tích Nguyên Nhân Cốt Lõi (Bottlenecks)
          </h3>
          <div className="space-y-4">
            {bottlenecks.length > 0 ? bottlenecks.map((item, idx) => (
              <div key={item.id} className="p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-start">
                <div className="w-8 h-8 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-rose-800 mb-1">{item.name} (Điểm: {item.score})</h4>
                  <p className="text-sm text-slate-700 mb-2"><strong>Hiện trạng:</strong> {item.evidence}</p>
                  <p className="text-sm text-rose-700"><strong>Rủi ro:</strong> {item.risk}</p>
                </div>
              </div>
            )) : (
              <p className="text-slate-600">Không có vấn đề nghiêm trọng nào dưới 40 điểm.</p>
            )}
          </div>
        </div>

        <div className="html2pdf__page-break"></div>

        {/* ================= TRANG 3: DIGITAL BUSINESS CANVAS ================= */}
        <div className="p-10 border-t border-slate-200">
          <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center">
            <LayoutDashboard className="w-7 h-7 mr-3 text-indigo-600" /> Digital Business Canvas
          </h3>
          <p className="text-slate-500 mb-8 font-medium">
            Bức tranh mô hình kinh doanh được AI tái cấu trúc từ dữ liệu thực tế.
          </p>
          
          <div className="grid grid-cols-5 gap-4 min-h-[500px]">
            <div className="col-span-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                Key Partners (Ecosystem)
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                {activeData.ecosystem?.evidence || "Cần mạng lưới đối tác bổ trợ."}
              </p>
            </div>
            
            <div className="col-span-1 flex flex-col gap-4">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Key Activities (Operations)
                </h3>
                <p className="text-xs text-slate-800 font-medium">{activeData.operation?.evidence}</p>
                <div className="mt-3 text-[10px] text-amber-700 bg-amber-100/50 p-2 rounded border border-amber-200">
                  {activeData.operation?.recommendation}
                </div>
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Key Resources (Data & Assets)
                </h3>
                <p className="text-xs text-slate-800 font-medium">{activeData.dataMaturity?.evidence}</p>
              </div>
            </div>
            
            <div className="col-span-1 bg-indigo-50 border border-indigo-200 rounded-xl p-4 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 w-full h-1 bg-indigo-500 left-0"></div>
              <h3 className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest text-center mb-3">
                Value Proposition
              </h3>
              <p className="text-sm font-bold text-slate-800 text-center leading-relaxed">
                {activeData.usp?.recommendation || "Cần xác định rõ lợi thế cạnh tranh."}
              </p>
              <div className="mt-4 text-[10px] text-slate-500 text-center border-t border-indigo-100 pt-3">
                <strong className="text-rose-600">Vấn đề hiện tại:</strong> {activeData.usp?.reason}
              </div>
            </div>
            
            <div className="col-span-1 flex flex-col gap-4">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Customer Relationships (Sales)
                </h3>
                <p className="text-xs text-slate-800 font-medium">{activeData.sales?.evidence}</p>
                <div className="mt-3 text-[10px] text-emerald-700 bg-emerald-100/50 p-2 rounded border border-emerald-200">
                  {activeData.sales?.recommendation}
                </div>
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Channels (Marketing)
                </h3>
                <p className="text-xs text-slate-800 font-medium">{activeData.marketing?.reason}</p>
              </div>
            </div>
            
            <div className="col-span-1 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h3 className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-3">
                Customer Segments
              </h3>
              <p className="text-xs text-slate-800 font-medium mb-4">{activeData.customerInsight?.evidence}</p>
              <div className="mt-3 text-[10px] text-emerald-800 bg-white p-2 rounded border border-emerald-200 font-bold">
                Action: {activeData.customerInsight?.recommendation}
              </div>
            </div>
            
            <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-center">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Cost Structure (Scalability)
              </h3>
              <p className="text-xs font-bold text-rose-600">{activeData.scalability?.risk}</p>
              <p className="text-[10px] text-slate-600 mt-2">Nguyên nhân: {activeData.scalability?.reason}</p>
            </div>
            
            <div className="col-span-3 bg-teal-50 border border-teal-200 rounded-xl p-4 flex flex-col justify-center">
              <h3 className="text-[10px] font-bold text-teal-700 uppercase tracking-wider mb-2">
                Revenue Streams (Diversification)
              </h3>
              <p className="text-sm text-slate-800 font-bold">{activeData.revenueDiv?.evidence}</p>
              <p className="text-xs text-teal-700 mt-2 flex items-center font-bold">
                <Zap className="w-3 h-3 mr-1" /> Solution: {activeData.revenueDiv?.recommendation}
              </p>
            </div>
          </div>
        </div>

        <div className="html2pdf__page-break"></div>

        {/* ================= TRANG 4: ROADMAP ================= */}
        <div className="p-10 border-t border-slate-200">
          <h3 className="text-2xl font-black text-slate-900 mb-6">
            Lộ Trình Tái Cấu Trúc (Transformation Roadmap)
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white border border-rose-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-black text-rose-600 border-b border-rose-100 pb-2 mb-4">
                Phase 1: NOW (Sửa chữa ngay - 30 Ngày Tới)
              </h4>
              <div className="space-y-3">
                {now.map(item => (
                  <div key={item.id} className="text-sm text-slate-700">
                    <span className="font-bold text-slate-900 mr-2">• {item.name}:</span>
                    {item.recommendation}
                  </div>
                ))}
                {now.length === 0 && <div className="text-sm text-slate-500 italic">Không có hạng mục cấp bách.</div>}
              </div>
            </div>

            <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-black text-amber-600 border-b border-amber-100 pb-2 mb-4">
                Phase 2: NEXT (Tối ưu & Số hóa - 30 đến 90 Ngày)
              </h4>
              <div className="space-y-3">
                {next.map(item => (
                  <div key={item.id} className="text-sm text-slate-700">
                    <span className="font-bold text-slate-900 mr-2">• {item.name}:</span>
                    {item.recommendation}
                  </div>
                ))}
                {next.length === 0 && <div className="text-sm text-slate-500 italic">Không có hạng mục.</div>}
              </div>
            </div>

            <div className="bg-white border border-emerald-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-black text-emerald-600 border-b border-emerald-100 pb-2 mb-4">
                Phase 3: LATER (Mở rộng & AI - Sau 90 Ngày)
              </h4>
              <div className="space-y-3">
                {later.map(item => (
                  <div key={item.id} className="text-sm text-slate-700">
                    <span className="font-bold text-slate-900 mr-2">• {item.name}:</span>
                    {item.recommendation}
                  </div>
                ))}
                {later.length === 0 && <div className="text-sm text-slate-500 italic">Không có hạng mục.</div>}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
            Tài liệu được khởi tạo và chẩn đoán tự động bởi AI Business Architect Engine.
          </div>
        </div>
      </div>
    </div>
  );
};
