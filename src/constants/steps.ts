import { 
  Target, MessageSquare, BrainCircuit, Activity, Layers, 
  ShieldAlert, BarChart, LayoutDashboard, CheckSquare, LineChart, 
  Lightbulb, Route, Dna, FileText 
} from 'lucide-react';
import { StepConfig } from '../types';

export const STEPS: StepConfig[] = [
  { id: 'welcome', label: '01. Welcome', icon: Target },
  { id: 'interview', label: '02. Business Interview', icon: MessageSquare },
  { id: 'understanding', label: '03. AI Understanding', icon: BrainCircuit },
  { id: 'xray', label: '04. Business X-Ray', icon: Activity },
  { id: 'level', label: '05. Business Level', icon: Layers },
  { id: 'bottlenecks', label: '06. Bottleneck Map', icon: ShieldAlert },
  { id: 'score', label: '07. Digital Score', icon: BarChart },
  { id: 'canvas', label: '08. Digital Canvas', icon: LayoutDashboard },
  { id: 'priority', label: '09. Priority', icon: CheckSquare },
  { id: 'revenue', label: '10. Revenue Engine', icon: LineChart },
  { id: 'hypothesis', label: '11. Revenue Hypothesis', icon: Lightbulb },
  { id: 'roadmap', label: '12. Roadmap', icon: Route },
  { id: 'dna', label: '13. Business DNA', icon: Dna },
  { id: 'report', label: '14. Executive Report', icon: FileText },
];
