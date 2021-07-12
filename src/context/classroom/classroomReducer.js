/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_CLASS_REMINDER,
    DECREMENT_CURRENT_REMINDER,
    DELETE_CURRENT_REMINDER,
    INCREMENT_CURRENT_REMINDER,
  } from "../types";


export default (state, action) => {
    switch (action.type) {
      case ADD_CLASS_REMINDER:
          return {
              ...state,
              class_reminders: [...state.class_reminders, action.payload]
          };
        case DELETE_CURRENT_REMINDER:
            let modified_reminders = [...state.class_reminders];
            modified_reminders.splice(state.current_reminder, 1);
            let new_current_reminder = state.current_reminder;
            if (new_current_reminder >= modified_reminders.length && new_current_reminder > 0) new_current_reminder -= 1;
            return {
              ...state,  
              class_reminders: modified_reminders,
              current_reminder: new_current_reminder
            };
        case DECREMENT_CURRENT_REMINDER:
            return {
                ...state,
                current_reminder: (state.current_reminder > 0 ? state.current_reminder - 1 : 0),
            };
        case INCREMENT_CURRENT_REMINDER:
            return {
                ...state,
                current_reminder: (state.current_reminder + 1 < state.class_reminders.length ? state.current_reminder + 1 : state.current_reminder),
            };
    
      default:
        return state;
    }
  };
