import React, { useState, useEffect } from 'react';
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from 'gatsby';
import Slider from 'react-slick';

const SlickSlider = () => {
  //gets window dimensions to conditionally render amount of images in carrousel
  const windowGlobal = typeof window !== 'undefined' && window;
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = windowGlobal;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      windowGlobal.addEventListener('resize', handleResize);
      return () => windowGlobal.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  const { width } = useWindowDimensions();

  const [imageCount, setImageCount] = useState(1);

  useEffect(() => {
    if (width >= 1000) {
      setImageCount(3);
    } else if (width >= 800) {
      setImageCount(2);
    } else if (width <= 759) {
      setImageCount(1);
    }
  }, [width]);

  const sliderQuery = useStaticQuery(graphql`
    query SlickSlider {
      slider: allFile(
        sort: { name: ASC }
        filter: { sourceInstanceName: { eq: "slider" } }
      ) {
        edges {
          node {
            childImageSharp {
                gatsbyImageData(width: 500, quality: 84, layout: CONSTRAINED)
              }
          }
        }
      }
    }
  `);
//console.log(sliderQuery);
  const imageMap = sliderQuery.slider.edges.map(image => {
    let img = image.node.childImageSharp;
    console.log(img);
    return (
      <div className="" key={'0'}>
        <GatsbyImage
          className=""         
          image={img.gatsbyImageData}
          alt={'0'}
        />
      </div>
    );
  });
  const settings = {
    dots: true,
    autoplay: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: imageCount,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <h2>Slick Slider</h2>
      <Slider {...settings}>{imageMap}</Slider>
    </div>
  );
};

export default SlickSlider;