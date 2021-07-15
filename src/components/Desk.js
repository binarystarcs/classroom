import React, { useContext, Fragment } from "react";
import ClassroomContext from "../context/classroom/classroomContext";
import { prettyDisplay } from "../utils/PrettyProgressDisplay";

export const Desk = (props) => {
  const classroomContext = useContext(ClassroomContext);
  const {
    students,
    progress_scales,
    current_scale,
    desk_size_x,
    desk_size_y,
    is_flipped,
    is_swapping,
    current_desk,
    setCurrentDesk,
    decrementStudentProgress,
    incrementStudentProgress,
    cycleStudentFlag,
    swapStudents,
  } = classroomContext;
  const { desk } = props;
  const findStudent = () => {
    let current_student = null;
    students.forEach((student) => {
      if (student.desk_id === desk.id) current_student = student;
    });
    return current_student;
  };

  const current_student = findStudent();

  const FLAG_COLORS = ["black", "red", "green", "blue"];

  const generateStyle = () => {
    let styleObject = {
      height: desk_size_x + "%",
      width: desk_size_y + "%",
      borderWidth: "2px",
      borderColor: "hsl(0, 0%, 10%)",
    };
    if (is_flipped) {
      styleObject = {
        ...styleObject,
        right: desk.x + "%",
        bottom: desk.y + "%",
      };
    } else {
      styleObject = { ...styleObject, left: desk.x + "%", top: desk.y + "%" };
    }
    if (current_student && current_student.flag) {
      styleObject.borderWidth = "5px";
      styleObject.borderColor = FLAG_COLORS[current_student.flag];
    }
    if (current_student && current_student.reminder !== null) {
      styleObject = { ...styleObject, backgroundColor: "yellow" };
    }
    return styleObject;
  };

  const handleNameClick = () => {
    if (!is_swapping) {
      if (students.some((s) => s.desk_id === desk.id)) setCurrentDesk(desk.id);
    } else if (is_swapping) {
      if (current_desk === null) {
        setCurrentDesk(desk.id);
      } else {
        swapStudents(current_desk, desk.id);
        setCurrentDesk(null);
      }
    }
  };

  const isProgressScaleNonZero = () => {
    return current_student.progress[current_scale] !== 0;
  };

  const isProgressScaleNonMax = () => {
    return (
      current_student.progress[current_scale] <
      progress_scales[current_scale].length - 1
    );
  };

  return (
    <div className="desk" style={generateStyle()}>
      <div className="student-name" onClick={handleNameClick}>
        {current_student ? current_student.name : ""}
      </div>
      {current_student && (
        <Fragment>
          {" "}
          {isProgressScaleNonZero() && (
            <button
              className="mini-button student-progress-left"
              onClick={() => decrementStudentProgress(desk.id)}
            >
              &lt;
            </button>
          )}
          <div className="student-progress-text">
            {prettyDisplay(
              progress_scales[current_scale][
                current_student.progress[current_scale]
              ]
            )}
          </div>
          <div
            className="student-flag"
            onClick={() => {
              cycleStudentFlag(desk.id);
            }}
          ></div>{" "}
          {isProgressScaleNonMax() && (
            <button
              className="mini-button student-progress-right"
              onClick={() => incrementStudentProgress(desk.id)}
            >
              &gt;
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
};
