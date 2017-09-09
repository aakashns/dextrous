import { bindActionCreators } from "redux";

/** 
 * Attach a name to an action, to target a named reducer 
 */
const nameAction = (action, name) => ({ ...action, name });
export default nameAction;

/**
 * Wrap an action creator to attach a name to the resulting action.
 */
export const nameActionCreator = (actionCreator, name) => (...args) =>
  nameAction(actionCreator(...args), name);

/**
 * Given a dictionary of action creators and a name, create a new 
 * dictionary of action creators that product named actions.
 */
export const nameActionCreators = (obj, name) =>
  Object.keys(obj).reduce((result, key) => {
    result[key] = nameActionCreator(obj[key], name);
    return result;
  }, {});

/**
 * Drop-in replacement for `bindActionCreators` to add the given name
 * to the resulting actions. 
 */
export const nameAndBindActionCreators = (actionCreators, name, dispatch) =>
  bindActionCreators(nameActionCreators(actionCreators, name), dispatch);
