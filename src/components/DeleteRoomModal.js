import React, { useContext } from "react";
import "materialize-css/dist/css/materialize.min.css";
import GlobalContext from "../context/global/globalContext";

export const DeleteRoomModal = (props) => {
  const globalContext = useContext(GlobalContext);
  const { deleteCurrentRoom, current_room, error } = globalContext;
  const { clearRoomSelect } = props;

  const handleDeleteRoom = () => {
    deleteCurrentRoom();
    if (error === null) clearRoomSelect();
  };

  return (
    <div id="deleteRoomModal" className="modal">
      <div className="modal-content">
        <p>
          WARNING. This will delete room {current_room}. This operation cannot
          be undone.
        </p>
        <div className="add-reminder-modal-footer modal-footer">
          <button className="modal-close red btn" onClick={handleDeleteRoom}>
            DELETE
          </button>

          <button className="modal-close btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};
