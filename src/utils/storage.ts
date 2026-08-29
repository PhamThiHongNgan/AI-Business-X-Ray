import { IntakeData, BusinessProfile, ChatMessage, AiCognitiveState, DiagnosticData } from '../types';

export interface SavedSessionState {
  intakeData?: IntakeData;
  businessProfile?: BusinessProfile | null;
  messages?: ChatMessage[];
  aiState?: AiCognitiveState;
  diagnosticData?: DiagnosticData | null;
  maxUnlockedStep?: number;
  currentStepIndex?: number;
  timestamp?: string;
}

export const saveSessionToJson = (state: SavedSessionState) => {
  const payload = {
    ...state,
    timestamp: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `AI_Business_XRay_${new Date().getTime()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const loadSessionFromJson = (file: File): Promise<SavedSessionState> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        resolve(parsed);
      } catch (err) {
        reject(new Error("File JSON không hợp lệ"));
      }
    };
    reader.onerror = () => reject(new Error("Không thể đọc file"));
    reader.readAsText(file);
  });
};
