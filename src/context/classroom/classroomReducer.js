/* eslint-disable import/no-anonymous-default-export */
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
  INCREMENT_CURRENT_PROGRESS_SCALE,
  INCREMENT_CURRENT_REMINDER,
  INCREMENT_STUDENT_PROGRESS,
  SET_CURRENT_DESK,
  STUDENT_FLAG_COUNT,
  SWAP_STUDENTS,
  TOGGLE_SHOW_REMINDERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CLASS_REMINDER:
      return {
        ...state,
        class_reminders: [...state.class_reminders, action.payload],
      };
    case DELETE_CURRENT_REMINDER:
      let modified_reminders = [...state.class_reminders];
      modified_reminders.splice(state.current_reminder, 1);
      let new_current_reminder = state.current_reminder;
      if (
        new_current_reminder >= modified_reminders.length &&
        new_current_reminder > 0
      )
        new_current_reminder -= 1;
      return {
        ...state,
        class_reminders: modified_reminders,
        current_reminder: new_current_reminder,
      };
    case DECREMENT_CURRENT_REMINDER:
      return {
        ...state,
        current_reminder:
          state.current_reminder > 0 ? state.current_reminder - 1 : 0,
      };
    case INCREMENT_CURRENT_REMINDER:
      return {
        ...state,
        current_reminder:
          state.current_reminder + 1 < state.class_reminders.length
            ? state.current_reminder + 1
            : state.current_reminder,
      };
    case DECREMENT_CURRENT_PROGRESS_SCALE:
      return {
        ...state,
        current_scale: state.current_scale > 0 ? state.current_scale - 1 : 0,
      };
    case INCREMENT_CURRENT_PROGRESS_SCALE:
      return {
        ...state,
        current_scale:
          state.current_scale + 1 < state.progress_scales.length
            ? state.current_scale + 1
            : state.current_scale,
      };
    case INCREMENT_STUDENT_PROGRESS:
      return {
        ...state,
        students: state.students.map((student) =>
          student.desk_id === action.payload
            ? {
                ...student,
                progress: student.progress.map((item, index) =>
                  index === state.current_scale &&
                  item + 1 < state.progress_scales[state.current_scale].length
                    ? item + 1
                    : item
                ),
              }
            : student
        ),
      };
    case DECREMENT_STUDENT_PROGRESS:
      return {
        ...state,
        students: state.students.map((student) =>
          student.desk_id === action.payload
            ? {
                ...student,
                progress: student.progress.map((item, index) =>
                  index === state.current_scale && item > 0 ? item - 1 : item
                ),
              }
            : student
        ),
      };
    case EDIT_STUDENT_REMINDER:
      return {
        ...state,
        students: state.students.map((student) =>
          student.desk_id === action.payload.desk_id
            ? { ...student, reminder: action.payload.text }
            : student
        ),
      };
    case CLEAR_STUDENT_REMINDER:
      return {
        ...state,
        students: state.students.map((student) =>
          student.desk_id === action.payload
            ? { ...student, reminder: null }
            : student
        ),
      };
    case SET_CURRENT_DESK:
      return {
        ...state,
        current_desk: action.payload,
      };
    case CYCLE_STUDENT_FLAG:
      return {
        ...state,
        students: state.students.map((student) =>
          student.desk_id === action.payload
            ? { ...student, flag: (student.flag + 1) % STUDENT_FLAG_COUNT }
            : student
        ),
      };
    case SWAP_STUDENTS:
      return {
        ...state,
        students: state.students.map((student) =>
          student.desk_id === action.payload.first_desk_id
            ? { ...student, desk_id: action.payload.second_desk_id }
            : student.desk_id === action.payload.second_desk_id
            ? { ...student, desk_id: action.payload.first_desk_id }
            : student
        ),
      };
    case EDIT_CURRENT_PROGRESS_SCALE:
      return {
        ...state,
        progress_scales: state.progress_scales.map((scale, index) =>
          index === state.current_scale ? action.payload : scale
        ),
      };
    case TOGGLE_SHOW_REMINDERS:
      return {
        ...state,
        show_reminders: !state.show_reminders,
      };
    default:
      return state;
  }
};
