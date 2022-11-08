import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as PropTypes from 'prop-types';

const CardImageSlide = ({ imageInfo }) => {
  const { alt = '', childImageSharp, image } = imageInfo;
  const imageStyle = { borderRadius: '50%' };

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        alt={alt}
      />
    );
  } else if (!!childImageSharp) {
    return (
      <GatsbyImage
        image={childImageSharp.gatsbyImageData}
        style={imageStyle}
        alt={alt}
      />
    );
  } else if (image) {
    return <img style={imageStyle} src={image} alt={alt} />;
  } else {
    return null;
  }
};

CardImageSlide.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }).isRequired,
};

class CardSlide extends React.Component {
  render() {
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
                <figure className="image is-128x128">
                  <CardImageSlide imageInfo={imageInfo} />
                </figure>
              </div>
              <div className="media-content">                
                  <p className="title is-4">{name}</p>
                  <p className="title is-6">{description}</p>
                <br />
                <a href={'https://' + website}>
                  <i className="is-family-code">{website}</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardSlide;
