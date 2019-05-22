import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt } from 'react-icons/fa'

let mapkey = ''
if (process.env.NETLIFY_MAP_KEY) {
  mapkey = process.env.NETLIFY_MAP_KEY
}

class GoogleMap extends Component {

  static defaultProps = {
    center: {
      lat: 45.6500779,
      lng: 13.7677618
    },
    zoom: 14
  }

  render() {
    const center = this.props.center;
    const lat = center.lat;
    const lng = center.lng;
    return (
      // Important! Always set the container height explicitly
      <section className="container">
      <div className="full-width-image-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapkey }}
          defaultCenter={center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={lat} lng={lng} text={'Piazza Unità'} />
        </GoogleMapReact>
        </div>
      </section>
    )
  }
}

export default GoogleMap

const Marker = ({text}) => {
  return (
    <div>
      <FaMapMarkerAlt color="red"/>
      {text}
    </div>
  )
}
