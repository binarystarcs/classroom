import React, { useContext, useEffect, Fragment } from "react";
import GlobalContext from "../context/global/globalContext";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import Select from "react-select";
import { AddSetModal } from "./AddSetModal";
import { AddRoomModal } from "./AddRoomModal";
import { DeleteSetModal } from "./DeleteSetModal";

export const MainMenu = () => {
  useEffect(() => {
    M.AutoInit();
  });
  const globalContext = useContext(GlobalContext);
  const {
    rooms,
    sets,
    current_room,
    current_set,
    error,
    setCurrentSet,
    setCurrentRoom,
  } = globalContext;

  const handleSetChange = (option) => {
    console.log(`Set changed to ${option.value}`);
    setCurrentSet(option.value);
  };

  const handleRoomChange = (option) => {
    console.log(`Room changed to ${option.value}`);
    setCurrentRoom(option.value);
  };

  return (
    <Fragment>
      <h3 className="main-menu-header">Classroom Manager</h3>
      <div className="main-menu-container">
        <button
          className={`btn-large red modal-trigger ${
            current_set === null && "disabled"
          }`}
          href="#deleteSetModal"
        >
          <i className="material-icons">delete</i>
        </button>
        <button className={`btn-large ${current_set === null && "disabled"}`}>
          <i className="material-icons">edit</i>
        </button>
        <Select
          options={sets.map((setObj) => ({
            value: setObj.name,
            label: setObj.name,
          }))}
          onChange={handleSetChange}
        />
        <button className="btn-large modal-trigger" href="#addSetModal">
          <i className="material-icons">add</i>
        </button>
        <button
          className={`btn-large red modal-trigger ${
            current_room === null && "disabled"
          }`}
        >
          <i className="material-icons">delete</i>
        </button>
        <button className={`btn-large ${current_room === null && "disabled"}`}>
          <i className="material-icons">edit</i>
        </button>
        <Select
          options={rooms.map((roomObj) => ({
            value: roomObj.name,
            label: roomObj.name,
          }))}
          onChange={handleRoomChange}
        />
        <button className="btn-large modal-trigger" href="#addRoomModal">
          <i className="material-icons">add</i>
        </button>
        <button className="btn-large launch-button">Launch</button>
      </div>
      <AddSetModal />
      <AddRoomModal />
      <DeleteSetModal />
    </Fragment>
  );
};
