import { Marker } from "google-maps-react"
import React, { createRef } from "react"
import { CrimeDataPoint } from "../../types/types"

import convertToCrimeSpots from '../../lib/crimeDataToCrimeSpots'

export default function CrimeMarkers(props) {
  return convertToCrimeSpots(props.crimeData).map((crimeSpot, index) => {
    // console.log('gen', index)
    return (
      <Marker
        map={props.map}
        google={props.google}
        key={`crime-${index}`}
        position={{
          lat: crimeSpot.location.latitude,
          lng: crimeSpot.location.longitude
        }}
        crimeSpot={crimeSpot}
        // name={crimeSpot.crimes[0].persistent_id}
        // title={crimeSpot.crimes.map(c=>c.category).join(('|'))}
        // time={crimeSpot.crimes[0].month}
        // location={crimeSpot.location.street.name}
        // outcome={crimeSpot.crimes[0].outcome}
        // count={crimeSpot.crimes.length}
        onClick={props.onMarkerClick}
      />
    )
  })
  }
  
    
