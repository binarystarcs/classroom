import React, { useContext, Fragment, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";
import M from "materialize-css/dist/js/materialize.min.js";
import { StudentReminderModal } from "./StudentReminderModal";

export const StudentReminderBar = () => {
  useEffect(() => {
    M.AutoInit();
  });
  const classroomContext = useContext(ClassroomContext);
  const { students, clearStudentReminder, current_desk, setCurrentDesk } =
    classroomContext;

  const deleteReminder = () => {
    clearStudentReminder(student.desk_id);
    setCurrentDesk(null);
  };

  const returnToMainReminder = () => {
    setCurrentDesk(null);
  };

  const findStudent = () => {
    let current_student = null;
    students.forEach((student) => {
      if (student.desk_id === current_desk) current_student = student;
    });
    return current_student;
  };

  const student = findStudent();

  return (
    <Fragment>
      <div className="reminderbar">
        <button
          className={`btn delete-button red ${
            student.reminder !== null ? "" : "disabled"
          }`}
          onClick={deleteReminder}
        >
          <i className="material-icons">delete</i>
        </button>
        <div className="flex-vertical">
          <div className="studentnameheader"> {student.name} </div>
          <div className="remindertext"> {student.reminder} </div>
        </div>
        <div className="rightbuttons">
          <button
            className={"btn edit-button modal-trigger"}
            href="#addStudentReminderModal"
          >
            <i className="material-icons">edit</i>
          </button>
          <button
            className="btn cancel-button grey"
            onClick={returnToMainReminder}
          >
            <i className="material-icons">cancel</i>
          </button>
        </div>
      </div>
      <StudentReminderModal />
    </Fragment>
  );
};
