import { bindActionCreators } from "redux";

const nameAction = (action, name) => ({ ...action, name });

export default nameAction;

export const nameActionCreator = (actionCreator, name) => (...args) =>
  nameAction(actionCreator(...args), name);

export const nameActionCreators = (obj, name) =>
  Object.keys(obj).reduce((result, key) => {
    result[key] = nameActionCreator(obj[key], name);
    return result;
  }, {});

export const nameAndBindActionCreators = (actionCreators, name, dispatch) =>
  bindActionCreators(nameActionCreators(actionCreators, name), dispatch);
