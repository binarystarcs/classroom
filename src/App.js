import "./App.css";
import "./Canvas.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    <Router>
      <GlobalState>
        <ClassroomState>
          <Switch>
            <Route path="/setlist">
              <MainMenu />
            </Route>
            <Route path="/layout">
              <ClassroomEditor />
            </Route>
            <Route path="/lesson">
              <div className="fullscreen">
                <TopBarAbstraction />
                <ClassroomSection />
                <Toolbar />
              </div>
            </Route>
            <Route path="/">
              <MainMenu />
            </Route>
          </Switch>
        </ClassroomState>
      </GlobalState>
    </Router>
  );
}

export default App;
