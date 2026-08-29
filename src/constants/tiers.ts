import { TierConfig } from '../types';

export const TIERS: Record<string, TierConfig> = {
  CRITICAL: { max: 20, label: 'CRITICAL', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/30', bar: 'bg-rose-500' },
  WEAK: { max: 40, label: 'WEAK', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', bar: 'bg-amber-500' },
  DEVELOPING: { max: 60, label: 'DEVELOPING', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', bar: 'bg-yellow-400' },
  STRONG: { max: 80, label: 'STRONG', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', bar: 'bg-emerald-400' },
  ADVANCED: { max: 100, label: 'ADVANCED', color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/30', bar: 'bg-indigo-400' },
  NA: { max: -1, label: 'N/A', color: 'text-slate-400', bg: 'bg-slate-800', border: 'border-slate-700', bar: 'bg-slate-600' }
};
