import React, { useEffect, useContext } from "react";
import ClassroomContext from "../context/classroom/classroomContext";
import GlobalContext from "../context/global/globalContext";
import { ClassroomSection } from "./ClasroomSection";
import { Toolbar } from "./Toolbar";
import { TopBarAbstraction } from "./TopBarAbstraction";

export const LessonContainer = () => {
  const classroomContext = useContext(ClassroomContext);
  const globalContext = useContext(GlobalContext);
  const { initializeClassroomContext } = classroomContext;
  const { current_seating } = globalContext;
  useEffect(() => {
    const current_set = JSON.parse(window.localStorage.getItem("sets"))?.find(
      (setObj) => setObj.name === current_seating.class_name
    );
    const current_room = JSON.parse(window.localStorage.getItem("rooms"))?.find(
      (room) => room.name === current_seating.room_name
    );
    initializeClassroomContext(current_set, current_room, current_seating);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="fullscreen">
      <TopBarAbstraction />
      <ClassroomSection />
      <Toolbar />
    </div>
  );
};
