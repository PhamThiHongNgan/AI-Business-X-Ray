import { TIERS, SCORING_SCHEMA } from '../constants';
import { 
  DiagnosticData, 
  TierConfig, 
  OverallScoreResult, 
  SortedCriterionItem, 
  RadarDataPoint 
} from '../types';

export const getTier = (score: number | string | null | undefined): TierConfig => {
  if (score === "N/A" || score === null || score === undefined) return TIERS.NA;
  const numScore = typeof score === 'number' ? score : parseFloat(score as string);
  if (isNaN(numScore)) return TIERS.NA;

  if (numScore <= 20) return TIERS.CRITICAL;
  if (numScore <= 40) return TIERS.WEAK;
  if (numScore <= 60) return TIERS.DEVELOPING;
  if (numScore <= 80) return TIERS.STRONG;
  return TIERS.ADVANCED;
};

export const calculateOverallScore = (data: DiagnosticData): OverallScoreResult => {
  const groups: OverallScoreResult['groups'] = {};
  let totalFundamentalsScore = 0;
  
  (Object.keys(SCORING_SCHEMA) as Array<keyof typeof SCORING_SCHEMA>).forEach(groupKey => {
    const groupDef = SCORING_SCHEMA[groupKey];
    let groupWeightedScore = 0;
    let validWeightSum = 0;

    groupDef.items.forEach(item => {
      const criteriaData = data[item.id];
      if (criteriaData && criteriaData.score !== "N/A" && typeof criteriaData.score === 'number') {
        groupWeightedScore += criteriaData.score * item.weight;
        validWeightSum += item.weight;
      }
    });

    const groupFinalScore = validWeightSum > 0 ? (groupWeightedScore / validWeightSum) : 0;
    groups[groupKey] = { 
      name: groupDef.label, 
      score: Math.round(groupFinalScore), 
      weight: groupDef.weight 
    };
    if (groupKey === 'fundamentals') totalFundamentalsScore = groupFinalScore;
  });

  let overallRaw = 0;
  let totalGroupWeight = 0;
  Object.values(groups).forEach(g => { 
    overallRaw += g.score * g.weight; 
    totalGroupWeight += g.weight; 
  });

  let finalCalculatedScore = totalGroupWeight > 0 ? Math.round(overallRaw / totalGroupWeight) : 0;
  
  let penaltyApplied = false;
  const rawScoreBeforePenalty = finalCalculatedScore;
  
  // Penalty rule: If fundamentals < 40 and overall > 50, cap at 50
  if (totalFundamentalsScore < 40 && finalCalculatedScore > 50) {
    finalCalculatedScore = 50;
    penaltyApplied = true;
  }

  return { 
    final: finalCalculatedScore, 
    raw: rawScoreBeforePenalty, 
    fundamentalsScore: totalFundamentalsScore, 
    penaltyApplied, 
    groups 
  };
};

export const getSortedCriteria = (data: DiagnosticData): SortedCriterionItem[] => {
  return Object.keys(data)
    .filter(k => data[k] && data[k]?.score !== "N/A")
    .map(k => {
      let name = k;
      Object.values(SCORING_SCHEMA).forEach(group => {
        const found = group.items.find(i => i.id === k);
        if (found) name = found.name;
      });
      return { 
        id: k, 
        name, 
        ...(data[k] as NonNullable<typeof data[string]>) 
      };
    })
    .sort((a, b) => {
      const scoreA = typeof a.score === 'number' ? a.score : 0;
      const scoreB = typeof b.score === 'number' ? b.score : 0;
      return scoreA - scoreB;
    });
};

export const getRadarData = (data: DiagnosticData): RadarDataPoint[] => {
  const flatData: RadarDataPoint[] = [];
  Object.values(SCORING_SCHEMA).forEach(group => {
    group.items.forEach(item => {
      const criteriaData = data[item.id];
      const itemScore = (criteriaData && typeof criteriaData.score === 'number') ? criteriaData.score : 0;
      flatData.push({ 
        subject: item.name, 
        score: criteriaData?.score === "N/A" ? 0 : itemScore, 
        fullMark: 100 
      });
    });
  });
  return flatData;
};
