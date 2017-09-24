import makeReducer, { setValue, resetValue } from "./makeReducer";
import nameReducer, {
  nameReducers,
  nameAndCombineReducers,
  makeNamedReducers
} from "./nameReducer";
import nameAction, {
  nameActionCreator,
  nameActionCreators,
  nameAndBindActionCreators
} from "./nameAction";
import makeObjectReducer, {
  objectReducer,
  editObject,
  removeKeys
} from "./makeObjectReducer";
import makeListReducer, {
  listReducer,
  addItem,
  addItems,
  removeItem,
  removeItems
} from "./makeListReducer";
import makeMultiReducer, { makeMultiGetter } from "./makeMultiReducer";
import makeNamedReducer, {
  nameReducerAndCreators,
  makeNamedListReducer,
  makeNamedObjectReducer,
  makeNamedMultiReducer
} from "./makeNamedReducer";

export {
  makeMultiReducer,
  makeMultiGetter,
  makeReducer,
  setValue,
  resetValue,
  nameReducer,
  nameAction,
  nameActionCreator,
  nameActionCreators,
  makeNamedReducers,
  nameReducers,
  nameAndCombineReducers,
  nameAndBindActionCreators,
  makeObjectReducer,
  editObject,
  removeKeys,
  objectReducer,
  makeListReducer,
  listReducer,
  addItem,
  addItems,
  removeItem,
  removeItems,
  nameReducerAndCreators,
  makeNamedReducer,
  makeNamedObjectReducer,
  makeNamedListReducer,
  makeNamedMultiReducer
};
