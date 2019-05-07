import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FormattedMessage } from 'react-intl';
import { FaSearch } from 'react-icons/fa';

const FeatureGrid = ({ gridItems }) => (
    <div className="columns is-multiline">
      {gridItems.map(item => (
        <div key={item.text} className="column is-6">
          <section className="section">
            <div className="box has-text-centered">
              <h3 className="title">{item.heading}</h3>
                <div className="content">
                    <div
                      style={{
                        width: '240px',
                        display: 'inline-block',
                      }}
                    >
                    <PreviewCompatibleImage  imageInfo={item} />
                </div>
                  <div className="content">
                    <p className="is-size-6-touch is-size-6-desktop is-size-7-widescreen">{item.text}</p>
                    <a className="is-size-7-touch is-size-7-desktop is-size-8-widescreen" href={item.link}><FaSearch className="menu-names"/><FormattedMessage id="find-out-more"/></a>
                  </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
