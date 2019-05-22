import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import renderImg from './RenderImages';

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 500) columns = 2;
  if (containerWidth >= 900) columns = 3;
  if (containerWidth >= 1500) columns = 4;
  return columns;
}

class MasonryGal extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    const photos = this.props.photos;
    return (

      <div className="container">
        <Gallery
        galleryStyle={{ backgroundColor: 'red' }}
        margin={10}
        photos={photos}
        onClick={this.openLightbox}
        direction={'column'}
        columns={columns}
        renderImage={renderImg}
        />
        <Lightbox
          theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
          images={photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )

  }
}

export default MasonryGal;
