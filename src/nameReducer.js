import { compose, combineReducers } from "redux";

/** Key for storing the name of a reducer */
const NAME_KEY = "__NAME__";

/** Key for storing the whitelisted action types in a named reducer */
const WHITELIST_KEY = "__WHITELIST__";

/** Get the name of a named reducer */
const getName = reducer => reducer[NAME_KEY];

/** Set the name of reducer */
const setName = (reducer, name) => (reducer[NAME_KEY] = name);

/** Get the whitelisted actions for a named reducer */
const getWhitelist = reducer => reducer[WHITELIST_KEY] || [];

/** Set the whitelisted actions for a named reducer */
const setWhitelist = (reducer, whitelist) =>
  (reducer[WHITELIST_KEY] = whitelist);

/**
 * Wrap a reducer to respond only to actions carrying the given name
 * @param reducer The reducer function to be wrapped
 * @param name Name to be given to the wrapped reducer
 * @param whitelist Action types to be handled even without a name
 */
const nameReducer = (reducer, name, whitelist = []) => {
  const namedReducer = (state, action) => {
    if (
      state !== undefined &&
      getName(namedReducer) !== action.name &&
      getWhitelist(namedReducer).indexOf(action.name) === -1
    ) {
      return state;
    }
    return reducer(state, action);
  };
  setName(namedReducer, name);
  setWhitelist(namedReducer, whitelist);
  return namedReducer;
};

export default nameReducer;

/**
 * Given an dictionary of reducers, returns a new dictionary of reducers
 * named using the corresponding keys, by applying `nameReducer`.
 */
export const nameReducers = obj =>
  Object.keys(obj).reduce((result, key) => {
    result[key] = nameReducer(obj[key], key);
    return result;
  }, {});

/**
 * Name a dictionary of reducers using the keys, and create a single
 * reducer using combineReducers.
 */
export const nameAndCombineReducers = compose(combineReducers, nameReducers);

/**
 * Given a reducer and an array of names, returns a dictionary of
 * named reducers wrapping the given reducer and carrying the
 * corresponding names.
 */
export const makeNamedReducers = (reducer, names) =>
  names.reduce((result, key) => {
    result[key] = nameReducer(reducer, key);
    return result;
  }, {});
