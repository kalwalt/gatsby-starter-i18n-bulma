import React from "react";
import { FormattedMessage } from 'react-intl';

const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};

const RenderImage = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left,
  link,
  title
}) => {

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, borderRadius: "5px", ...cont }}
    >
      <a href={photo.link} style={{ position: "absolute", left: '2rem', top: '2rem', zIndex: "1" }} className="tag is-primary is-large">
        <p className="has-text-centered has-text-light is-large">
        {photo.title + ': '} <FormattedMessage id="find-out-more"/>
      </p>
    </a>
    <img
      style={{ overflow: 'hidden'}}
      {...photo}
      onClick={e => onClick(e, { index, photo })}
    />
  </div>
  );
};

export default RenderImage;
