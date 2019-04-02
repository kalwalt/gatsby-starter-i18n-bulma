import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'

class Lightbox extends Component {
  state = {
    showLightbox: false,
    selectedImage: 0,
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp, false);
    // Get all "#modal-lightbox" elements
    const modal = Array.prototype.slice.call(document.querySelectorAll('#img-lightbox'), 0);
    console.log(modal);
    // Check if there are any #modal-lightbox links
    if (modal.length > 0) {
     const target = 'modal-lightbox';
     const $target = document.getElementById(target);
     // Add a click event on each of them
     modal.forEach( el => {
       el.addEventListener('click', () => {
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
       });
     });
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyUp, false)
  }

  handleClick = (e, index) => {
    e.preventDefault()
    this.setState({ showLightbox: !this.state.showLightbox, selectedImage: index })
  }

  closeModal = () => {
    this.setState({ showLightbox: false })
  }

  goBack = () => {
    this.setState({ selectedImage: this.state.selectedImage - 1 })
  }

  goForward = () => {
    this.setState({ selectedImage: this.state.selectedImage + 1 })
  }

  handleKeyUp = e => {
    e.preventDefault()
    const { keyCode } = e
    if (this.state.showLightbox) {
      if (keyCode === 37) {
        // Left Arrow Key
        if (this.state.selectedImage > 0) {
          this.setState({ selectedImage: this.state.selectedImage - 1 })
        }
      }
      if (keyCode === 39) {
        // Right Arrow Key
        if (this.state.selectedImage < this.props.images.length - 1) {
          this.setState({ selectedImage: this.state.selectedImage + 1 })
        }
      }
      if (keyCode === 27) {
        // Escape key
        this.setState({ showLightbox: false })
      }
    }
  }

  render() {
    const { images, lightbox } = this.props;
    const { showLightbox, selectedImage } = this.state;
    const display = lightbox.display;
    const imageStyle = { borderRadius: '5px' }
    return (
      <div className="lightbox">
      {display === true ?
      <Fragment>
        <div className="columns">
          {images.map((img, i) => (
            <div className="column" key={img.childImageSharp.fluid.src}>
              <a id="img-lightbox" className="image is-4by3" href={img.childImageSharp.fluid.src} alt="Image" onClick={e => this.handleClick(e, i)}>
                <Img fluid={img.childImageSharp.fluid} style={imageStyle} />
              </a>
            </div>
          ))}
        </div>


        <div id="modal-lightbox" className="modal">
          <div className="modal-background"></div>
          <div className="modal-content">
            <Img  fluid={images[selectedImage].childImageSharp.fluid} />
            <div className="field is-grouped is-right">
                <button className="button is-primary" onClick={this.goBack} disabled={selectedImage === 0}>
                  Previous
                </button>
                <button className="button is-primary" onClick={this.goForward} disabled={selectedImage === images.length - 1}>
                  Next
                </button>
            </div>
          </div>
           <button className="modal-close is-large" aria-label="close"></button>
        </div>
      </Fragment>
      :
      <div></div>
    } </div>)
  }
}

const StyledImg = styled(Img)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 100%; // or whatever
  & > img {
    object-fit: cover !important; // or whatever
    object-position: 0% 0% !important; // or whatever
  }
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(5, 1fr);
  }
  grid-gap: 15px;
  .gatsby-image-outer-wrapper {
    height: 100%;
  }
`

const GalleryItem = styled.div`
  position: relative;
`

const LightboxModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`
const LightboxContent = styled.div`
  margin: 15px;
  max-width: 700px;
  width: 100%;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftRight = styled.div`
  button:first-child {
    margin-right: 10px;
  }
`

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
  lightbox: PropTypes.object.isRequired,
}

export default Lightbox
