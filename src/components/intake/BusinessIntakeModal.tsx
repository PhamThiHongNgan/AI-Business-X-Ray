import React, { useState } from 'react';
import { Target, Building, Globe2, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import { FormInput, FormMultiSelect, FormRadio } from '../forms';
import { Q5_OPTIONS, Q8_OPTIONS, Q9_OPTIONS, Q10_OPTIONS, Q11_OPTIONS, Q12_OPTIONS } from '../../constants';
import { IntakeData } from '../../types';

interface BusinessIntakeModalProps {
  intakeData: IntakeData;
  onChangeIntakeData: (data: IntakeData) => void;
  onSubmit: () => void;
  isUpdate?: boolean;
}

export const BusinessIntakeModal: React.FC<BusinessIntakeModalProps> = ({
  intakeData,
  onChangeIntakeData,
  onSubmit,
  isUpdate = false
}) => {
  const [intakeStep, setIntakeStep] = useState<number>(1);

  const isValidIntakeStep = (step: number) => {
    if (step === 1) {
      return !!(
        intakeData.q1?.trim() && 
        intakeData.q2?.trim() && 
        intakeData.q3?.trim() && 
        intakeData.q4?.trim() && 
        intakeData.q5?.length > 0
      );
    }
    if (step === 2) {
      return !!(intakeData.q6?.trim() && intakeData.q7?.trim());
    }
    if (step === 3) {
      return !!intakeData.q13?.trim();
    }
    return true;
  };

  const nextIntakeStep = () => {
    if (isValidIntakeStep(intakeStep) && intakeStep < 3) {
      setIntakeStep(prev => prev + 1);
    }
  };

  const prevIntakeStep = () => {
    if (intakeStep > 1) setIntakeStep(prev => prev - 1);
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto bg-[#0B1120] animate-in slide-in-from-right duration-500">
      <div className="max-w-3xl mx-auto w-full pb-20">
        <div className="mb-10 sticky top-0 bg-[#0B1120] pt-4 pb-4 z-20 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-white flex items-center">
              <Target className="w-6 h-6 mr-3 text-indigo-500" /> BUSINESS INTAKE
            </h2>
            <div className="text-sm font-bold text-slate-400 bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
              {intakeStep} / 3
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500" 
              style={{ width: `${((intakeStep - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map(step => (
              <div 
                key={step} 
                className={`w-4 h-4 rounded-full relative z-10 transition-colors duration-500 border-2 ${
                  step <= intakeStep ? 'bg-indigo-500 border-indigo-400' : 'bg-slate-900 border-slate-700'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 italic text-center">
            Không cần câu trả lời hoàn hảo. Hãy cung cấp thông tin gần đúng nhất mà anh/chị biết.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          {intakeStep === 1 && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-indigo-400 mb-6 flex items-center border-b border-slate-800 pb-3">
                <Building className="w-5 h-5 mr-2" /> STEP 1: BUSINESS
              </h3>
              <FormInput 
                label="[Thông tin cơ bản] 01. Tên doanh nghiệp" 
                required 
                placeholder="Nhập tên doanh nghiệp..." 
                value={intakeData.q1} 
                onChange={v => onChangeIntakeData({ ...intakeData, q1: v })} 
              />
              <FormInput 
                label="[Lĩnh vực] 02. Doanh nghiệp đang hoạt động trong lĩnh vực nào?" 
                required 
                placeholder="Ví dụ: sản xuất thực phẩm, thương mại, giáo dục, logistics, dịch vụ..." 
                value={intakeData.q2} 
                onChange={v => onChangeIntakeData({ ...intakeData, q2: v })} 
              />
              <FormInput 
                type="textarea" 
                label="[Sản phẩm/Dịch vụ] 03. Doanh nghiệp đang bán sản phẩm, dịch vụ hoặc giải pháp gì?" 
                required 
                placeholder="Liệt kê các sản phẩm/dịch vụ chính..." 
                value={intakeData.q3} 
                onChange={v => onChangeIntakeData({ ...intakeData, q3: v })} 
              />
              <FormInput 
                type="textarea" 
                label="[Khách hàng] 04. Khách hàng chính của doanh nghiệp là ai?" 
                required 
                placeholder="Ví dụ: người tiêu dùng 25–45 tuổi, nhà hàng, trường học, doanh nghiệp SME..." 
                value={intakeData.q4} 
                onChange={v => onChangeIntakeData({ ...intakeData, q4: v })} 
              />
              <FormMultiSelect 
                label="[Thị trường] 05. Doanh nghiệp đang phục vụ thị trường nào?" 
                required 
                options={Q5_OPTIONS} 
                selected={intakeData.q5} 
                onChange={v => onChangeIntakeData({ ...intakeData, q5: v })} 
              />
            </div>
          )}

          {intakeStep === 2 && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-emerald-400 mb-6 flex items-center border-b border-slate-800 pb-3">
                <Globe2 className="w-5 h-5 mr-2" /> STEP 2: MARKET & POSITION
              </h3>
              <FormInput 
                type="textarea" 
                label="[Cạnh tranh] 06. Những đối thủ chính mà doanh nghiệp đang cạnh tranh là ai?" 
                required 
                placeholder="Nhập 3–5 đối thủ nếu biết. Nếu chưa xác định, điền 'Chưa xác định'." 
                value={intakeData.q6} 
                onChange={v => onChangeIntakeData({ ...intakeData, q6: v })} 
              />
              <FormInput 
                type="textarea" 
                label="[Khác biệt] 07. Theo anh/chị, tại sao khách hàng chọn doanh nghiệp thay vì đối thủ?" 
                required 
                placeholder="Ví dụ: giá, chất lượng, chuyên môn, thương hiệu, tốc độ, dịch vụ, vị trí, công nghệ..." 
                value={intakeData.q7} 
                onChange={v => onChangeIntakeData({ ...intakeData, q7: v })} 
              />
              <FormMultiSelect 
                label="[Mạng lưới] 08. Doanh nghiệp hiện đang có những mạng lưới nào?" 
                showOther 
                otherValue={intakeData.q8_other} 
                onOtherChange={v => onChangeIntakeData({ ...intakeData, q8_other: v })} 
                options={Q8_OPTIONS} 
                selected={intakeData.q8} 
                onChange={v => onChangeIntakeData({ ...intakeData, q8: v })} 
              />
              <FormMultiSelect 
                label="[Tài sản số] 09. Doanh nghiệp hiện đang sở hữu hoặc sử dụng những tài sản/kênh số nào?" 
                options={Q9_OPTIONS} 
                selected={intakeData.q9} 
                onChange={v => onChangeIntakeData({ ...intakeData, q9: v })} 
              />
            </div>
          )}

          {intakeStep === 3 && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-amber-400 mb-6 flex items-center border-b border-slate-800 pb-3">
                <Trophy className="w-5 h-5 mr-2" /> STEP 3: BUSINESS HEALTH
              </h3>
              <div className="mb-4 text-sm text-amber-500/70 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 italic">
                Thông tin tài chính ở câu 10 & 11 chỉ dùng để phân tích mô hình kinh doanh, không yêu cầu chính xác tuyệt đối.
              </div>
              
              <FormRadio 
                label="[Tài chính] 10. Doanh thu gần nhất của doanh nghiệp khoảng bao nhiêu?" 
                showOther={true} 
                otherPlaceholder="Nhập con số cụ thể nếu muốn..."
                otherValue={intakeData.q10_other} 
                onOtherChange={v => onChangeIntakeData({ ...intakeData, q10_other: v })} 
                options={Q10_OPTIONS} 
                selected={intakeData.q10} 
                onChange={v => onChangeIntakeData({ ...intakeData, q10: v })} 
              />
              
              <FormRadio 
                label="[Tăng trưởng] 11. So với năm trước, tình hình doanh thu hiện tại đang như thế nào?" 
                showOther={true} 
                otherPlaceholder="Ước tính khoảng bao nhiêu %?"
                otherValue={intakeData.q11_other} 
                onOtherChange={v => onChangeIntakeData({ ...intakeData, q11_other: v })} 
                options={Q11_OPTIONS} 
                selected={intakeData.q11} 
                onChange={v => onChangeIntakeData({ ...intakeData, q11: v })} 
              />
              
              <FormMultiSelect 
                label="[Vấn đề] 12. Hiện tại doanh nghiệp đang gặp những khó khăn/vướng mắc nào?" 
                max={3} 
                options={Q12_OPTIONS} 
                selected={intakeData.q12} 
                onChange={v => onChangeIntakeData({ ...intakeData, q12: v })} 
              />
              <FormInput 
                type="textarea" 
                label="[Ưu tiên] 13. Nếu chỉ được giải quyết MỘT vấn đề trong 90 ngày tới, anh/chị muốn giải quyết vấn đề nào nhất?" 
                required 
                placeholder="Điều gì khiến anh/chị quan tâm nhất lúc này?" 
                value={intakeData.q13} 
                onChange={v => onChangeIntakeData({ ...intakeData, q13: v })} 
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {intakeStep > 1 ? (
            <button 
              type="button"
              onClick={prevIntakeStep} 
              className="px-6 py-3 flex items-center text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 rounded-xl font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
            </button>
          ) : <div></div>}

          {intakeStep < 3 ? (
            <button 
              type="button"
              onClick={nextIntakeStep} 
              disabled={!isValidIntakeStep(intakeStep)}
              className="px-8 py-3 flex items-center bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-all rounded-xl font-bold shadow-lg shadow-indigo-500/20"
            >
              Tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={onSubmit} 
              disabled={!isValidIntakeStep(intakeStep)}
              className="px-8 py-3 flex items-center bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-all rounded-xl font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              {isUpdate ? "Cập nhật Hồ Sơ" : "🚀 Gửi thông tin & Bắt đầu AI Phân tích"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
