export interface CriterionData {
  score: number | "N/A";
  evidence: string;
  reason: string;
  risk: string;
  recommendation: string;
}

export interface DiagnosticData {
  businessValue?: CriterionData;
  usp?: CriterionData;
  customerInsight?: CriterionData;
  management?: CriterionData;
  marketing?: CriterionData;
  sales?: CriterionData;
  revenueDiv?: CriterionData;
  scalability?: CriterionData;
  operation?: CriterionData;
  dataMaturity?: CriterionData;
  digitalAssets?: CriterionData;
  aiReadiness?: CriterionData;
  ecosystem?: CriterionData;
  [key: string]: CriterionData | undefined;
}

export interface SchemaItem {
  id: string;
  name: string;
  weight: number;
}

export interface SchemaGroup {
  label: string;
  weight: number;
  items: SchemaItem[];
}

export interface ScoringSchema {
  fundamentals: SchemaGroup;
  growth: SchemaGroup;
  dataOps: SchemaGroup;
  advancedTech: SchemaGroup;
}

export interface TierConfig {
  max: number;
  label: string;
  color: string;
  bg: string;
  border: string;
  bar: string;
}

export interface GroupScoreResult {
  name: string;
  score: number;
  weight: number;
}

export interface OverallScoreResult {
  final: number;
  raw: number;
  fundamentalsScore: number;
  penaltyApplied: boolean;
  groups: Record<string, GroupScoreResult>;
}

export interface SortedCriterionItem extends CriterionData {
  id: string;
  name: string;
}

export interface RadarDataPoint {
  subject: string;
  score: number;
  fullMark: number;
}
