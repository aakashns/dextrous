"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeNamedMultiReducer = exports.makeNamedListReducer = exports.makeNamedObjectReducer = exports.makeNamedReducer = exports.nameReducerAndCreators = exports.removeItems = exports.removeItem = exports.addItems = exports.addItem = exports.listReducer = exports.makeListReducer = exports.objectReducer = exports.removeKeys = exports.editObject = exports.makeObjectReducer = exports.nameAndBindActionCreators = exports.nameAndCombineReducers = exports.nameReducers = exports.makeNamedReducers = exports.nameActionCreators = exports.nameActionCreator = exports.nameAction = exports.nameReducer = exports.resetValue = exports.setValue = exports.makeReducer = exports.makeMultiGetter = exports.makeMultiReducer = undefined;

var _makeReducer = require("./makeReducer");

var _makeReducer2 = _interopRequireDefault(_makeReducer);

var _nameReducer = require("./nameReducer");

var _nameReducer2 = _interopRequireDefault(_nameReducer);

var _nameAction = require("./nameAction");

var _nameAction2 = _interopRequireDefault(_nameAction);

var _makeObjectReducer = require("./makeObjectReducer");

var _makeObjectReducer2 = _interopRequireDefault(_makeObjectReducer);

var _makeListReducer = require("./makeListReducer");

var _makeListReducer2 = _interopRequireDefault(_makeListReducer);

var _makeMultiReducer = require("./makeMultiReducer");

var _makeMultiReducer2 = _interopRequireDefault(_makeMultiReducer);

var _makeNamedReducer = require("./makeNamedReducer");

var _makeNamedReducer2 = _interopRequireDefault(_makeNamedReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.makeMultiReducer = _makeMultiReducer2.default;
exports.makeMultiGetter = _makeMultiReducer.makeMultiGetter;
exports.makeReducer = _makeReducer2.default;
exports.setValue = _makeReducer.setValue;
exports.resetValue = _makeReducer.resetValue;
exports.nameReducer = _nameReducer2.default;
exports.nameAction = _nameAction2.default;
exports.nameActionCreator = _nameAction.nameActionCreator;
exports.nameActionCreators = _nameAction.nameActionCreators;
exports.makeNamedReducers = _nameReducer.makeNamedReducers;
exports.nameReducers = _nameReducer.nameReducers;
exports.nameAndCombineReducers = _nameReducer.nameAndCombineReducers;
exports.nameAndBindActionCreators = _nameAction.nameAndBindActionCreators;
exports.makeObjectReducer = _makeObjectReducer2.default;
exports.editObject = _makeObjectReducer.editObject;
exports.removeKeys = _makeObjectReducer.removeKeys;
exports.objectReducer = _makeObjectReducer.objectReducer;
exports.makeListReducer = _makeListReducer2.default;
exports.listReducer = _makeListReducer.listReducer;
exports.addItem = _makeListReducer.addItem;
exports.addItems = _makeListReducer.addItems;
exports.removeItem = _makeListReducer.removeItem;
exports.removeItems = _makeListReducer.removeItems;
exports.nameReducerAndCreators = _makeNamedReducer.nameReducerAndCreators;
exports.makeNamedReducer = _makeNamedReducer2.default;
exports.makeNamedObjectReducer = _makeNamedReducer.makeNamedObjectReducer;
exports.makeNamedListReducer = _makeNamedReducer.makeNamedListReducer;
exports.makeNamedMultiReducer = _makeNamedReducer.makeNamedMultiReducer;