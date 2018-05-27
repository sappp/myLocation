import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";


export class MapContainer extends Component {

  onMapClicked = (mapProps, map, event) => {
    this.props.onClick(event.latLng.lat(), event.latLng.lng())
    const geocoder = new this.props.google.maps.Geocoder();
    geocoder.geocode({'latLng': event.latLng}, (res, status) => {
        if (status) {
          const address = res.length > 0 ? res[0].formatted_address : null
          this.props.onAddressUpdate(address)
        }
    })
  }

  updateCenter = () => {
    if(this.props.center) {
      return this.props.center
    }
  }

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    const {
      google,
      maxHeigth,
    } = this.props;

    return (
      <div className="MapContainer" style={{position: "relative", height: maxHeigth }}>
        <Map
          style={{}}
          onClick={this.onMapClicked}
          google={this.props.google}
          center={this.updateCenter()}
          initialCenter={{lat: 31.646051, lng: 34.85161199999993}}
          zoom={8}
        >
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
  v: "3.30"
})(MapContainer);
