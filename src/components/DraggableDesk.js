import React, { useRef, useEffect, useState } from "react";

export const DraggableDesk = (props) => {
  const { id, desk, setCurrentDraggedDesk } = props;
  let deskDiv = useRef();

  useEffect(() => {
    deskDiv.current.style.left = desk.x + "%";
    deskDiv.current.style.top = desk.y + "%";
  }, [desk]);

  const handleMouseDown = (e) => {
    console.log("Mouse down", e);
    setCurrentDraggedDesk(id);
  };

  return (
    <div
      id={`draggable-desk-${id}`}
      className="draggable-desk"
      ref={deskDiv}
      onMouseDown={handleMouseDown}
    >
      <div className="draggable-desk-label">{id}</div>
    </div>
  );
};
