import React, { useState, useEffect } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper, mapEventHandler, markerEventHandler } from 'google-maps-react';
import CrimeMarkers from'./CrimeMarkers'

import convert from '../../lib/crimeDataTOCrimeSpots'

const style = {
  maxWidth: "800x",
  height: "700px",
  overflowX: "hidden",
  overflowY: "hidden"
};

const containerStyle = {
  maxWidth: "800px",
  height: "700px",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0
};


const MyOwnMarker = (props) => React.createElement(CrimeMarkers,{
  ...props
})

export function MapContainer(props) {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState()
  const [markers, setMarkers] = useState([])

  useEffect( () => {
    console.log('Crime Data updated');
    setMarkers( <CrimeMarkers 
      crimeData={props.crimeData}
      onMarkerClick={onMarkerClick}
      map={props.map}
      google={google}
      />)
}, [props.crimeData])

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
    >

    {/* <MyOwnMarker 
      onMarkerClick={onMarkerClick}
      {...props}
    /> */}

      {/* <CrimeMarkers 
        crimeData={props.crimeData}
        onMarkerClick={onMarkerClick}
        map={props.map}
        google={google}
        /> */}

        { markers }
      {/* {
        convert(props.crimeData).map((crimeSpot, index) => {
          // console.log('gen', index)
          return (
            <Marker
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
              onClick={onMarkerClick}
            />
          )
        })
      } */}

      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}>
        <div>
          <h1>{selectedPlace?.count}</h1>
          <p>{selectedPlace?.title}</p>
          <p>{selectedPlace?.time}</p>
          <p>{selectedPlace?.location}</p>
          <p>{selectedPlace?.outcome}</p>
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