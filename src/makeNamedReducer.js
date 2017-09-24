import makeReducer, { setValue, resetValue } from "./makeReducer";
import makeObjectReducer, {
  editObject,
  removeKey,
  removeKeys,
  objectReducer,
  REMOVE
} from "./makeObjectReducer";
import makeListReducer, {
  addItem,
  addItems,
  removeItem,
  removeItems
} from "./makeListReducer";
import makeMultiReducer from "./makeMultiReducer";
import nameReducer from "./nameReducer";
import { nameActionCreators } from "./nameAction";

/** Name a [reducer, { actionCreators }] pair */
export const nameReducerAndCreators = ([reducer, actionCreators], name) => [
  nameReducer(reducer, name),
  nameActionCreators(actionCreators, name)
];

const narc = nameReducerAndCreators;

/** Create a named [reducer, { actionCreators }] pair for a normal reducer */
const makeNamedReducer = (name, initialState) =>
  narc([makeReducer(initialState), { setValue, resetValue }], name);

export default makeNamedReducer;

/** Create a named [reducer, { actionCreators }] pair for an object reducer */
export const makeNamedObjectReducer = (name, initialState) =>
  narc(
    [
      makeObjectReducer(initialState),
      { setValue, resetValue, editObject, removeKey, removeKeys }
    ],
    name
  );

/** Create a named [reducer, { actionCreators }] pair for list reducer */
export const makeNamedListReducer = (name, initialState) =>
  narc(
    [
      makeListReducer(initialState),
      { setValue, resetValue, addItem, addItems, removeItem, removeItems }
    ],
    name
  );

/** Creates a named [multiReducer, { actions }] pair with an extra REMOVE action */
export const makeNamedMultiReducer = (
  [reducer, actionCreators],
  name,
  keyExtractor
) => {
  const multiReducer = makeMultiReducer(reducer, keyExtractor);
  const enhancedReducer = (state, action) => {
    switch (action.type) {
      case REMOVE:
        return objectReducer(state, action);
      default:
        return multiReducer(state, action);
    }
  };
  return narc([enhancedReducer, actionCreators], name);
};
