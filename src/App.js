import "./App.css";
import "./Canvas.css";
import { useEffect } from "react";

import { Toolbar } from "./components/Toolbar";
import M from "materialize-css/dist/js/materialize.min.js";

import ClassroomState from "./context/classroom/classroomState";
import GlobalState from "./context/global/globalState";
import { TopBarAbstraction } from "./components/TopBarAbstraction";
import { ClassroomSection } from "./components/ClasroomSection";

import ClassroomEditor from "./components/ClassroomEditor";
import { MainMenu } from "./components/MainMenu";

function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <GlobalState>
      <ClassroomState>
        {/* <div className="fullscreen">
          <TopBarAbstraction />
          <ClassroomSection />
          <Toolbar />
        </div> */}
        <MainMenu />
      </ClassroomState>
    </GlobalState>
    // <ClassroomEditor />
  );
}

export default App;
