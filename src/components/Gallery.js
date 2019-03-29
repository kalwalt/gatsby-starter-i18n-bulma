import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import ImageGallery from 'react-image-gallery';
import Img from 'gatsby-image'
import { injectIntl, intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import "react-image-gallery/styles/css/image-gallery.css";

renderImage.propTypes = {
  intl: intlShape.isRequired
}


function renderImage(item, intl) {

  const originalAlt = intl.formatMessage({id: intl.item.originalAlt});
  const description = intl.formatMessage({id: intl.item.description});

  return (
    <div className='image-gallery-image'>
    {
      item.imageSet ?
        <picture>
          {
            item.imageSet.map((source, index) => (
              <source
                key={index}
                media={source.media}
                srcSet={source.srcSet}
                type={source.type}
              />
            ))
          }
          <img
            alt={originalAlt}
            src={item.original}
          />
        </picture>
      :
        <img
          src={item.original}
          alt={originalAlt}
          srcSet={item.srcSet}
          sizes={item.sizes}
          title={item.originalTitle}
        />
    }

    {
      item.description &&
        <span className='image-gallery-description'>
          {description}
        </span>
    }
  </div>

  );
}

const Gallery = ( { images, intl } ) => {
  //const placeholder = intl.formatMessage({id: 'image01'});
  //const placeholder = "test";
  return (
    <div>

     <ImageGallery lazyLoad={true} showBullets={true} renderItem={intl.renderImage} items={images} />
    </div>
);
}


Gallery.propTypes = {
  images: PropTypes.array,
  intl: intlShape.isRequired
}

export default injectIntl(Gallery);
