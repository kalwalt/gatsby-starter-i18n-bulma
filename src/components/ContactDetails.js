import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaRegEnvelope } from 'react-icons/fa'
import PropTypes from 'prop-types'

const ContactDetails = ({ infos, address, phone, email }) =>(

      <div className="section">
        <div className="container">
          <h3 className="title">
            {infos}
            </h3>
            {address && (
              <div className="content">
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMapMarkerAlt /> {address}
              </a>
              </div>
            )}
            {phone && (
              <div className="content">
              <a className="Contact--Details--Item" href={`tel:${phone}`}>
                <FaPhone /> {phone}
              </a>
              </div>
            )}
            {email && (
              <div className="content">
              <a className="Contact--Details--Item" href={`mailto:${email}`}>
                <FaRegEnvelope /> {email}
              </a>
              </div>
            )}
            </div>
          </div>
    )


ContactDetails.propTypes = {
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
}

export default ContactDetails
