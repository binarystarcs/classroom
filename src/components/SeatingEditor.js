import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import "materialize-css/dist/css/materialize.min.css";
import GlobalContext from "../context/global/globalContext";
import { LayoutDesk } from "./LayoutDesk";
import { Link } from "react-router-dom";

export const SeatingEditor = () => {
  const globalContext = useContext(GlobalContext);
  const [desks, setDesks] = useState([]);
  const { current_seating, updateCurrentSeating, error } = globalContext;
  const [selectedDesk, setSelectedDesk] = useState(null);
  const discardChanges = useRef();

  useEffect(() => {
    console.log("Seating", current_seating);
    const current_set = JSON.parse(window.localStorage.getItem("sets"))?.find(
      (setObj) => setObj.name === current_seating.class_name
    );
    console.log("Set", current_set);
    const current_room = JSON.parse(window.localStorage.getItem("rooms"))?.find(
      (room) => room.name === current_seating.room_name
    );
    console.log("Room", current_room);
    const desk_blueprint = current_room.desks.map((desk, index) => ({
      id: desk.id,
      x: desk.x,
      y: desk.y,
      width: current_room.desk_width,
      height: current_room.desk_height,
      student:
        current_set.students.find(
          (s) => s.id === current_seating.students[index]
        ) || null,
    }));
    console.log("Blueprint", desk_blueprint);
    setDesks(desk_blueprint);
    // eslint-disable-next-line
  }, []);

  const handleDeskClick = (id) => {
    if (selectedDesk === null) {
      setSelectedDesk(id);
    } else {
      // Swap students in desks id and selectedDesk
      setDesks(
        desks.map((desk) =>
          desk.id === id
            ? {
                ...desk,
                student: desks.find((d) => d.id === selectedDesk).student,
              }
            : desk.id === selectedDesk
            ? { ...desk, student: desks.find((d) => d.id === id).student }
            : desk
        )
      );
      setSelectedDesk(null);
    }
  };

  const saveSeating = () => {
    // This should be in order
    const newSeating = desks.map((desk) =>
      desk.student === null ? null : desk.student.id
    );
    updateCurrentSeating(newSeating);
    console.log("New seating:", newSeating);
    if (error === null) {
      discardChanges.current.click();
    } else {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="seating-editor-container">
        {desks.map((desk) => (
          <LayoutDesk
            desk={desk}
            key={desk.id}
            clickMethod={() => {
              handleDeskClick(desk.id);
            }}
          />
        ))}
      </div>

      <button className="btn-large" onClick={saveSeating}>
        SAVE
      </button>
      <Link to="/" className="btn-large">
        EXIT
      </Link>
    </Fragment>
  );
};
