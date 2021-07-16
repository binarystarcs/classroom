import React, { useState, useRef } from "react";
import { DraggableDesk } from "./DraggableDesk";

export const ClassroomEditor = () => {
  const classroomEditorDiv = useRef();

  const [deskPositions, setDeskPositions] = useState([
    { x: 10, y: 20 },
    { x: 40, y: 30 },
    { x: 30, y: 60 },
  ]);
  const [currentDraggedDesk, setCurrentDraggedDesk] = useState(null);

  const widthPixelsToPercent = (pixels) => {
    console.log(classroomEditorDiv.current);
    console.log("Width", pixels, classroomEditorDiv.current.clientWidth);
    return (pixels / classroomEditorDiv.current.clientWidth) * 100;
  };

  const heightPixelsToPercent = (pixels) => {
    console.log("Height", pixels, classroomEditorDiv.current.clientHeight);
    return (pixels / classroomEditorDiv.current.clientHeight) * 100;
  };

  const handleMouseMove = (e) => {
    if (currentDraggedDesk !== null) {
      console.log(`Mouse moving with desk ${currentDraggedDesk}.`);
      setDeskPositions(
        deskPositions.map((desk, index) =>
          String(index) === currentDraggedDesk
            ? {
                x: desk.x + widthPixelsToPercent(e.movementX),
                y: desk.y + heightPixelsToPercent(e.movementY),
              }
            : desk
        )
      );
    }
    console.log(deskPositions);
  };

  const handleMouseUp = () => {
    setDeskPositions(
      deskPositions.map((desk, index) =>
        String(index) === currentDraggedDesk
          ? {
              x: Math.round(desk.x),
              y: Math.round(desk.y),
            }
          : desk
      )
    );
    setCurrentDraggedDesk(null);
  };

  return (
    <div
      className="classroom-editor"
      ref={classroomEditorDiv}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h3>This is a classroom editor</h3>
      {deskPositions.map((desk, index) => (
        <DraggableDesk
          key={`${index}`}
          id={`${index}`}
          desk={desk}
          setCurrentDraggedDesk={setCurrentDraggedDesk}
        />
      ))}
    </div>
  );
};

export default ClassroomEditor;
