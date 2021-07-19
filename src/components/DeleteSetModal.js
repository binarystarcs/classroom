import React, { useContext } from "react";
import "materialize-css/dist/css/materialize.min.css";
import GlobalContext from "../context/global/globalContext";

export const DeleteSetModal = (props) => {
  const globalContext = useContext(GlobalContext);
  const { deleteCurrentSet, current_set, error } = globalContext;
  const { clearSetSelect } = props;

  const handleDeleteSet = () => {
    deleteCurrentSet();
    if (error === null) clearSetSelect();
  };

  return (
    <div id="deleteSetModal" className="modal">
      <div className="modal-content">
        <p>
          WARNING. This will delete class {current_set}. This operation cannot
          be undone.
        </p>
        <div className="add-reminder-modal-footer modal-footer">
          <button className="modal-close red btn" onClick={handleDeleteSet}>
            DELETE
          </button>

          <button className="modal-close btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};
