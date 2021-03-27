import React, { useState } from "react"
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import CrimeMarkers from'./CrimeMarkers'


const style = {
  maxWidth: "100%",

  // height: "100%",
  // overflowX: "hidden",
  // overflowY: "hidden",
  left: 0,
  right: 0
};

const containerStyle = {
  // display:'inline-block',
  maxWidth: "100%",
  height: "60%",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0
};


export function MapContainer(props) {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState()

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props)
    setActiveMarker(marker)
    setShowingInfoWindow(true)
  }

  const onMapClicked = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false)
      setActiveMarker(null)
    }
  };

  return (
    <Map 
      google={google}
      onClick={onMapClicked}
      center={props.center}
      initialCenter={props.center}
      zoom={props.zoom}
      style={style}
      containerStyle={containerStyle}
      resetBoundsOnResize = {true}
    >

      <CrimeMarkers 
        crimeData={props.crimeData}
        onMarkerClick={onMarkerClick}
        map={props.map}
        google={google}
        />

      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}>
        <div>
          <h2>{selectedPlace?.crimeSpot.location.street.name}</h2>
          <h3>{selectedPlace?.crimeSpot.crimes.length} crimes</h3>
          {
            [...new Set(selectedPlace?.crimeSpot.crimes.map(c=>c.category))].map(unique=>{
              const num = selectedPlace?.crimeSpot.crimes.filter(c => c.category == unique).length
              return (
                <p>{num} x {unique}</p>
              )
              })
          }
          --------------
          {
            [...new Set(selectedPlace?.crimeSpot.crimes.map(c=>c.outcome))].map(unique=>{
              const num = selectedPlace?.crimeSpot.crimes.filter(c => c.outcome == unique).length
              return (
                <p>{num} x {unique}</p>
              )
              })
          }
        </div>
      </InfoWindow>
    </Map>
  )

}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
if (!apiKey) {
  throw new Error('API KEY not set')
}

const GoogleMap = GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)

export default GoogleMap;