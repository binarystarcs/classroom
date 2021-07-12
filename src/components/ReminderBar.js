import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'

export const ReminderBar = () => {
    return (
        <div className="reminderbar">
            <div className="leftbuttons">
            <button className="btn previous-button grey"><i className="material-icons">chevron_left</i></button>
            <button className="btn delete-button red"><i className="material-icons">delete</i></button>
            </div>
            <div className="remindertext">This is the reminder Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime ut distinctio dolore! Minima voluptates provident quaerat delectus impedit autem incidunt quisquam? Animi quia vel, distinctio neque quidem ducimus nisi, obcaecati fugiat aut quis voluptatem veniam. Accusantium officiis esse numquam quo? </div>
            <div className="rightbuttons">
            <button className="btn next-button grey"><i className="material-icons">chevron_right</i></button>
            <button className="btn add-button grey"><i className="material-icons">add</i></button>
            </div>
        </div>
    )
}
