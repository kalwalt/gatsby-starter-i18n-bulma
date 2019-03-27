import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import ImageGallery from 'react-image-gallery';
import Img from 'gatsby-image'
import "react-image-gallery/styles/css/image-gallery.css";

function renderImage(item) {
  return (
    <div className="image-gallery-image">
      <img
        src={item.original}
        alt={item.title || ''}
        style={{
          height: '100vh',
          width: '100vw',
          objectFit: 'scale-down',
          fontFamily: "'object-fit: scale-down'",
          background: 'black',
        }}
      />
    </div>
  );
}

const Gallery = ( { images } ) => (
  <ImageGallery  renderItem={renderImage} items={images} />
)

Gallery.propTypes = {
  images: PropTypes.array,
}

export default Gallery
