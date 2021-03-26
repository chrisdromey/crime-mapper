import { Marker } from "google-maps-react"
import React, { createRef } from "react"
import { CrimeDataPoint } from "../../types/types"

import convert from '../../lib/crimeDataTOCrimeSpots'
// type Props = {
//   crimeData: CrimeDataPoint[]
//   setActiveMarker: any
// }

export default function CrimeMarkers(props) {
  return convert(props.crimeData).map((crimeSpot, index) => {
    console.log('gen', index)
    return (
      <Marker
        map={props.map}
        google={props.google}
        key={`crime-${index}`}
        position={{
          lat: crimeSpot.location.latitude,
          lng: crimeSpot.location.longitude
        }}
        name={crimeSpot.crimes[0].persistent_id}
        title={crimeSpot.crimes[0].category}
        time={crimeSpot.crimes[0].month}
        location={crimeSpot.location.street.name}
        outcome={crimeSpot.crimes[0].outcome}
        count={crimeSpot.crimes.length}
        onClick={props.onMarkerClick}
      />
    )
  })
  }
  
    
