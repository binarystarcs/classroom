import React, {
  useState,
  useRef,
  Fragment,
  useContext,
  useEffect,
} from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import { DraggableDesk } from "./DraggableDesk";
import { Link } from "react-router-dom";
import GlobalContext from "../context/global/globalContext";

export const ClassroomEditor = () => {
  const globalContext = useContext(GlobalContext);
  const { rooms, current_room, updateCurrentRoom, error } = globalContext;
  const classroomEditorDiv = useRef();
  const exitButton = useRef();
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(10);
  const MIN_WIDTH = 8;
  const MAX_WIDTH = 25;
  const MIN_HEIGHT = 8;
  const MAX_HEIGHT = 30;

  const [deskPositions, setDeskPositions] = useState([
    { x: 10, y: 20 },
    { x: 40, y: 30 },
    { x: 30, y: 60 },
  ]);
  const [currentDraggedDesk, setCurrentDraggedDesk] = useState(null);

  const widthPixelsToPercent = (pixels) => {
    return (pixels / classroomEditorDiv.current.clientWidth) * 100;
  };

  const heightPixelsToPercent = (pixels) => {
    return (pixels / classroomEditorDiv.current.clientHeight) * 100;
  };

  const handleMouseMove = (e) => {
    if (currentDraggedDesk !== null) {
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

  const increaseWidth = () => {
    setWidth(width >= MAX_WIDTH ? MAX_WIDTH : width + 1);
  };

  const increaseHeight = () => {
    setHeight(height >= MAX_HEIGHT ? MAX_HEIGHT : height + 1);
  };

  const decreaseWidth = () => {
    setWidth(width <= MIN_WIDTH ? MIN_WIDTH : width - 1);
  };

  const decreaseHeight = () => {
    setHeight(height <= MIN_HEIGHT ? MIN_HEIGHT : height - 1);
  };

  const addDesk = () => {
    setDeskPositions([...deskPositions, { x: 8, y: 12 }]);
  };

  const removeDesk = () => {
    setDeskPositions(deskPositions.slice(0, -1));
  };

  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    const room_blueprint = rooms.find((room) => room.name === current_room);
    setWidth(room_blueprint.desk_width);
    setHeight(room_blueprint.desk_height);
    setDeskPositions(
      room_blueprint.desks.map((desk) => ({ x: desk.x, y: desk.y }))
    );
    // eslint-disable-next-line
  }, []);

  const saveLayout = () => {
    const room_data = {
      desk_width: width,
      desk_height: height,
      desks: deskPositions.map((desk, index) => ({
        id: index,
        x: desk.x,
        y: desk.y,
      })),
    };
    updateCurrentRoom(room_data);
    if (error === null) {
      exitButton.current.click();
    }
  };

  return (
    <Fragment>
      <div
        className="classroom-editor"
        ref={classroomEditorDiv}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <h4 className="main-menu-header">{current_room} layout</h4>
        {deskPositions.map((desk, index) => (
          <DraggableDesk
            key={`${index}`}
            id={`${index}`}
            desk={desk}
            setCurrentDraggedDesk={setCurrentDraggedDesk}
            width={width}
            height={height}
          />
        ))}
      </div>
      <div className="fixed-action-btn">
        <button className="btn-floating btn-large red">
          <i className="large material-icons">settings</i>
        </button>
        <ul>
          <li>
            <button className="btn-floating btn-large" onClick={addDesk}>
              <i className="material-icons">add</i>
            </button>
          </li>
          <li>
            <button className="btn-floating btn-large" onClick={removeDesk}>
              <i className="material-icons">remove</i>
            </button>
          </li>
          <li>
            <button className="btn-floating btn-large" onClick={decreaseHeight}>
              <i className="material-icons">unfold_less</i>
            </button>
          </li>
          <li>
            <button className="btn-floating btn-large" onClick={increaseHeight}>
              <i className="material-icons">unfold_more</i>
            </button>
          </li>
          <li>
            <button
              className="btn-floating btn-large rotated"
              onClick={decreaseWidth}
            >
              <i className="material-icons rotated">unfold_less</i>
            </button>
          </li>
          <li>
            <button
              className="btn-floating btn-large rotated"
              onClick={increaseWidth}
            >
              <i className="material-icons rotated">unfold_more</i>
            </button>
          </li>
          <li>
            <button className="btn-floating btn-large red" onClick={saveLayout}>
              <i className="material-icons">save</i>
            </button>
          </li>
          <li>
            <Link to="/">
              <button className="btn-floating btn-large red" ref={exitButton}>
                <i className="material-icons">exit_to_app</i>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default ClassroomEditor;
