import React from 'react'
import * as PropTypes from "prop-types"
import { FaCircle, FaAngleDown, FaInfo } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'

const InfoCard = ({info}) => {
  return (
    <div className="card">
      <header className="card-header has-text-centered">
        <div className="card-header-title">
          <span className="fa icon is-large fa-2x fa-stack menu-names">
            <FaCircle className="fa fa-stack-2x"/>
            <FaInfo className="fa fa-stack-1x fa-inverse"/>
          </span>
          <span className="title">{info.title}</span>
        </div>
        <a href="#" className="card-header-icon" aria-label="more options">
            <FaAngleDown />
        </a>
      </header>
      <div className="card-content has-background-grey-light">
        <div className="content">
          <h4 className="subtitle"><FormattedMessage id="info-sheet"/></h4>
          <hr/>
          <br/>
          <div>
            <strong>
              <FormattedMessage id="info-sheet-title"/>
            </strong>
            {info.artworkTitle}
          </div>
          <div>
            <strong>
              <FormattedMessage id="info-sheet-year"/>
            </strong>
            {info.year}
          </div>
          <div>
            <strong>
              <FormattedMessage id="info-sheet-technique"/>
            </strong>
            {info.technique}
          </div>
          <div>
            <strong>
              <FormattedMessage id="info-sheet-dimensions"/>
            </strong>
            {info.dimensions}
          </div>
        </div>
      </div>
    </div>
  )
}

InfoCard.propTypes = {
  info: PropTypes.object
}

export default InfoCard
