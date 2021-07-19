import React, { useContext } from "react";
import "materialize-css/dist/css/materialize.min.css";
import GlobalContext from "../context/global/globalContext";

export const DeleteRoomModal = () => {
  const globalContext = useContext(GlobalContext);
  const { deleteCurrentRoom, current_room } = globalContext;

  return (
    <div id="deleteRoomModal" className="modal">
      <div className="modal-content">
        <p>
          WARNING. This will delete room {current_room}. This operation cannot
          be undone.
        </p>
        <div className="add-reminder-modal-footer modal-footer">
          <button className="modal-close red btn">DELETE</button>

          <button className="modal-close btn" onClick={deleteCurrentRoom}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
