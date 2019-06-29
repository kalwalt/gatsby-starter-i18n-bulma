import React from 'react'
import PropTypes from 'prop-types'

const SliderA = ({item}) => {

  return (

    <amp-carousel class="carousel2"
    layout="responsive"
    height="400"
    width="500"
    type="slides">
        {item.map((source, index) => (
        <div className="slide">
          <amp-img
            alt={source.originalAlt}
            layout="fill"
            src={source.original}
          ></amp-img>
          <div className="caption">
            {source.description}
          </div>
        </div>
      ))
    }
    </amp-carousel>
  );
}

const SliderAmp = ( { array, display } ) => {

  return (
    <section className="section">
        { display === 'slide'  ?
        <SliderA item={array}/>
    :
     <div className='void'></div>
 }
   </section>
);
}


SliderAmp.propTypes = {
  array: PropTypes.array,
  display: PropTypes.string,
}

export default SliderAmp
