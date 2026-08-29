import React from 'react';
import { Cpu, Unlock, User } from 'lucide-react';
import { STEPS } from '../../constants';

interface SidebarProps {
  currentStepIndex: number;
  maxUnlockedStep: number;
  onSelectStep: (index: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentStepIndex,
  maxUnlockedStep,
  onSelectStep
}) => {
  return (
    <aside className="w-72 bg-[#0B1120] border-r border-slate-800 flex flex-col flex-shrink-0 z-20 print:hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center text-indigo-400 mb-1">
          <Cpu className="w-5 h-5 mr-2" />
          <span className="text-sm font-black tracking-widest">AI BUSINESS X-RAY</span>
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Diagnostic Platform
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isUnlocked = idx <= maxUnlockedStep;
          const isActive = idx === currentStepIndex;
          return (
            <button
              key={step.id}
              onClick={() => isUnlocked && onSelectStep(idx)}
              disabled={!isUnlocked}
              className={`w-full flex items-center p-3 rounded-lg text-sm transition-all text-left group
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : isUnlocked 
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' 
                    : 'text-slate-700 cursor-not-allowed'
                }
              `}
            >
              <Icon className={`w-4 h-4 mr-3 ${
                isActive ? 'text-white' : isUnlocked ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-700'
              }`} />
              <span className="flex-1 font-bold truncate">{step.label}</span>
              {!isUnlocked && <Unlock className="w-3 h-3 text-slate-700" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-300">CEO / Founder</div>
            <div className="text-[10px] text-emerald-400 flex items-center mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1 animate-pulse"></span> Online
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
