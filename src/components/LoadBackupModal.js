import React, { useContext, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import GlobalContext from "../context/global/globalContext";

export const LoadBackupModal = () => {
  const globalContext = useContext(GlobalContext);
  const { initializeGlobalContext } = globalContext;
  const [modalMessage, setModalMessage] = useState("");

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    try {
      const dump = JSON.parse(content);
      const sets = JSON.stringify(dump["sets"]);
      const rooms = JSON.stringify(dump["rooms"]);
      const seatings = JSON.stringify(dump["seatings"]);
      window.localStorage.setItem("sets", sets);
      window.localStorage.setItem("rooms", rooms);
      window.localStorage.setItem("seatings", seatings);
      setModalMessage("Backup loaded. Click outside this window to close.");
      initializeGlobalContext();
    } catch {
      setModalMessage("Invalid file format. Try a different file");
    }
    setTimeout(handleDismiss, 5000);
  };

  const handleDismiss = () => {
    setModalMessage("");
  };

  const handleFileUpload = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div id="loadBackupModal" className="modal">
      <div className="modal-content">
        <h6 className="centered">
          <span>Upload your backup file here: &nbsp;&nbsp;</span>
          <input
            type="file"
            id="file"
            className="input-file"
            accept=".txt"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </h6>
      </div>
      <div className="add-reminder-modal-footer modal-footer">
        <div className="modal-message">{modalMessage}</div>
      </div>
    </div>
  );
};
