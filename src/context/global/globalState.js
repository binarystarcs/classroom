import React, { useReducer } from "react";
import globalReducer from "./globalReducer";
import GlobalContext from "./globalContext";
// import axios from "axios";
import { CLEAR_CURRENT_CLASS } from "../types";

const GlobalState = (props) => {
  const initialState = {
    current_class: null,
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const clearCurrentClass = () => {
    dispatch({ type: CLEAR_CURRENT_CLASS, payload: null });
  };
  return (
    <GlobalContext.Provider
      value={{
        current_class: state.current_class,
        clearCurrentClass,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
