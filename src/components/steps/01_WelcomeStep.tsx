import React from 'react';
import { 
  Cpu, ArrowRight, Upload, Sparkles, RefreshCw, 
  CheckCircle2, Route, Database
} from 'lucide-react';
import { BusinessProfile } from '../../types';

interface WelcomeStepProps {
  businessProfile: BusinessProfile | null;
  onOpenIntake: () => void;
  onUnlockDemo: () => void;
  onImportFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
  businessProfile,
  onOpenIntake,
  onUnlockDemo,
  onImportFile
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 bg-[#050810]">
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        
        {/* HERO HEADER */}
        <div className="text-center pt-2 animate-in zoom-in-95 duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            Executive Transformation & Diagnostic Engine
          </div>

          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-indigo-600/30 to-emerald-500/20 rounded-3xl flex items-center justify-center mb-6 border border-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
            <Cpu className="w-10 h-10 text-indigo-400" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            AI BUSINESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400">X-RAY</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            Nền tảng chẩn đoán sức khỏe doanh nghiệp toàn diện qua <strong className="text-white font-bold">13 lăng kính quản trị</strong> và <strong className="text-white font-bold">14 bước chuẩn hóa</strong>. Phát hiện chính xác điểm nghẽn dòng tiền, tối ưu quy trình và xây dựng lộ trình tăng trưởng dựa trên dữ liệu.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-9 mb-4">
            <button 
              onClick={onOpenIntake}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center hover:scale-105 cursor-pointer text-base md:text-lg"
            >
              {businessProfile ? "Xem / Sửa Hồ Sơ Business Intake" : "🚀 Bắt đầu Khảo sát & Phỏng vấn AI"} 
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </button>
            <button 
              onClick={onUnlockDemo}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold rounded-2xl border border-slate-700/80 transition-all flex items-center justify-center cursor-pointer text-base md:text-lg shadow-lg hover:border-slate-600"
            >
              Xem Dashboard (Bản Demo)
            </button>
          </div>

          <div className="flex items-center justify-center pt-3">
            <label className="inline-flex items-center px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm md:text-base font-medium rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-md">
              <Upload className="w-4 h-4 mr-2.5 text-indigo-400" /> Nạp file đã lưu (.JSON) để phục hồi phiên làm việc
              <input type="file" accept=".json" onChange={onImportFile} className="hidden" />
            </label>
          </div>
        </div>

        {/* SECTION 1: LỘ TRÌNH 14 BƯỚC CHẨN ĐOÁN */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30 text-indigo-400 shadow-inner">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Lộ Trình Chẩn Đoán 14 Bước Hoàn Chỉnh
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Quy trình chuẩn hóa từ khảo sát ban đầu đến xuất Báo cáo Điều hành cho CEO / Ban Quản trị
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Giai đoạn 1 */}
            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-black text-xs">
                    1
                  </span>
                  <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
                    Giai đoạn 1
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  Bước 01 <ArrowRight className="w-4 h-4 text-indigo-400 inline" /> Bước 03
                </h3>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">01. Business Intake:</strong>
                        Khảo sát 13 câu hỏi định hình mô hình kinh doanh.
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">02. AI Challenger:</strong>
                        AI phỏng vấn phản biện đào sâu nguyên nhân gốc rễ (Root Cause).
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">03. AI Understanding:</strong>
                        Đúc kết tri thức và các giả định chiến lược ban đầu.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-700/50 text-xs font-semibold text-indigo-300/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                Mục tiêu: Đạt Confidence Level &ge; 85% để mở khóa Dashboard.
              </div>
            </div>

            {/* Giai đoạn 2 */}
            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60 flex flex-col justify-between hover:border-teal-500/40 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 font-black text-xs">
                    2
                  </span>
                  <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">
                    Giai đoạn 2
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  Bước 04 <ArrowRight className="w-4 h-4 text-teal-400 inline" /> Bước 08
                </h3>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">04 & 05. X-Ray & Maturity:</strong>
                        Chấm điểm 13 tiêu chí và xếp hạng 4 trụ cột doanh nghiệp.
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">06. Bottleneck Map:</strong>
                        Nhận diện điểm nghẽn nghiêm trọng (Điểm số &le; 40).
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">07 & 08. Score & Canvas:</strong>
                        Bảng điểm chi tiết và Digital Business Canvas 5 khối.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-700/50 text-xs font-semibold text-teal-300/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Mục tiêu: Bóc tách toàn diện thực trạng và rủi ro tiềm ẩn.
              </div>
            </div>

            {/* Giai đoạn 3 */}
            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60 flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-xs">
                    3
                  </span>
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    Giai đoạn 3
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  Bước 09 <ArrowRight className="w-4 h-4 text-amber-400 inline" /> Bước 14
                </h3>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">09 & 10. Priorities & Revenue:</strong>
                        Top 5 việc cần làm ngay và tối ưu 4 động cơ tăng trưởng.
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">11 & 12. Hypothesis & Roadmap:</strong>
                        Giả thuyết What-If và lộ trình thực thi Now / Next / Later.
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-300">
                        <strong className="text-white block font-bold mb-0.5">13 & 14. DNA & Report (PDF):</strong>
                        Gen cốt lõi và xuất Báo cáo Điều hành PDF 4 trang hoàn chỉnh.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-700/50 text-xs font-semibold text-amber-300/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Mục tiêu: Kế hoạch hành động 30 - 90 ngày sẵn sàng triển khai.
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: LỢI ÍCH KHI LƯU & CẬP NHẬT PHIÊN LÀM VIỆC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 md:p-8 bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 border border-indigo-500/30 shadow-inner">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Khi chỉnh sửa phiên làm việc sẽ được gì?
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-5">
              Bất kỳ lúc nào bạn cập nhật lại câu trả lời trong <strong className="text-indigo-300">Business Intake</strong> hoặc nạp dữ liệu tài chính/quy trình mới:
            </p>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-indigo-400 font-bold mr-2.5 text-base">✦</span>
                <span><strong className="text-white font-semibold">Tự động tái tính toán điểm số:</strong> Điểm số 13 tiêu chí và xếp hạng năng lực sẽ cập nhật tức thì theo dữ liệu mới.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 font-bold mr-2.5 text-base">✦</span>
                <span><strong className="text-white font-semibold">Tái định vị điểm nghẽn (Bottlenecks):</strong> Các cảnh báo rủi ro tự động thay đổi theo thứ tự ưu tiên sát với thực tế.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 font-bold mr-2.5 text-base">✦</span>
                <span><strong className="text-white font-semibold">Cập nhật lộ trình Roadmap:</strong> Các hành động Now (0-30 ngày) và Next (30-90 ngày) tự động sắp xếp lại tối ưu nhất.</span>
              </li>
            </ul>
          </div>

          <div className="p-7 md:p-8 bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 border border-emerald-500/30 shadow-inner">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Lưu trữ linh hoạt & Bảo mật dữ liệu
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-5">
              Toàn bộ dữ liệu chẩn đoán hoàn toàn thuộc quyền sở hữu của bạn:
            </p>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-emerald-400 font-bold mr-2.5 text-base">✦</span>
                <span><strong className="text-white font-semibold">Lưu file JSON về máy:</strong> Ở tab cuối (Executive Report) hoặc trong quá trình làm, bạn có thể tải file <code className="text-xs px-2 py-0.5 bg-slate-800 text-emerald-300 rounded border border-emerald-500/30">.json</code> về máy tính an toàn.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 font-bold mr-2.5 text-base">✦</span>
                <span><strong className="text-white font-semibold">Nạp lại phiên bất cứ lúc nào:</strong> Không cần làm lại từ đầu, chỉ cần tải file <code className="text-xs px-2 py-0.5 bg-slate-800 text-emerald-300 rounded border border-emerald-500/30">.json</code> lên để tiếp tục phiên tư vấn.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 font-bold mr-2.5 text-base">✦</span>
                <span><strong className="text-white font-semibold">Xuất PDF tiêu chuẩn báo cáo:</strong> Dễ dàng chia sẻ kết quả trực quan 4 trang định dạng A4 cho ban giám đốc hoặc đối tác.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
