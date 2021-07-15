import React, { useContext, Fragment, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";
import M from "materialize-css/dist/js/materialize.min.js";

import { ProgressScaleModal } from "./ProgressScaleModal";
import { prettyDisplay } from "../utils/PrettyProgressDisplay";

export const ProgressScaleBar = () => {
  useEffect(() => {
    M.AutoInit();
  });
  const MAX_SCALE_CHARACTERS = 120;
  const classroomContext = useContext(ClassroomContext);
  const {
    progress_scales,
    current_scale,
    incrementCurrentProgressScale,
    decrementCurrentProgressScale,
  } = classroomContext;

  const getDisplayScale = () => {
    const displayScale = progress_scales[current_scale]
      .map(prettyDisplay)
      .join(" > ");
    if (displayScale.length > MAX_SCALE_CHARACTERS) {
      return displayScale.slice(0, MAX_SCALE_CHARACTERS) + "...";
    } else {
      return displayScale;
    }
  };

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
        <div className="remindertext">{getDisplayScale()}</div>
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
