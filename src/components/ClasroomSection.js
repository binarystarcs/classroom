import React, { useContext } from "react";
import "materialize-css/dist/css/materialize.min.css";
import ClassroomContext from "../context/classroom/classroomContext";
import { Desk } from "./Desk";

export const ClassroomSection = () => {
  const classroomContext = useContext(ClassroomContext);
  const { desks } = classroomContext;
  return (
    <div className="classroom-section">
      {desks.map((desk) => (
        <Desk desk={desk} />
      ))}
    </div>
  );
};
