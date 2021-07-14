import "./App.css";
import { useEffect } from "react";

import { Toolbar } from "./components/Toolbar";
import M from "materialize-css/dist/js/materialize.min.js";

import ClassroomState from "./context/classroom/classroomState";
import { TopBarAbstraction } from "./components/TopBarAbstraction";
import { ClassroomSection } from "./components/ClasroomSection";

function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <ClassroomState>
      <div className="fullscreen">
        <TopBarAbstraction />
        <ClassroomSection />
        <Toolbar />
      </div>
    </ClassroomState>
  );
}

export default App;
