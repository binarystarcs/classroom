/* eslint-disable import/no-anonymous-default-export */
import { CLEAR_CURRENT_CLASS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case CLEAR_CURRENT_CLASS:
      return {
        ...state,
        current_class: null,
      };
    default:
      return state;
  }
};
