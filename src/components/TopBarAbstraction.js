import React, { useContext, Fragment } from "react";
import ClassroomContext from "../context/classroom/classroomContext";
import { ReminderBar } from "./ReminderBar";
import { ProgressScaleBar } from "./ProgressScaleBar";
import { StudentReminderBar } from "./StudentReminderBar";

export const TopBarAbstraction = () => {
  const classroomContext = useContext(ClassroomContext);
  const { show_reminders, current_desk, is_swapping } = classroomContext;

  return (
    <Fragment>
      {show_reminders ? (
        is_swapping || current_desk === null ? (
          <ReminderBar />
        ) : (
          <StudentReminderBar />
        )
      ) : (
        <ProgressScaleBar />
      )}
    </Fragment>
  );
};
