import React from 'react'
import * as PropTypes from "prop-types"

const CardImageSlide = ({ imageInfo }) => {
  const { alt = '', childImageSharp, image } = imageInfo
  const imageStyle = { borderRadius: '50%' }
    return <amp-img layout='fixed' style={imageStyle} width="128" height="128" src={image.childImageSharp.fluid.src} alt={alt}/>
}

CardImageSlide.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }).isRequired,
}

class CardSlide extends React.Component {

  render(){
    const props = this.props;
    const imageInfo = props.imageInfo;
    const name = props.imageInfo.name;
    const description = props.imageInfo.description;
    const website = props.imageInfo.website;

    return (
    <div className="section card-slide">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <div className="image is-128x128">
                <CardImageSlide imageInfo={imageInfo}/>
              </div>
            </div>
              <div className="media-content">
                  <p className="tileAmp">{name}</p>
                  <p className="subtitleAmp">{description}</p>
                <br/>
                <a href={"https://" + website}><i className="is-family-code">{website}</i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )}
}

export default CardSlide
