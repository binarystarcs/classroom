import React, { useContext, Fragment } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";

import { ProgressScaleModal } from "./ProgressScaleModal";

export const ReminderBar = () => {
  const classroomContext = useContext(ClassroomContext);
  const {
    progress_scales,
    current_scale,
    incrementCurrentProgressScale,
    decrementCurrentProgressScale,
  } = classroomContext;

  return (
    <Fragment>
      <div className="reminderbar">
        <div className="leftbuttons">
          <button
            className={`btn previous-button ${current_scale ? "" : "disabled"}`}
            onClick={decrementCurrentProgressScale}
          >
            <i className="material-icons">chevron_left</i>
          </button>
        </div>
        <div className="remindertext"> Here Goes Progress Scale </div>
        <button
          className={`btn next-button ${
            current_scale < progress_scales.length - 1 ? "" : "disabled"
          }`}
          onClick={incrementCurrentProgressScale}
        >
          <i className="material-icons">chevron_right</i>
        </button>
        <button
          className="btn add-button grey modal-trigger"
          href="#editProgressScaleModal"
        >
          <i className="material-icons">edit</i>
        </button>
      </div>
      <ProgressScaleModal />
    </Fragment>
  );
};
