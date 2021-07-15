import React, { useContext, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";

export const StudentReminderModal = () => {
  const classroomContext = useContext(ClassroomContext);
  const { current_desk, editStudentReminder } = classroomContext;
  const [modalEntry, setModalEntry] = useState("");

  const dismissModal = () => {
    setModalEntry("");
  };

  const saveModal = () => {
    editStudentReminder(current_desk, modalEntry);
    setModalEntry("");
  };

  return (
    <div id="addStudentReminderModal" className="modal">
      <div className="modal-content">
        <p>Enter the reminder text below:</p>
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
          <div className="green btn" onClick={(e) => saveModal(e)}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};
