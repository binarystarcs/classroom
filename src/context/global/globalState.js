import React, { useReducer } from "react";
import globalReducer from "./globalReducer";
import GlobalContext from "./globalContext";
// import axios from "axios";
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

const GlobalState = (props) => {
  const initialState = {
    rooms: [
      {
        name: "Room A",
        desk_width: 16,
        desk_height: 12,
        desks: [
          // Note desk ids are always 0..length-1
          { id: 0, x: 20, y: 40 },
          { id: 1, x: 44, y: 40 },
          { id: 2, x: 68, y: 40 },
          { id: 3, x: 32, y: 70 },
          { id: 4, x: 56, y: 70 },
        ],
      },
      {
        name: "Room B",
        desk_width: 14,
        desk_height: 10,
        desks: [
          { id: 0, x: 10, y: 33 },
          { id: 1, x: 30, y: 33 },
          { id: 2, x: 50, y: 33 },
          { id: 3, x: 70, y: 33 },
        ],
      },
    ],
    current_room: null,
    sets: [
      {
        name: "Potions",
        reminders: ["Give back books", "Reschedule lesson"],
        students: [
          {
            id: 1,
            name: "Harry",
            reminder: null,
          },
          {
            id: 2,
            name: "Ron",
            reminder: "Half-blood prince book",
          },
          {
            id: 3,
            name: "Hermione",
            reminder: null,
          },
        ],
      },
      {
        name: "Dark Arts Defence",
        reminders: null,
        students: [
          {
            id: 4,
            name: "Harry",
            reminder: null,
          },
          {
            id: 2,
            name: "Draco",
            reminder: "Call dad",
          },
          {
            id: 3,
            name: "Neville",
            reminder: null,
          },
        ],
      },
    ],
    current_set: null,
    seatings: [
      {
        room_name: "Room A",
        class_name: "Potions",
        students: [3, 1, null, 2, null],
      },
      {
        room_name: "Room B",
        class_name: "Dark Arts Defence",
        students: [2, null, 4, 3],
      },
    ],
    error: null,
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const clearCurrentSet = () => {
    dispatch({ type: CLEAR_CURRENT_SET, payload: null });
  };

  const clearCurrentRoom = () => {
    dispatch({ type: CLEAR_CURRENT_ROOM, payload: null });
  };

  const addRoom = (room_name) => {
    dispatch({ type: ADD_ROOM, payload: room_name });
  };

  const addSet = (set_name) => {
    dispatch({ type: ADD_SET, payload: set_name });
  };

  const setCurrentSet = (set_name) => {
    dispatch({ type: SET_CURRENT_SET, payload: set_name });
  };

  const setCurrentRoom = (room_name) => {
    dispatch({ type: SET_CURRENT_ROOM, payload: room_name });
  };

  const updateCurrentRoom = (room_data) => {
    dispatch({ type: EDIT_CURRENT_ROOM, payload: room_data });
  };

  const updateCurrentSet = (set_data) => {
    dispatch({ type: EDIT_CURRENT_SET, payload: set_data });
  };

  const updateCurrentSeating = (seating_data) => {
    dispatch({ type: EDIT_CURRENT_SEATING, payload: seating_data });
  };

  return (
    <GlobalContext.Provider
      value={{
        rooms: state.rooms,
        sets: state.sets,
        seatings: state.seatings,
        current_room: state.current_room,
        current_set: state.current_set,
        error: state.error,
        clearCurrentSet,
        clearCurrentRoom,
        addSet,
        addRoom,
        setCurrentSet,
        setCurrentRoom,
        updateCurrentRoom,
        updateCurrentSeating,
        updateCurrentSet,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
