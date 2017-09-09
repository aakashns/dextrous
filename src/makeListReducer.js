import makeReducer from "./makeReducer";
export const ADD = "@@common-action/ADD";

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
export const listReducer = makeListReducer();

export const addItems = items => ({
  type: ADD,
  payload: items
});

export const addItem = item => addItems([item]);
