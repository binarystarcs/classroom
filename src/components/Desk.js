import React, { useContext, Fragment } from "react";
import ClassroomContext from "../context/classroom/classroomContext";

export const Desk = (props) => {
  const classroomContext = useContext(ClassroomContext);
  const {
    students,
    progress_scales,
    current_scale,
    desk_size_x,
    desk_size_y,
    is_flipped,
    decrementStudentProgress,
    incrementStudentProgress,
    cycleStudentFlag,
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

  const FLAG_COLORS = ["black", "red", "green", "yellow"];

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
      styleObject.borderWidth = "4px";
      styleObject.borderColor = FLAG_COLORS[current_student.flag];
    }
    return styleObject;
  };

  return (
    <div className="desk" style={generateStyle()}>
      {current_student && (
        <Fragment>
          {" "}
          <div className="student-name">
            {current_student ? current_student.name : ""}
          </div>
          <button
            className="mini-button student-progress-left"
            onClick={() => decrementStudentProgress(desk.id)}
          >
            &lt;
          </button>
          <div className="student-progress-text">
            {
              progress_scales[current_scale][
                current_student.progress[current_scale]
              ]
            }
          </div>
          <div
            className="student-flag"
            onClick={() => {
              cycleStudentFlag(desk.id);
            }}
          ></div>
          <button
            className="mini-button student-progress-right"
            onClick={() => incrementStudentProgress(desk.id)}
          >
            &gt;
          </button>
        </Fragment>
      )}
    </div>
  );
};
