import React from 'react';

interface FormatTextProps {
  text: string;
}

export const FormatText: React.FC<FormatTextProps> = ({ text }) => {
  if (!text) return null;
  // Bóc tách cả 3 trường hợp: **[Tag]**, [Tag], hoặc **Bold**
  const parts = text.split(/(\*\*\[.*?\]\*\*|\[.*?\]|\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        // Xử lý nhãn có in đậm **[Tag]**
        if (part.startsWith('**[') && part.endsWith(']**')) {
          const content = part.slice(3, -3);
          return (
            <span 
              key={i} 
              className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-900/40 border border-indigo-500/50 text-indigo-200 text-[11px] font-black uppercase tracking-widest mx-1 mb-1 shadow-[0_2px_10px_rgba(99,102,241,0.2)] align-middle"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2 shadow-[0_0_5px_rgba(99,102,241,0.8)] animate-pulse"></span>
              {content}
            </span>
          );
        }
        // Xử lý nhãn ngoặc vuông thông thường [Tag]
        if (part.startsWith('[') && part.endsWith(']')) {
          const content = part.slice(1, -1);
          return (
            <span 
              key={i} 
              className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-900/40 border border-indigo-500/50 text-indigo-200 text-[11px] font-black uppercase tracking-widest mx-1 mb-1 shadow-[0_2px_10px_rgba(99,102,241,0.2)] align-middle"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2 shadow-[0_0_5px_rgba(99,102,241,0.8)] animate-pulse"></span>
              {content}
            </span>
          );
        }
        // Xử lý in đậm thông thường
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};
