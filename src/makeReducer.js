export const SET = "@@redux-composable/SET";
export const RESET = "@@redux-composable/RESET";

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

export const setValue = value => ({
  type: SET,
  payload: value
});

export const resetValue = () => ({
  type: RESET
});
