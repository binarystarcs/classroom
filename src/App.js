import './App.css';
import { ReminderBar } from './components/ReminderBar';
import { Toolbar } from './components/Toolbar';

import ClassroomState  from './context/classroom/classroomState';

function App() {
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
