import React from "react";

export const LayoutDesk = (props) => {
  const { desk, clickMethod } = props;

  const generateStyle = () => {
    let styleObject = {
      height: desk.height + "%",
      width: desk.width + "%",
      borderWidth: "2px",
      borderColor: "hsl(0, 0%, 10%)",
      left: desk.x + "%",
      top: desk.y + "%",
    };
    return styleObject;
  };

  return (
    <div className="desk" style={generateStyle()} onClick={clickMethod}>
      <div className="student-name">
        {desk.student ? desk.student.name : ""}
      </div>
    </div>
  );
};
