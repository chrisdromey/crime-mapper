import React from "react"
import { CrimeDataPoint } from "../../types/types"
import Marker from "../simple-marker/marker"

export default function CrimeMarkers(crimeData: CrimeDataPoint[]) {
  return crimeData.map((crime, index) => {
    console.log('here')
    const text = [crime.month, crime.category, crime.location.street.name, crime.outcome_status.category].join('\n')
    console.log('generate', index)
    return  (
      <Marker
        key={`crime-${index}`}
        id={crime.persistent_id}
        lat={crime.location.latitude}
        lng={crime.location.longitude}
        name="My Marker"
        color="blue"
        text={text}
    />)
  })
}