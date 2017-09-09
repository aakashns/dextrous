import makeReducer from "./makeReducer";

export const EDIT = "@@redux-composable/EDIT";
export const REMOVE = "@@redux-composable/REMOVE";

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

export const objectReducer = makeObjectReducer();

export const editObject = edits => ({
  type: EDIT,
  payload: edits
});

export const removeKeys = keys => ({
  type: REMOVE,
  payload: keys
});
