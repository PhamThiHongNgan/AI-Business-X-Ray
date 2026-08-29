import React from 'react';
import { Check } from 'lucide-react';

interface FormMultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  max?: number;
  showOther?: boolean;
  otherValue?: string;
  onOtherChange?: (val: string) => void;
  required?: boolean;
}

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({ 
  label, 
  options, 
  selected, 
  onChange, 
  max, 
  showOther, 
  otherValue = '', 
  onOtherChange, 
  required 
}) => {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(i => i !== opt));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-base font-bold text-slate-300 mb-2">
        {label} {required && <span className="text-rose-500">*</span>}
        {max && <span className="text-slate-500 font-normal ml-2">(Chọn tối đa {max})</span>}
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {options.map(opt => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all duration-300 flex items-center ${
                isSelected 
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)] scale-[1.02]' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800'
              } ${max && !isSelected && selected.length >= max ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSelected && <Check className="w-4 h-4 mr-1.5 text-indigo-400" />}
              {opt}
            </button>
          );
        })}
      </div>
      {showOther && selected.includes("Khác") && onOtherChange && (
        <input
          type="text" 
          value={otherValue} 
          onChange={e => onOtherChange(e.target.value)} 
          placeholder="Vui lòng mô tả chi tiết..."
          className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 transition-colors text-base placeholder:text-slate-600 mt-2"
        />
      )}
    </div>
  );
};
