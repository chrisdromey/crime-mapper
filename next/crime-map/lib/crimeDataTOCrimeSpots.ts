import { CrimeDataPoint, CrimeSpot } from "../types/types";

export default function convert(crimeData: CrimeDataPoint[]): CrimeSpot[] {

  const crimeSpots: CrimeSpot[] = []

  console.log('convert data', crimeData)
  crimeData.forEach(crime => {
    let crimeSpot: CrimeSpot = crimeSpots.filter(s=> s.location.longitude === crime.location.longitude && s.location.latitude === crime.location.latitude)[0] 
    if (!crimeSpot){
      crimeSpot = {location: crime.location, crimes: []}
      crimeSpots.push(crimeSpot)
    }
    crimeSpot.crimes.push({
      id: crime.id,
      category: crime.category,
      outcome: crime.outcome_status?.category || 'UNKNOWN',
      month: crime.month,
      location: {
        lat: crime.location.latitude,
        lng: crime.location.longitude
      }
    })
  })

  console.log('convert result', crimeSpots)
  return crimeSpots

}