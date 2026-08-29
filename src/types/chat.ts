import { LucideIcon } from 'lucide-react';
import { DiagnosticData } from './diagnosis';

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
}

export interface AiCognitiveState {
  whatAiKnows: string[];
  whatAiDoesntKnow: string[];
  whatAiNeedsToAsk: string;
  conclusion: string;
  evidence: string;
  confidenceLevel: number;
}

export interface StepConfig {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface GeminiInterviewResponse {
  replyToUser: string;
  aiState: AiCognitiveState;
  isDataSufficientToConclude?: boolean;
  diagnosticData?: DiagnosticData;
}
