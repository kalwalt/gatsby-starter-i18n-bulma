import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class OsmMap extends Component {
  render() {
    const props = this.props;
    const position = [props.lat, props.lng]

    if (typeof window !== 'undefined') {
      return (

          <MapContainer center={position} zoom={13} style={{zIndex: 0, height: '350px',}} >
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                {props.message}
              </Popup>
            </Marker>
          </MapContainer>

      )
    }
    return null
  }
}
