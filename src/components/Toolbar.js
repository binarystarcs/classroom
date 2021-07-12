import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <button className="btn btn-large red exit-button"><i className="material-icons">exit_to_app</i></button>
            <button className="btn btn-large save-button"><i className="material-icons">save</i></button>
            <button className="btn btn-large grey swap-button"><i className="material-icons">sync</i></button>


            <button className="btn btn-large next-progress-button grey"><i className="material-icons">chevron_right</i></button>
            <button className="btn btn-large settings-button grey"><i className="material-icons">settings</i></button>
            <button className="btn btn-large previous-progress-button grey"><i className="material-icons">chevron_left</i></button>
            <button className="btn btn-large mirror-button grey"><i className="material-icons">swap_vert</i></button>
        </div>
    )
}
