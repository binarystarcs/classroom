import React, { useContext, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";

export const ProgressScaleModal = () => {
  const classroomContext = useContext(ClassroomContext);
  const { editCurrentProgressScale, progress_scales, current_scale } =
    classroomContext;
  const [modalEntry, setModalEntry] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const dismissModal = () => {
    setModalEntry("");
    setModalMessage("");
  };

  const validateModalEntry = () => {
    let progressLevels = modalEntry.split(",");
    const currentLevelCount = progress_scales[current_scale].length;
    const MAX_LENGTH = 8;
    if (progressLevels.some((entry) => entry.length > MAX_LENGTH)) return null;
    if (progressLevels.length < currentLevelCount) {
      progressLevels = progressLevels.concat(
        progress_scales[current_scale].slice([progressLevels.length])
      );
    }
    return progressLevels;
  };

  const saveModal = () => {
    const newProgressScale = validateModalEntry();
    if (newProgressScale) {
      editCurrentProgressScale(newProgressScale);
      setModalMessage("Progress scale updated.");
    } else {
      setModalMessage("Progress scale invalid.");
    }
  };

  return (
    <div id="editProgressScaleModal" className="modal">
      <div className="modal-content">
        <p>Enter progress scale separated by commas</p>
        <textarea
          className="reminder-entry-box"
          value={modalEntry}
          placeholder="Enter new values here..."
          onChange={(e) => setModalEntry(e.target.value)}
        ></textarea>
        <div className="add-reminder-modal-footer modal-footer">
          <button className="modal-close red btn" onClick={dismissModal}>
            Dismiss
          </button>
          <div className="modal-message">{modalMessage}</div>
          <button className="green btn" onClick={saveModal}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
