import './App.css';
import {useEffect} from 'react'
import { ReminderBar } from './components/ReminderBar';
import { Toolbar } from './components/Toolbar';
import M from "materialize-css/dist/js/materialize.min.js";

import ClassroomState  from './context/classroom/classroomState';

function App() {
  useEffect(
    () => {
      M.AutoInit();
    });
  return (
    <ClassroomState>
      <div className="fullscreen">
        <ReminderBar/>
        <Toolbar/>
      </div>
    </ClassroomState>
  );
}

export default App;
