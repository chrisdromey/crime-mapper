import React from 'react';
import GoogleMapReact from 'google-map-react';

type Props = {
  handleApiLoaded: any
  markers: any
}

const defaultCenter = {
  lat: 59.95,
  lng: 30.33
}
const defaultZoom = 14

const apiKey = process.env.GOOGLE_MAPS_API_KEY 

export function CrimeMap({ handleApiLoaded, markers }: Props) {
  console.log('markers', markers)
  if (!apiKey) {
    throw new Error('API key not set')
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }: any) => handleApiLoaded(map, maps)}
      >

        {markers}

      </GoogleMapReact>
    </div>
  )
}