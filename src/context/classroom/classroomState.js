import React, { useReducer } from "react";
import classroomReducer from "./classroomReducer";
import ClassroomContext from "./classroomContext";
// import axios from "axios";
import {
  ADD_CLASS_REMINDER,
  CLEAR_STUDENT_REMINDER,
  CYCLE_STUDENT_FLAG,
  DECREMENT_CURRENT_PROGRESS_SCALE,
  DECREMENT_CURRENT_REMINDER,
  DECREMENT_STUDENT_PROGRESS,
  DELETE_CURRENT_REMINDER,
  EDIT_CURRENT_PROGRESS_SCALE,
  EDIT_STUDENT_REMINDER,
  FLIP_CLASSROOM,
  INCREMENT_CURRENT_PROGRESS_SCALE,
  INCREMENT_CURRENT_REMINDER,
  INCREMENT_STUDENT_PROGRESS,
  INITIALIZE_CLASSROOM_CONTEXT,
  SET_CURRENT_DESK,
  SWAP_STUDENTS,
  TOGGLE_SHOW_REMINDERS,
  SET_CURRENT_SET_IN_ROOM,
  TOGGLE_SWAPPING,
} from "../types";

const ClassroomState = (props) => {
  const initialState = {
    students: [],
    desks: [],
    class_reminders: [],
    // students: [
    //   {
    //     id: 1,
    //     name: "Harry",
    //     desk_id: 3,
    //     reminder: null,
    //     progress: [0, 0, 0, 0, 0],
    //     flag: 0,
    //   },
    //   {
    //     id: 2,
    //     name: "Hermione",
    //     desk_id: 1,
    //     reminder: null,
    //     progress: [1, 3, 0, 0, 0],
    //     flag: 1,
    //   },
    //   {
    //     id: 3,
    //     name: "Ron",
    //     desk_id: 2,
    //     reminder: "Give back Prof Snape's book",
    //     progress: [0, 1, 4, 0, 0],
    //     flag: 0,
    //   },
    // ], //Each student has id, name, desk_id, reminder?, progress[], flag (0-3)
    // desks: [
    //   { id: 1, x: 20, y: 20 },
    //   { id: 2, x: 45, y: 20 },
    //   { id: 3, x: 20, y: 60 },
    //   { id: 4, x: 45, y: 60 },
    // ], //Each desk had id, x, y - referring to top left corner coordinates
    // class_reminders: ["alpha", "beta", "gamma", "delta"],
    progress_scales: [
      ["", "$yes", "$no"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ],
    desk_size_x: 16,
    desk_size_y: 10,
    current_reminder: 0, // index in class_reminders array
    current_scale: 0, // index in progress_scales array
    current_desk: null, // id attribute of the desk
    show_reminders: true,
    is_flipped: false,
    is_swapping: false,
    current_set: null,
  };
  const [state, dispatch] = useReducer(classroomReducer, initialState);

  const setCurrentSet = (current_set) => {
    dispatch({ type: SET_CURRENT_SET_IN_ROOM, payload: current_set });
  };

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

  const cycleStudentFlag = (desk_id) => {
    dispatch({ type: CYCLE_STUDENT_FLAG, payload: desk_id });
  };

  const flipClassroom = () => {
    dispatch({ type: FLIP_CLASSROOM, payload: null });
  };

  const toggleSwapping = () => {
    dispatch({ type: TOGGLE_SWAPPING, payload: null });
  };

  const initializeClassroomContext = (
    current_set,
    current_room,
    current_seating
  ) => {
    dispatch({
      type: INITIALIZE_CLASSROOM_CONTEXT,
      payload: { current_set, current_room, current_seating },
    });
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
        current_set: state.current_set,
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
        cycleStudentFlag,
        flipClassroom,
        toggleSwapping,
        setCurrentSet,
        initializeClassroomContext,
        is_swapping: state.is_swapping,
        is_flipped: state.is_flipped,
      }}
    >
      {props.children}
    </ClassroomContext.Provider>
  );
};

export default ClassroomState;
