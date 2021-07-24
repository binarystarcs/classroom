import React, { useContext, useEffect, useRef, Fragment } from "react";
import GlobalContext from "../context/global/globalContext";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import Select from "react-select";
import { AddSetModal } from "./AddSetModal";
import { AddRoomModal } from "./AddRoomModal";
import { DeleteSetModal } from "./DeleteSetModal";
import { DeleteRoomModal } from "./DeleteRoomModal";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { LoadBackupModal } from "./LoadBackupModal";

export const MainMenu = () => {
  useEffect(() => {
    M.AutoInit();
  });
  const setSelect = useRef();
  const roomSelect = useRef();
  const globalContext = useContext(GlobalContext);
  const {
    rooms,
    sets,
    current_room,
    current_set,
    setCurrentSet,
    setCurrentRoom,
    initializeGlobalContext,
  } = globalContext;

  useEffect(() => {
    initializeGlobalContext();
    //eslint-disable-next-line
  }, []);

  const clearSetSelect = () => {
    setSelect.current.state.value = null;
  };

  const clearRoomSelect = () => {
    roomSelect.current.state.value = null;
  };

  const handleSetChange = (option) => {
    setCurrentSet(option.value);
  };

  const handleRoomChange = (option) => {
    setCurrentRoom(option.value);
  };

  const saveLocalStorage = () => {
    const rooms = JSON.parse(localStorage.getItem("rooms"));
    const sets = JSON.parse(localStorage.getItem("sets"));
    const seatings = JSON.parse(localStorage.getItem("seatings"));
    const dump = JSON.stringify({ sets, rooms, seatings });
    const filename = "classroom_backup.txt";
    var blob = new Blob([dump], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
    console.log(`Data saved as ${filename}`);
  };

  return (
    <Fragment>
      <h3 className="main-menu-header">Classroom Assistant</h3>
      <div className="main-menu-container">
        <button
          className={`btn-large red modal-trigger ${
            current_set === null && "disabled"
          }`}
          href="#deleteSetModal"
        >
          <i className="material-icons">delete</i>
        </button>
        <Link to={current_set === null ? "/" : "/setlist"}>
          <button className={`btn-large ${current_set === null && "disabled"}`}>
            <i className="material-icons">edit</i>
          </button>
        </Link>
        <Select
          options={sets.map((setObj) => ({
            value: setObj.name,
            label: setObj.name,
          }))}
          onChange={handleSetChange}
          ref={setSelect}
        />
        <button className="btn-large modal-trigger" href="#addSetModal">
          <i className="material-icons">add</i>
        </button>
        <button
          className={`btn-large red modal-trigger ${
            current_room === null && "disabled"
          }`}
          href="#deleteRoomModal"
        >
          <i className="material-icons">delete</i>
        </button>
        <Link to={current_room === null ? "/" : "/layout"}>
          <button
            className={`btn-large ${current_room === null && "disabled"}`}
          >
            <i className="material-icons">edit</i>
          </button>
        </Link>
        <Select
          options={rooms.map((roomObj) => ({
            value: roomObj.name,
            label: roomObj.name,
          }))}
          onChange={handleRoomChange}
          ref={roomSelect}
        />
        <button className="btn-large modal-trigger" href="#addRoomModal">
          <i className="material-icons">add</i>
        </button>
        {current_set !== null && current_room !== null && (
          <Fragment>
            <Link to="/seating" className="launch-button-link wide">
              <button
                className={`btn-large launch-button wide ${
                  (current_set === null || current_room === null) && "disabled"
                }`}
              >
                Edit Seating Arrangement
              </button>
            </Link>
            <Link to="/lesson" className="launch-button-link wide">
              <button
                className={`btn-large launch-button wide green ${
                  (current_set === null || current_room === null) && "disabled"
                }`}
              >
                Launch
              </button>
            </Link>
          </Fragment>
        )}
      </div>
      <button
        className="btn bottom-left-button grey"
        onClick={saveLocalStorage}
      >
        BACKUP DATA
      </button>
      <button
        className="btn bottom-right-button grey modal-trigger"
        href="#loadBackupModal"
      >
        RESTORE FROM BACKUP
      </button>
      <AddSetModal />
      <AddRoomModal />
      <DeleteSetModal clearSetSelect={clearSetSelect} />
      <DeleteRoomModal clearRoomSelect={clearRoomSelect} />
      <LoadBackupModal />
    </Fragment>
  );
};
