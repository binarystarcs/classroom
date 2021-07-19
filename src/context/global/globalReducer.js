/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ROOM,
  ADD_SET,
  CLEAR_CURRENT_ROOM,
  CLEAR_CURRENT_SET,
  EDIT_CURRENT_ROOM,
  EDIT_CURRENT_SEATING,
  EDIT_CURRENT_SET,
  SET_CURRENT_ROOM,
  SET_CURRENT_SET,
} from "../types";

const updateSeatingWithClass = (seating_list, set_list, room_desk_count) => {
  let expanded_seating_list = seating_list;
  for (let i = seating_list.length; i < room_desk_count; i += 1)
    expanded_seating_list.push(null);
  const eliminated_list = expanded_seating_list
    .slice(0, room_desk_count)
    .map((value) =>
      set_list.some((student) => student.id === value) ? value : null
    );
  const unseated_students = set_list
    .filter((student) => seating_list.some((value) => value === student.id))
    .map((student) => student.id);
  return eliminated_list.map((value) =>
    value === null
      ? unseated_students.length
        ? unseated_students.shift()
        : null
      : value
  );
};

export default (state, action) => {
  switch (action.type) {
    case CLEAR_CURRENT_SET:
      return {
        ...state,
        current_set: null,
        current_seating: null,
        error: null,
      };
    case CLEAR_CURRENT_ROOM:
      return {
        ...state,
        current_room: null,
        current_seating: null,
        error: null,
      };
    case SET_CURRENT_SET:
      if (!state.sets.some((setObj) => setObj.name === action.payload))
        return {
          ...state,
          error: "Set does not exist",
          current_set: null,
          current_seating: null,
        };
      return {
        ...state,
        current_set: action.payload,
        current_seating:
          state.seatings.find(
            (seating) =>
              seating.room_name === state.current_room &&
              seating.class_name === state.current_set
          ) || null,
      };
    case SET_CURRENT_ROOM:
      if (!state.rooms.some((setObj) => setObj.name === action.payload))
        return {
          ...state,
          error: "Room does not exist",
          current_set: null,
          current_seating: null,
        };
      return {
        ...state,
        current_room: action.payload,
        current_seating:
          state.seatings.find(
            (seating) =>
              seating.room_name === state.current_room &&
              seating.class_name === state.current_set
          ) || null,
      };
    case ADD_SET:
      if (state.sets.some((setObj) => setObj.name === action.payload))
        return {
          ...state,
          error: "Set already exists",
        };
      return {
        ...state,
        sets: [
          ...state.sets,
          { name: action.payload, reminders: [], students: [] },
        ],
        seatings: [
          ...state.seatings,
          ...state.rooms.map((room) => ({
            room_name: room.name,
            class_name: action.payload,
            students: new Array(room.desks.length).fill(null),
          })),
        ],
        error: null,
      };
    case ADD_ROOM:
      if (state.rooms.some((setObj) => setObj.name === action.payload))
        return {
          ...state,
          error: "Room already exists",
        };
      return {
        ...state,
        rooms: [
          ...state.rooms,
          { name: action.payload, desk_width: 16, desk_height: 12, desks: [] },
        ],
        seatings: [
          ...state.seatings,
          ...state.sets.map((setObj) => ({
            room_name: action.payload,
            class_name: setObj.name,
            students: [],
          })),
        ],
        error: null,
      };
    case EDIT_CURRENT_SET:
      if (!state.current_set) return { ...state, error: "No current set" };
      return {
        ...state,
        error: null,
        sets: state.sets.map((setObj) =>
          setObj.name === state.current_set
            ? { ...setObj, students: action.payload }
            : setObj
        ),
        seatings: state.seatings.map((seating) =>
          seating.class_name === state.current_set
            ? updateSeatingWithClass(
                seating.students,
                action.payload,
                seating.students.length
              )
            : seating
        ),
      };
    case EDIT_CURRENT_ROOM:
      if (!state.current_room) return { ...state, error: "No current room" };
      return {
        ...state,
        error: null,
        rooms: state.rooms.map((room) =>
          room.name === state.current_room
            ? {
                ...room,
                desk_width: action.payload.desk_width,
                desk_height: action.payload.desk_height,
                desks: action.payload.desks,
              } // Consider validating action.payload.desks
            : room
        ),
        seatings: state.seatings.map((seating) =>
          seating.room_name === state.current_room
            ? updateSeatingWithClass(
                seating.students,
                state.sets.find((setObj) => setObj.name === seating.class_name)
                  .students,
                action.payload.desks.length
              )
            : seating
        ),
      };
    case EDIT_CURRENT_SEATING:
      if (!state.current_seating)
        return { ...state, error: "No current seating" };
      if (action.payload.length !== state.current_seating.students.length)
        return { ...state, error: "Seating arrangement length incorrect." };
      if (
        [...action.payload].sort() !==
        [...state.current_seating.students].sort()
      )
        return { ...state, error: "Incorrect student IDs" };
      return {
        ...state,
        seatings: state.seatings.map((seating) =>
          seating.room_name === state.current_seating.room_name &&
          seating.class_name === state.current_seating.class_name
            ? {
                ...seating,
                students: action.payload,
              }
            : seating
        ),
        current_seating: {
          ...state.current_seating,
          students: action.payload,
        },
        error: null,
      };
    default:
      return state;
  }
};
