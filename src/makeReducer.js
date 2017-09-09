import { actionType } from "./util/index";

/** Action Types */
export const SET = actionType("SET");
export const RESET = actionType("RESET");

/**
 * Create a reducer that allows two actions:
 * 1. Changing the state to new value using 'SET'
 * 2. Setting the value back to the initialState using 'RESET'
 */
const makeReducer = initialState => (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET:
      return payload;
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default makeReducer;

/** Action Creators */
export const setValue = value => ({ type: SET, payload: value });
export const resetValue = () => ({ type: RESET });
