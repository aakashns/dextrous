'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var redux = require('redux');

var ACTION_PREFIX = "@@composable-redux/";

/** Prefix an action type to avoid collisions */
var actionType = function actionType(str) {
  return ACTION_PREFIX + str;
};

/** Action Types */
var SET = actionType("SET");
var RESET = actionType("RESET");

/**
 * Create a reducer that allows two actions:
 * 1. Changing the state to new value using 'SET'
 * 2. Setting the value back to the initialState using 'RESET'
 */
var makeReducer = function makeReducer(initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
      case SET:
        return payload;
      case RESET:
        return initialState;
      default:
        return state;
    }
  };
};

/** Action Creators */
var setValue = function setValue(value) {
  return { type: SET, payload: value };
};
var resetValue = function resetValue() {
  return { type: RESET };
};

/** Key for storing the name of a reducer */
var NAME_KEY = "__NAME__";

/** Key for storing the whitelisted action types in a named reducer */
var WHITELIST_KEY = "__WHITELIST__";

/** Get the name of a named reducer */
var getReducerName = function getReducerName(reducer) {
  return reducer[NAME_KEY];
};

/** Directly set the name of reducer (not to be used directly) */
var setReducerName = function setReducerName(reducer, name) {
  return reducer[NAME_KEY] = name;
};

/** Get the whitelisted actions for a named reducer */
var getWhitelist = function getWhitelist(reducer) {
  return reducer[WHITELIST_KEY] || [];
};

/** Set the whitelisted actions for a named reducer */
var setWhitelist = function setWhitelist(reducer, whitelist) {
  return reducer[WHITELIST_KEY] = whitelist;
};

/**
 * Wrap a reducer to respond only to actions carrying the given name
 * @param reducer The reducer function to be wrapped
 * @param name Name to be given to the wrapped reducer
 * @param whitelist Action types to be handled even without a name
 */
var nameReducer = function nameReducer(reducer, name) {
  var whitelist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var namedReducer = function namedReducer(state, action) {
    if (state !== undefined && getReducerName(namedReducer) !== action.name && getWhitelist(namedReducer).indexOf(action.type) === -1) {
      return state;
    }
    return reducer(state, action);
  };
  setReducerName(namedReducer, name);
  setWhitelist(namedReducer, whitelist);
  return namedReducer;
};

/**
 * Given an dictionary of reducers, returns a new dictionary of reducers
 * named using the corresponding keys, by applying `nameReducer`.
 */
var nameReducers = function nameReducers(obj) {
  return Object.keys(obj).reduce(function (result, key) {
    result[key] = nameReducer(obj[key], key);
    return result;
  }, {});
};

/**
 * Name a dictionary of reducers using the keys, and create a single
 * reducer using combineReducers.
 */
var nameAndCombineReducers = redux.compose(redux.combineReducers, nameReducers);

/**
 * Given a reducer and an array of names, returns a dictionary of
 * named reducers wrapping the given reducer and carrying the
 * corresponding names.
 */
var makeNamedReducers = function makeNamedReducers(reducer, names) {
  return names.reduce(function (result, key) {
    result[key] = nameReducer(reducer, key);
    return result;
  }, {});
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/** 
 * Attach a name to an action, to target a named reducer 
 */
var nameAction = function nameAction(action, name) {
  return _extends({}, action, { name: name });
};
/**
 * Wrap an action creator to attach a name to the resulting action.
 */
var nameActionCreator = function nameActionCreator(actionCreator, name) {
  return function () {
    return nameAction(actionCreator.apply(undefined, arguments), name);
  };
};

/**
 * Given a dictionary of action creators and a name, create a new 
 * dictionary of action creators that product named actions.
 */
var nameActionCreators = function nameActionCreators(obj, name) {
  return Object.keys(obj).reduce(function (result, key) {
    result[key] = nameActionCreator(obj[key], name);
    return result;
  }, {});
};

/**
 * Drop-in replacement for `bindActionCreators` to add the given name
 * to the resulting actions. 
 */
var nameAndBindActionCreators = function nameAndBindActionCreators(actionCreators, name, dispatch) {
  return redux.bindActionCreators(nameActionCreators(actionCreators, name), dispatch);
};

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/** Action Types */
var EDIT = actionType("EDIT");
var REMOVE = actionType("REMOVE");

/**
 * Create a reducer that allows setting and removing entries
 * in an object, apart from setting/resetting the entire state.
 */
var makeObjectReducer = function makeObjectReducer() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaultReducer = makeReducer(initialValue);
  return function (state, action) {
    switch (action.type) {
      case EDIT:
        return _extends$1({}, state, action.payload);
      case REMOVE:
        {
          var newState = _extends$1({}, state);
          action.payload.forEach(function (key) {
            return delete newState[key];
          });
          return newState;
        }
      default:
        return defaultReducer(state, action);
    }
  };
};

/** 
 * Reducer obtained using `makeObjectReducer` using the empty
 * object `{}` as the initial state.
 */
var objectReducer = makeObjectReducer();

/** Action Creators */
var editObject = function editObject(edits) {
  return { type: EDIT, payload: edits };
};
var removeKeys = function removeKeys(keys) {
  return { type: REMOVE, payload: keys };
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** Action Types */
var ADD = actionType("ADD");

/**
 * Create a reducer that allows adding (and soon removing)
 * items from a list, apart from setting/resetting the entire state.
 */
var makeListReducer = function makeListReducer() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var defaultReducer = makeReducer(initialState);
  return function (state, action) {
    switch (action.type) {
      case ADD:
        return [].concat(_toConsumableArray(state), _toConsumableArray(action.payload));
      default:
        return defaultReducer(state, action);
    }
  };
};

/** 
 * Reducer obtained using `makeObjectReducer` using the empty
 * object `{}` as the initial state.
 */
var listReducer = makeListReducer();

/** Action Creators */
var addItems = function addItems(items) {
  return { type: ADD, payload: items };
};
var addItem = function addItem(item) {
  return addItems([item]);
};

exports.makeReducer = makeReducer;
exports.setValue = setValue;
exports.resetValue = resetValue;
exports.nameReducer = nameReducer;
exports.nameAction = nameAction;
exports.nameActionCreator = nameActionCreator;
exports.nameActionCreators = nameActionCreators;
exports.makeNamedReducers = makeNamedReducers;
exports.nameReducers = nameReducers;
exports.nameAndCombineReducers = nameAndCombineReducers;
exports.nameAndBindActionCreators = nameAndBindActionCreators;
exports.makeObjectReducer = makeObjectReducer;
exports.editObject = editObject;
exports.removeKeys = removeKeys;
exports.objectReducer = objectReducer;
exports.makeListReducer = makeListReducer;
exports.listReducer = listReducer;
exports.addItem = addItem;
exports.addItems = addItems;
