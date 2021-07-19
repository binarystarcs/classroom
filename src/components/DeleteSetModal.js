import React, { useContext } from "react";
import "materialize-css/dist/css/materialize.min.css";
import GlobalContext from "../context/global/globalContext";

export const DeleteSetModal = () => {
  const globalContext = useContext(GlobalContext);
  const { deleteCurrentSet, current_set } = globalContext;

  return (
    <div id="deleteSetModal" className="modal">
      <div className="modal-content">
        <p>
          WARNING. This will delete class {current_set}. This operation cannot
          be undone.
        </p>
        <div className="add-reminder-modal-footer modal-footer">
          <button className="modal-close red btn">DELETE</button>

          <button className="modal-close btn" onClick={deleteCurrentSet}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
