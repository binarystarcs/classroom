import React, { useContext, Fragment } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";

import { ClassReminderModal } from "./ClassReminderModal";

export const ReminderBar = () => {
  const classroomContext = useContext(ClassroomContext);
  const {
    deleteCurrentClassReminder,
    class_reminders,
    current_reminder,
    incrementCurrentReminder,
    decrementCurrentReminder,
  } = classroomContext;

  return (
    <Fragment>
      <div className="reminderbar">
        <div className="leftbuttons">
          <button
            className={`btn previous-button ${
              current_reminder ? "" : "disabled"
            }`}
            onClick={decrementCurrentReminder}
          >
            <i className="material-icons">chevron_left</i>
          </button>
          <button
            className={`btn delete-button red ${
              class_reminders.length ? "" : "disabled"
            }`}
            onClick={deleteCurrentClassReminder}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
        <div className="remindertext">
          {" "}
          {class_reminders[current_reminder]}{" "}
        </div>
        <div className="rightbuttons">
          <button
            className={`btn next-button ${
              current_reminder < class_reminders.length - 1 ? "" : "disabled"
            }`}
            onClick={incrementCurrentReminder}
          >
            <i className="material-icons">chevron_right</i>
          </button>
          <button
            className="btn add-button grey modal-trigger"
            href="#addReminderModal"
          >
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
      <ClassReminderModal />
    </Fragment>
  );
};
