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
      lat: -28.0914483,
      lng: 153.4425208
    },
    zoom: 14
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <section className="container">
      <div className="full-width-image-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapkey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={-28.0914483} lng={153.4425208} text={'Kreyser Avrora'} />
        </GoogleMapReact>
        </div>
      </section>
    )
  }
}

export default GoogleMap

const Marker = () => {
  return (
    <div>
      <FaMapMarkerAlt color="red"/>
    </div>
  )
}
