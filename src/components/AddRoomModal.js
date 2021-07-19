import React, { useContext, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import GlobalContext from "../context/global/globalContext";

export const AddRoomModal = () => {
  const globalContext = useContext(GlobalContext);
  const { addRoom } = globalContext;
  const [modalEntry, setModalEntry] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const MAX_ROOM_NAME_LENGTH = 12;

  const dismissModal = () => {
    setModalEntry("");
    setModalMessage("");
  };

  const saveModal = (e) => {
    e.preventDefault();
    if (modalEntry.length > 0 && modalEntry.length <= MAX_ROOM_NAME_LENGTH) {
      addRoom(modalEntry);
      dismissModal();
    } else {
      setModalMessage(`Use at most ${MAX_ROOM_NAME_LENGTH} characters.`);
    }
  };

  return (
    <div id="addRoomModal" className="modal">
      <div className="modal-content">
        <p>Create new room</p>
        <textarea
          className="reminder-entry-box"
          value={modalEntry}
          placeholder="Enter class name..."
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
