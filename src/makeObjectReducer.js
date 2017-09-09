import makeReducer from "./makeReducer";
import { actionType } from "./util/index";

/** Action Types */
export const EDIT = actionType("EDIT");
export const REMOVE = actionType("REMOVE");

/**
 * Create a reducer that allows setting and removing entries
 * in an object, apart from setting/resetting the entire state.
 */
const makeObjectReducer = (initialValue = {}) => {
  const defaultReducer = makeReducer(initialValue);
  return (state, action) => {
    switch (action.type) {
      case EDIT:
        return {
          ...state,
          ...action.payload
        };
      case REMOVE: {
        const newState = { ...state };
        action.payload.forEach(key => delete newState[key]);
        return newState;
      }
      default:
        return defaultReducer(state, action);
    }
  };
};

export default makeObjectReducer;

/** 
 * Reducer obtained using `makeObjectReducer` using the empty
 * object `{}` as the initial state.
 */
export const objectReducer = makeObjectReducer();

/** Action Creators */
export const editObject = edits => ({ type: EDIT, payload: edits });
export const removeKeys = keys => ({ type: REMOVE, payload: keys });
