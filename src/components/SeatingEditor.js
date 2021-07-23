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
    const current_set = JSON.parse(window.localStorage.getItem("sets"))?.find(
      (setObj) => setObj.name === current_seating.class_name
    );
    const current_room = JSON.parse(window.localStorage.getItem("rooms"))?.find(
      (room) => room.name === current_seating.room_name
    );
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
    if (error === null) {
      discardChanges.current.click();
    } else {
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

      <button className="btn-large bottom-right-button" onClick={saveSeating}>
        SAVE
      </button>
      <Link
        to="/"
        ref={discardChanges}
        className="btn-large bottom-left-button"
      >
        DISCARD
      </Link>
    </Fragment>
  );
};
