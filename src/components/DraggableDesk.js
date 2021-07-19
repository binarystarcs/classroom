import React, { useRef, useEffect } from "react";

export const DraggableDesk = (props) => {
  const { id, desk, setCurrentDraggedDesk, width, height } = props;
  let deskDiv = useRef();

  useEffect(() => {
    deskDiv.current.style.left = desk.x + "%";
    deskDiv.current.style.top = desk.y + "%";
    deskDiv.current.style.width = width + "%";
    deskDiv.current.style.height = height + "%";
  }, [desk, width, height]);

  const handleMouseDown = () => {
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
