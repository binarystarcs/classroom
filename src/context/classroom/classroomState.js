import React, { useReducer } from "react";
import classroomReducer from "./classroomReducer";
import ClassroomContext from "./classroomContext";
// import axios from "axios";
import {
  ADD_CLASS_REMINDER,
  DECREMENT_CURRENT_REMINDER,
  DELETE_CURRENT_REMINDER,
  INCREMENT_CURRENT_REMINDER
} from "../types";

const ClassroomState = (props) => {
  const initialState = {
    students: [],   //Each student has id, name, desk_id, reminder?, progress_points [], flag
    desks: [],      //Each desk had id, posx, posy 
    desk_size_x: 10,
    desk_size_y: 10,
    progress_scales: [],
    class_reminders: ["alpha", "beta", "gamma", "delta"],
    current_reminder: 1,
    current_scale: 0,
    current_desk: 0
  };
  const [state, dispatch] = useReducer(classroomReducer, initialState);

  const addClassReminder = (reminder_text) => {
      dispatch({type: ADD_CLASS_REMINDER, payload: reminder_text})
  }

  const deleteCurrentClassReminder = () => {
      dispatch({type: DELETE_CURRENT_REMINDER, payload: null})
  }

  const incrementCurrentReminder = () => {
    dispatch({type: INCREMENT_CURRENT_REMINDER, payload: null})
  }

  const decrementCurrentReminder = () => {
    dispatch({type: DECREMENT_CURRENT_REMINDER, payload: null})
  }

  return (
    <ClassroomContext.Provider
      value={{
        students: state.students,
        desks: state.desks,
        desk_size_x: state.desk_size_x,
        desk_size_y: state.desk_size_y,
        progress_scales: state.progress_scales,
        class_reminders: state.class_reminders,
        current_reminder: state.current_reminder,
        current_scale: state.current_scale,
        current_desk: state.current_desk,
        addClassReminder,
        deleteCurrentClassReminder,
        incrementCurrentReminder,
        decrementCurrentReminder,
      }}
    >
      {props.children}
    </ClassroomContext.Provider>
  );
};

export default ClassroomState;
