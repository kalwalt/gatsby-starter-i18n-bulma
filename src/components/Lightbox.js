import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
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
    //this make close the modal
    const close = Array.prototype.slice.call(document.querySelectorAll('#modal-close'), 0);
    if (close.length > 0) {
      const target = 'modal-lightbox';
      const $target = document.getElementById(target);
     // Add a click event on each of them
     close.forEach( el => {
       el.addEventListener('click', () => {
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
        this.setState({ showLightbox: false });
        const target = 'modal-lightbox';
        const $target = document.getElementById(target);
        $target.classList.toggle('is-active');
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
              <a id="img-lightbox" className="image" href={img.childImageSharp.fluid.src} alt="Image" onClick={e => this.handleClick(e, i)}>
                <Img fluid={img.childImageSharp.fluid} style={imageStyle} />
              </a>
            </div>
          ))}
        </div>


        <div id="modal-lightbox" className="modal">
          <div className="modal-background"></div>
          <div className="modal-content">
          <button id="modal-close" className="modal-close is-large" aria-label="close"></button>
            <Img  fluid={images[selectedImage].childImageSharp.fluid} />
            <footer className="modal-card-foot">
                <button className="button is-primary" onClick={this.goBack} disabled={selectedImage === 0}>
                  Previous
                </button>
                <button className="button is-primary" onClick={this.goForward} disabled={selectedImage === images.length - 1}>
                  Next
                </button>
            </footer>
          </div>

        </div>
      </Fragment>
      :
      <div></div>
    } </div>)
  }
}

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
  lightbox: PropTypes.object.isRequired,
}

export default Lightbox
