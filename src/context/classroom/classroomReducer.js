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
  FLIP_CLASSROOM,
  INCREMENT_CURRENT_PROGRESS_SCALE,
  INCREMENT_CURRENT_REMINDER,
  INCREMENT_STUDENT_PROGRESS,
  INITIALIZE_CLASSROOM_CONTEXT,
  SET_CURRENT_DESK,
  SET_CURRENT_SET_IN_ROOM,
  STUDENT_FLAG_COUNT,
  SWAP_STUDENTS,
  TOGGLE_SHOW_REMINDERS,
  TOGGLE_SWAPPING,
} from "../types";

const addClassReminderToStorage = (set_name, reminder_text) => {
  const storedSets = JSON.parse(window.localStorage.getItem("sets"));
  let currentSet = storedSets.find((s) => s.name === set_name);
  if (!currentSet) return false;
  if (currentSet.reminders === null) {
    currentSet.reminders = [reminder_text];
  } else {
    currentSet.reminders.push(reminder_text);
  }
  window.localStorage.setItem(
    "sets",
    JSON.stringify(
      storedSets.map((s) => (s.name === set_name ? currentSet : s))
    )
  );
  return true;
};

const deleteClassReminderFromStorage = (set_name, reminder_text) => {
  const storedSets = JSON.parse(window.localStorage.getItem("sets"));
  let currentSet = storedSets.find((s) => s.name === set_name);
  console.log(currentSet.reminders);
  console.log(reminder_text);
  if (!currentSet) return false;
  if (!currentSet.reminders) return false;
  if (currentSet.reminders.indexOf(reminder_text) === -1) return false;
  console.log("Trying to delete", reminder_text, "from", currentSet);
  currentSet.reminders = currentSet.reminders.filter(
    (r) => r !== reminder_text
  );
  window.localStorage.setItem(
    "sets",
    JSON.stringify(
      storedSets.map((s) => (s.name === set_name ? currentSet : s))
    )
  );
  return true;
};

const setStudentReminderInStorage = (set_name, student_id, new_text) => {
  const storedSets = JSON.parse(window.localStorage.getItem("sets"));
  let currentSet = storedSets.find((s) => s.name === set_name);
  if (!currentSet) return false;
  if (!currentSet.students.find((s) => s.id === student_id)) return false;
  window.localStorage.setItem(
    "sets",
    JSON.stringify(
      storedSets.map((s) =>
        s.name === set_name
          ? {
              ...currentSet,
              students: currentSet.students.map((student) =>
                student.id === student_id
                  ? { ...student, reminder: new_text }
                  : student
              ),
            }
          : s
      )
    )
  );
  return true;
};

export default (state, action) => {
  switch (action.type) {
    case SET_CURRENT_SET_IN_ROOM:
      return {
        ...state,
        current_set: action.payload,
      };
    case ADD_CLASS_REMINDER:
      addClassReminderToStorage(state.current_set, action.payload);
      return {
        ...state,
        class_reminders: [...state.class_reminders, action.payload],
      };
    case DELETE_CURRENT_REMINDER:
      const current_reminder_text =
        state.class_reminders[state.current_reminder];
      deleteClassReminderFromStorage(state.current_set, current_reminder_text);
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
      const student_id_for_edit = state.students.find(
        (student) => student.desk_id === action.payload.desk_id
      )?.id;
      if (student_id_for_edit)
        setStudentReminderInStorage(
          state.current_set,
          student_id_for_edit,
          action.payload.text
        );
      return {
        ...state,
        students: state.students.map((student) =>
          student.desk_id === action.payload.desk_id
            ? { ...student, reminder: action.payload.text }
            : student
        ),
      };
    case CLEAR_STUDENT_REMINDER:
      const student_id_for_clear = state.students.find(
        (student) => student.desk_id === action.payload
      )?.id;
      if (student_id_for_clear)
        setStudentReminderInStorage(
          state.current_set,
          student_id_for_clear,
          null
        );

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
    case FLIP_CLASSROOM:
      return {
        ...state,
        is_flipped: !state.is_flipped,
      };
    case TOGGLE_SWAPPING:
      return {
        ...state,
        current_desk: null,
        is_swapping: !state.is_swapping,
      };
    case INITIALIZE_CLASSROOM_CONTEXT:
      if (
        !action.payload.current_set ||
        !action.payload.current_room ||
        !action.payload.current_seating
      )
        return state;
      return {
        ...state,
        students: action.payload.current_set.students
          .map((student) => ({
            id: student.id,
            name: student.name,
            desk_id: action.payload.current_seating.students.indexOf(
              student.id
            ),
            reminder: student.reminder,
            progress: [0, 0, 0, 0, 0],
            flag: 0,
          }))
          .filter((student) => student.desk_id !== -1),
        desks: action.payload.current_room.desks,
        desk_size_x: action.payload.current_room.desk_width,
        desk_size_y: action.payload.current_room.desk_height,
        progress_scales: [
          ["", "$yes", "$no"],
          ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        ],
        class_reminders: action.payload.current_set.reminders,
        current_reminder: 0,
        current_set: action.payload.current_set.name,
        current_scale: 0,
        current_desk: null,
        show_reminders: true,
        is_flipped: false,
        is_swapping: false,
      };
    default:
      return state;
  }
};
