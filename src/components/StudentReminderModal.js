import React, { useContext, useState, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";

export const StudentReminderModal = () => {
  const classroomContext = useContext(ClassroomContext);
  const { current_desk, editStudentReminder, students } = classroomContext;
  const [modalEntry, setModalEntry] = useState("");

  const getStudentReminder = () => {
    let current_reminder = null;
    students.forEach((student) => {
      if (student.desk_id === current_desk) current_reminder = student.reminder;
    });
    if (current_reminder === null) current_reminder = "";
    return current_reminder;
  };

  const dismissModal = () => {
    setModalEntry(getStudentReminder());
  };

  const saveModal = () => {
    editStudentReminder(current_desk, modalEntry);
  };

  useEffect(() => {
    setModalEntry(getStudentReminder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_desk]);

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
