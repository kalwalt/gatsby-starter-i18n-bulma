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
  link
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
      <img
        style={{}}
        {...photo}
        onClick={e => onClick(e, { index, photo })}
      />
      //<style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
        <a href={photo.link} style={{ position: "absolute", zIndex: "4" }} className="tag is-primary is-large">
          <p className="has-text-centered has-text-light is-large">
          <FormattedMessage id="find-out-more"/>
        </p>
      </a>
    </div>
  );
};

export default RenderImage;
