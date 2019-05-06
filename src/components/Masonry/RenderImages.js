import React from "react";

//this regulate the transition between the two states
const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
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
  left
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
      <a href="/en/artworks/" style={{ position: "absolute", zIndex: "4" }} className="is-large">
        <p className="has-text-centered has-text-info is-large">
          Some text
        </p>
      </a>
    </div>

  );
};

export default RenderImage;
