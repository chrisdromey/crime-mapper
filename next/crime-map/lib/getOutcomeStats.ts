import { CrimeDataPoint, CrimeSpot } from "../types/types";

type OutcomeCount = {
  outcome: string
  count: number
}

export default function getOutcomeStats(crimeData: CrimeDataPoint[]): OutcomeCount[] {
  const uniqueOutcomes = [...new Set(crimeData.map(c => c.outcome_status?.category))]
  return uniqueOutcomes.map(outcome => {
    const count = crimeData.filter(c => c.outcome_status?.category === outcome).length

    return {
      outcome: outcome || 'missing data',
      count
    }
  }
  )
}