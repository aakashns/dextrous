import { actionType } from "./util";

const INIT = actionType("INIT");
const defaultKeyExtractor = action => action.key;

const makeMultiReducer = (reducer, keyExtractor = defaultKeyExtractor) => {
  const multiReducer = (state = {}, action) => {
    const key = keyExtractor(action);
    if (!key) return state;
    return {
      ...state,
      [key]: reducer(state[key], action)
    };
  };
  return multiReducer;
};

export default makeMultiReducer;

export const makeMultiGetter = reducer => (state, name) =>
  state[name] || reducer(undefined, { type: INIT });
