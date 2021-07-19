import React, { useContext } from "react";
import GlobalContext from "../context/global/globalContext";
import Select from "react-select";

export const MainMenu = () => {
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
    <div className="main-menu-container">
      <Select
        options={sets.map((setObj) => ({
          value: setObj.name,
          label: setObj.name,
        }))}
        onChange={handleSetChange}
      />
      <Select
        options={rooms.map((roomObj) => ({
          value: roomObj.name,
          label: roomObj.name,
        }))}
        onChange={handleRoomChange}
      />
    </div>
  );
};
