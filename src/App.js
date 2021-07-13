import "./App.css";
import { useEffect, useContext } from "react";
import { ReminderBar } from "./components/ReminderBar";
import { ProgressScaleBar } from "./components/ProgressScaleBar";
import { Toolbar } from "./components/Toolbar";
import M from "materialize-css/dist/js/materialize.min.js";

import ClassroomState from "./context/classroom/classroomState";
import ClassroomContext from "../context/classroom/classroomContext";

function App() {
  const classroomContext = useContext(ClassroomContext);
  const { show_reminders } = classroomContext;
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <ClassroomState>
      <div className="fullscreen">
        {show_reminders ? <ReminderBar /> : <ProgressScaleBar />}
        <Toolbar />
      </div>
    </ClassroomState>
  );
}

export default App;
