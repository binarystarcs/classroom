import React, {useContext, Fragment, useEffect, useState} from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import ClassroomContext from '../context/classroom/classroomContext'
import M from "materialize-css/dist/js/materialize.min.js";


export const ReminderBar = () => {
    useEffect(
        () => {
          M.AutoInit();
        }, //eslint-disable-next-line
        []
      );
    const classroomContext = useContext(ClassroomContext);
    const {deleteCurrentClassReminder, addClassReminder, class_reminders, current_reminder,
          incrementCurrentReminder, decrementCurrentReminder} = classroomContext;
    const [modalEntry, setModalEntry] = useState("");

    const dismissModal = () => {
        setModalEntry("");
    }

    const saveModal = () => {
        addClassReminder(modalEntry)
        setModalEntry("")
    }

    return (
        <Fragment>
        <div className="reminderbar">
            <div className="leftbuttons">
            <button className={`btn previous-button ${current_reminder ? "": "disabled"}`} onClick={decrementCurrentReminder}><i className="material-icons">chevron_left</i></button>
            <button className={`btn delete-button red ${class_reminders.length ? "": "disabled"}`} onClick={deleteCurrentClassReminder}><i className="material-icons">delete</i></button>
            </div>
            <div className="remindertext"> {class_reminders[current_reminder]} </div>
            <div className="rightbuttons">
            <button className={`btn next-button ${current_reminder < class_reminders.length - 1 ? "": "disabled"}`} onClick={incrementCurrentReminder}><i className="material-icons">chevron_right</i></button>
            <button className="btn add-button grey modal-trigger" href="#addReminderModal"><i className="material-icons">add</i></button>
            </div>
        </div>
        <div id="addReminderModal" className="modal">
            <div className="modal-content">
                <p>Add Class Reminder</p>
                <textarea className="reminder-entry-box" value={modalEntry} placeholder="Enter reminder text here..." onChange={(e) => setModalEntry(e.target.value)}></textarea>
            <div className="add-reminder-modal-footer modal-footer">
                <button className="modal-close red btn" onClick={dismissModal}>Dismiss</button>
                <button className="modal-close green btn" onClick={saveModal}>Save</button>
            </div>
        </div>
        </div>
        </Fragment>
    )
}
