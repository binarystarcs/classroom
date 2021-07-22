import "./App.css";
import "./Canvas.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

import ClassroomState from "./context/classroom/classroomState";
import GlobalState from "./context/global/globalState";

import ClassroomEditor from "./components/ClassroomEditor";
import { MainMenu } from "./components/MainMenu";
import { LessonContainer } from "./components/LessonContainer";
import { SetEditor } from "./components/SetEditor";
import { SeatingEditor } from "./components/SeatingEditor";

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
              <SetEditor />
            </Route>
            <Route path="/seating">
              <SeatingEditor />
            </Route>
            <Route path="/layout">
              <ClassroomEditor />
            </Route>
            <Route path="/lesson">
              <LessonContainer />
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
