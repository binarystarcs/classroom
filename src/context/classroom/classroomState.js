import React, { useReducer } from "react";
import classroomReducer from "./classroomReducer";
import ClassroomContext from "./classroomContext";
// import axios from "axios";
import {
  ADD_CLASS_REMINDER,
  CLEAR_STUDENT_REMINDER,
  DECREMENT_CURRENT_PROGRESS_SCALE,
  DECREMENT_CURRENT_REMINDER,
  DECREMENT_STUDENT_PROGRESS,
  DELETE_CURRENT_REMINDER,
  EDIT_CURRENT_PROGRESS_SCALE,
  EDIT_STUDENT_REMINDER,
  INCREMENT_CURRENT_PROGRESS_SCALE,
  INCREMENT_CURRENT_REMINDER,
  INCREMENT_STUDENT_PROGRESS,
  SET_CURRENT_DESK,
  SWAP_STUDENTS,
  TOGGLE_SHOW_REMINDERS,
} from "../types";

const ClassroomState = (props) => {
  const initialState = {
    students: [
      {
        id: 1,
        name: "Harry",
        desk_id: 3,
        reminder: null,
        progress: [0, 0, 0, 0, 0],
        flag: 0,
      },
      {
        id: 2,
        name: "Hermione",
        desk_id: 1,
        reminder: null,
        progress: [1, 3, 0, 0, 0],
        flag: 1,
      },
      {
        id: 3,
        name: "Ron",
        desk_id: 2,
        reminder: "Give back Prof Snape's book",
        progress: [0, 1, 4, 0, 0],
        flag: 0,
      },
    ], //Each student has id, name, desk_id, reminder?, progress[], flag (0-3)
    desks: [
      { id: 1, x: 20, y: 20 },
      { id: 2, x: 45, y: 20 },
      { id: 3, x: 20, y: 60 },
      { id: 4, x: 45, y: 60 },
    ], //Each desk had id, x, y - referring to top left corner coordinates
    desk_size_x: 16,
    desk_size_y: 10,
    progress_scales: [
      ["", "tick", "cross"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ],
    class_reminders: ["alpha", "beta", "gamma", "delta"],
    current_reminder: 1, // index in class_reminders array
    current_scale: 0, // index in progress_scales array
    current_desk: 0, // id attribute of the desk
    show_reminders: true,
  };
  const [state, dispatch] = useReducer(classroomReducer, initialState);

  const addClassReminder = (reminder_text) => {
    dispatch({ type: ADD_CLASS_REMINDER, payload: reminder_text });
  };

  const deleteCurrentClassReminder = () => {
    dispatch({ type: DELETE_CURRENT_REMINDER, payload: null });
  };

  const incrementCurrentReminder = () => {
    dispatch({ type: INCREMENT_CURRENT_REMINDER, payload: null });
  };

  const decrementCurrentReminder = () => {
    dispatch({ type: DECREMENT_CURRENT_REMINDER, payload: null });
  };

  const decrementCurrentProgressScale = () => {
    dispatch({ type: DECREMENT_CURRENT_PROGRESS_SCALE, payload: null });
  };

  const incrementCurrentProgressScale = () => {
    dispatch({ type: INCREMENT_CURRENT_PROGRESS_SCALE, payload: null });
  };

  const incrementStudentProgress = (desk_id) => {
    dispatch({ type: INCREMENT_STUDENT_PROGRESS, payload: desk_id });
  };

  const decrementStudentProgress = (desk_id) => {
    dispatch({ type: DECREMENT_STUDENT_PROGRESS, payload: desk_id });
  };

  const editStudentReminder = (desk_id, text) => {
    dispatch({ type: EDIT_STUDENT_REMINDER, payload: { desk_id, text } });
  };

  const clearStudentReminder = (desk_id) => {
    dispatch({ type: CLEAR_STUDENT_REMINDER, payload: desk_id });
  };

  const setCurrentDesk = (desk_id) => {
    dispatch({ type: SET_CURRENT_DESK, payload: desk_id });
  };

  const swapStudents = (first_desk_id, second_desk_id) => {
    dispatch({
      type: SWAP_STUDENTS,
      payload: { first_desk_id, second_desk_id },
    });
  };

  const editCurrentProgressScale = (new_values) => {
    dispatch({ type: EDIT_CURRENT_PROGRESS_SCALE, payload: new_values });
  };

  const toggleShowReminders = () => {
    dispatch({ type: TOGGLE_SHOW_REMINDERS, payload: null });
  };

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
        decrementCurrentProgressScale,
        incrementCurrentProgressScale,
        decrementStudentProgress,
        incrementStudentProgress,
        editStudentReminder,
        clearStudentReminder,
        setCurrentDesk,
        swapStudents,
        editCurrentProgressScale,
        show_reminders: state.show_reminders,
        toggleShowReminders,
      }}
    >
      {props.children}
    </ClassroomContext.Provider>
  );
};

export default ClassroomState;
