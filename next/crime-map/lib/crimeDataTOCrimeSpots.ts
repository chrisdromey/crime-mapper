import { CrimeDataLocation, CrimeDataPoint, CrimeSpot, CrimeSummery } from "../types/types";

export default function convertToCrimeSpots(crimeData: CrimeDataPoint[]): CrimeSpot[] {
  const crimeSpots: CrimeSpot[] = []
  
  crimeData.forEach(crimeDataPoint => {
    const isSameLocation = getSameLocationFilter(crimeDataPoint)
    let crimeSpotForLocation: CrimeSpot = crimeSpots.filter(isSameLocation)[0] 
    
    if (!crimeSpotForLocation){
      crimeSpotForLocation = newCrimeSpot(crimeDataPoint.location)
      crimeSpots.push(crimeSpotForLocation)
    }
    crimeSpotForLocation.crimes.push(generateSummery(crimeDataPoint))
  })

  return crimeSpots
}

function newCrimeSpot(location: CrimeDataLocation): CrimeSpot {
  return {
    location,
    crimes: []
  }
}

function getSameLocationFilter(crimeDataPoint: CrimeDataPoint) {
  return (crimeSpot: CrimeSpot) => {
    return crimeSpot.location.longitude === crimeDataPoint.location.longitude &&
      crimeSpot.location.latitude === crimeDataPoint.location.latitude
  }
}

function generateSummery(crimeDataPoint:CrimeDataPoint): CrimeSummery {
  return {
    id: crimeDataPoint.id,
    category: crimeDataPoint.category,
    outcome: crimeDataPoint.outcome_status?.category || 'UNKNOWN',
    month: crimeDataPoint.month,
    location: {
      lat: crimeDataPoint.location.latitude,
      lng: crimeDataPoint.location.longitude
    }
  }
}