import { ScoringSchema } from '../types';

export const SCORING_SCHEMA: ScoringSchema = {
  fundamentals: {
    label: 'Business Fundamentals',
    weight: 40,
    items: [
      { id: 'businessValue', name: 'Business Value', weight: 10 },
      { id: 'usp', name: 'USP & Differentiation', weight: 10 },
      { id: 'customerInsight', name: 'Customer Insight', weight: 10 },
      { id: 'management', name: 'Management', weight: 10 }
    ]
  },
  growth: {
    label: 'Growth & Revenue',
    weight: 25,
    items: [
      { id: 'marketing', name: 'Marketing', weight: 7 },
      { id: 'sales', name: 'Sales System', weight: 8 },
      { id: 'revenueDiv', name: 'Revenue Diversification', weight: 5 },
      { id: 'scalability', name: 'Scalability', weight: 5 }
    ]
  },
  dataOps: {
    label: 'Data & Operations',
    weight: 20,
    items: [
      { id: 'operation', name: 'Operation', weight: 7 },
      { id: 'dataMaturity', name: 'Data Maturity', weight: 8 },
      { id: 'digitalAssets', name: 'Digital Assets', weight: 5 }
    ]
  },
  advancedTech: {
    label: 'AI & Ecosystem',
    weight: 15,
    items: [
      { id: 'aiReadiness', name: 'AI Readiness', weight: 8 },
      { id: 'ecosystem', name: 'Ecosystem', weight: 7 }
    ]
  }
};
