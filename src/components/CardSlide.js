import React from 'react'
import Img from 'gatsby-image'
import * as PropTypes from "prop-types"

const CardImageSlide = ({ imageInfo }) => {
  const { alt = '', childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
        <Img className="is-rounded" fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp) {
    return (
        <Img className="is-rounded" fluid={childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!image && typeof image === 'string')
    return <img className="is-rounded" src={image} alt={alt} />
  return null
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
    //const name = props.name;
    //const description = props.description;
    return (
    <div className="section">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-128x128">
                <CardImageSlide imageInfo={imageInfo}/>
              </figure>
            </div>
              <div className="media-content">
                <p className="title is-4">John Kaki</p>
                <p className="title is-6">I am a visual artist, follow me in this adventure...!</p>
                <a><i className="">www.kaki.com</i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )}
}

export default CardSlide
