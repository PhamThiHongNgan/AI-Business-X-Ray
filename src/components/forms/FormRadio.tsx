import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FormRadioProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
  showOther?: boolean;
  otherValue?: string;
  onOtherChange?: (val: string) => void;
  required?: boolean;
  otherPlaceholder?: string;
}

export const FormRadio: React.FC<FormRadioProps> = ({ 
  label, 
  options, 
  selected, 
  onChange, 
  showOther, 
  otherValue = '', 
  onOtherChange, 
  required, 
  otherPlaceholder 
}) => (
  <div className="mb-6">
    <label className="block text-base font-bold text-slate-300 mb-2">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="flex flex-col gap-2 mb-3">
      {options.map(opt => {
        const isSelected = selected === opt;
        return (
          <label 
            key={opt} 
            onClick={(e) => {
              e.preventDefault();
              onChange(opt);
            }} 
            className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
              isSelected 
                ? 'bg-indigo-900/30 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center transition-colors ${
              isSelected ? 'border-indigo-500 bg-indigo-500/20' : 'border-slate-500 bg-slate-900'
            }`}>
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
            </div>
            <span className={`flex-1 text-base ${isSelected ? 'text-indigo-200 font-bold' : 'text-slate-300'}`}>
              {opt}
            </span>
            {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-500 opacity-80" />}
          </label>
        );
      })}
    </div>
    {/* Hiển thị input khi showOther và không chọn các options đặc biệt */}
    {showOther && selected !== '' && !["Không muốn cung cấp", "Chưa xác định"].includes(selected) && onOtherChange && (
      <div className="animate-in slide-in-from-top-2 duration-300 mt-2">
        <input
          type="text" 
          value={otherValue} 
          onChange={e => onOtherChange(e.target.value)} 
          placeholder={otherPlaceholder || "Ghi chú thêm hoặc nhập số cụ thể (nếu muốn)..."}
          className="w-full bg-slate-900/80 border border-slate-600 text-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 transition-colors text-base placeholder:text-slate-500 shadow-inner"
        />
      </div>
    )}
  </div>
);
