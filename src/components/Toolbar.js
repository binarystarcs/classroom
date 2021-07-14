import React, { useContext } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";

export const Toolbar = () => {
  const classroomContext = useContext(ClassroomContext);
  const {
    toggleShowReminders,
    decrementCurrentProgressScale,
    incrementCurrentProgressScale,
    flipClassroom,
  } = classroomContext;
  return (
    <div className="toolbar">
      <button className="btn btn-large red exit-button">
        <i className="material-icons">exit_to_app</i>
      </button>
      <button className="btn btn-large grey swap-button">
        <i className="material-icons">sync</i>
      </button>

      <button
        className="btn btn-large next-progress-button grey"
        onClick={incrementCurrentProgressScale}
      >
        <i className="material-icons">chevron_right</i>
      </button>
      <button
        className="btn btn-large settings-button grey"
        onClick={toggleShowReminders}
      >
        <i className="material-icons">settings</i>
      </button>
      <button
        className="btn btn-large previous-progress-button grey"
        onClick={decrementCurrentProgressScale}
      >
        <i className="material-icons">chevron_left</i>
      </button>
      <button
        className="btn btn-large mirror-button grey"
        onClick={flipClassroom}
      >
        <i className="material-icons">swap_vert</i>
      </button>
    </div>
  );
};
