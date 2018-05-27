import React from 'react';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MapSection = ({ google, markerName, coordinates }) => (
  <div style={{position: "relative", height: "300px"}}>
  <Map
    style={{}}
    google={google}
    center={coordinates}
    initialCenter={coordinates}
    zoom={20}
  >
  <Marker
    name={markerName}
    position={coordinates}
    title={markerName}
  />
  </Map>
</div>
)

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
  v: "3.30"
})(MapSection);
