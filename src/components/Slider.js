import React from 'react'
import PropTypes from 'prop-types'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

function renderImage(item) {

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
            alt={item.originalAlt}
            src={item.original}
          />
        </picture>
      :
        <img
          src={item.original}
          alt={item.originalAlt}
          srcSet={item.srcSet}
          sizes={item.sizes}
          title={item.originalTitle}
        />
    }

    {
      item.description &&
        <span className='image-gallery-description'>
          {item.description}
        </span>
    }
  </div>

  );
}

const Slider = ( { array, display } ) => {

  return (
    <section className="section">
        { display === 'slide'  ?
     <ImageGallery lazyLoad={true} showBullets={true} renderItem={renderImage} items={array} />
    :
     <div className='void'></div>
 }
   </section>
);
}


Slider.propTypes = {
  array: PropTypes.array,
  display: PropTypes.string,
}

export default Slider
