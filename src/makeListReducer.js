import makeReducer from "./makeReducer";
import { actionType } from "./util";

/** Action Types */
export const ADD = actionType("ADD");

/**
 * Create a reducer that allows adding (and soon removing)
 * items from a list, apart from setting/resetting the entire state.
 */
const makeListReducer = (initialState = []) => {
  const defaultReducer = makeReducer(initialState);
  return (state, action) => {
    switch (action.type) {
      case ADD:
        return [...state, ...action.payload];
      default:
        return defaultReducer(state, action);
    }
  };
};

export default makeListReducer;

/** 
 * Reducer obtained using `makeObjectReducer` using the empty
 * object `{}` as the initial state.
 */
export const listReducer = makeListReducer();

/** Action Creators */
export const addItems = items => ({ type: ADD, payload: items });
export const addItem = item => addItems([item]);
