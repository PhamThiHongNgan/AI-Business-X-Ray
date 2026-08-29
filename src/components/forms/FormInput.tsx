import React from 'react';

interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  type?: 'text' | 'textarea';
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = "text", 
  required 
}) => (
  <div className="mb-6">
    <label className="block text-base font-bold text-slate-300 mb-2">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 p-4 rounded-xl outline-none focus:border-indigo-500 transition-colors resize-none h-28 text-base placeholder:text-slate-600"
      />
    ) : (
      <input
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full bg-slate-900/50 border border-slate-700 text-slate-200 p-4 rounded-xl outline-none focus:border-indigo-500 transition-colors text-base placeholder:text-slate-600"
      />
    )}
  </div>
);
