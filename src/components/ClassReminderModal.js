import React, {useContext, useState} from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import ClassroomContext from '../context/classroom/classroomContext'


export const ClassReminderModal = () => {
    const classroomContext = useContext(ClassroomContext);
    const {addClassReminder} = classroomContext;
    const [modalEntry, setModalEntry] = useState("");

    const dismissModal = () => {
        setModalEntry("");
    }

    const saveModal = () => {
        addClassReminder(modalEntry)
        setModalEntry("")
    }

    return (
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
    )
}
