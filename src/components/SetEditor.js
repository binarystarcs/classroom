import React, { Fragment, useContext, useEffect, useState } from "react";
import GlobalContext from "../context/global/globalContext";
import "materialize-css/dist/css/materialize.min.css";

export const SetEditor = () => {
  const globalContext = useContext(GlobalContext);
  const { current_set, sets, updateCurrentSet, error } = globalContext;
  const [studentList, setstudentList] = useState([]);

  useEffect(() => {
    const students_blueprint = sets.find(
      (setObj) => setObj.name === current_set
    )?.students;
    if (!students_blueprint) {
      setstudentList([]);
    } else {
      setstudentList(
        students_blueprint.map((student) => ({
          id: student.id,
          name: student.name,
          reminder: student.reminder,
        }))
      );
    }
    // eslint-disable-next-line
  }, []);

  const saveSetlist = () => {
    console.log("Saving set list...");
    updateCurrentSet(studentList);
    if (error !== null) {
      console.log(error);
    } else {
      console.log("Saving successful.");
    }
  };

  const getNameForId = (id) => {
    return studentList.find((student) => student.id === id)?.name;
  };

  const setNameForId = (id, name) => {
    setstudentList(
      studentList.map((student) =>
        student.id === id ? { ...student, name } : student
      )
    );
  };

  return (
    <div>
      <div className="main-menu-header">Edit set list - {current_set}</div>
      <table className="centered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr>
              <td
                className="student-id"
                id={`student-id-${student.id}`}
                key={`student-id-${student.id}`}
              >
                {student.id}
              </td>
              <td
                className="student-name"
                id={`student-name-${student.id}`}
                key={`student-name-${student.id}`}
              >
                <input
                  type="text"
                  value={getNameForId(student.id)}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setNameForId(student.id, e.target.value);
                  }}
                />
              </td>
              <td>
                <button
                  className="btn-small red student-delete-button"
                  id={`student-delete-button-${student.id}`}
                  key={`student-delete-button-${student.id}`}
                >
                  <i className="material-icons">delete</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
