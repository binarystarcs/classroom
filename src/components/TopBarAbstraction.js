import React, { useContext, Fragment } from "react";
import ClassroomContext from "../context/classroom/classroomContext";
import { ReminderBar } from "./ReminderBar";
import { ProgressScaleBar } from "./ProgressScaleBar";

export const TopBarAbstraction = () => {
  const classroomContext = useContext(ClassroomContext);
  const { show_reminders } = classroomContext;

  return (
    <Fragment>
      {show_reminders ? <ReminderBar /> : <ProgressScaleBar />}
    </Fragment>
  );
};
