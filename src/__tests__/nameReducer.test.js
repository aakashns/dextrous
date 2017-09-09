import nameReducer from "../nameReducer";
import nameAction from "../nameAction";
import makeReducer, { setValue } from "../makeReducer";

const initAction = { type: "@@INIT" };
const state = 23;
const name = "lightsCamera";

const initialState = 5;
const reducer = makeReducer(initialState);
const namedReducer = nameReducer(reducer, name);

const newValue = 45;
const action = setValue(newValue);
const namedAction = nameAction(action, name);

describe("nameReducer", () => {
  it("sets the name of the reducer correctly", () => {
    expect(namedReducer.__NAME__).toEqual(name);
  });

  it("returns the initial state correctly", () => {
    expect(namedReducer(undefined, initAction)).toEqual(initialState);
  });

  it("doesn't respond to an action without a name", () => {
    expect(namedReducer(state, action)).toEqual(state);
  });

  it("doesn't respond to an action when the name doesn't match", () => {
    const otherName = "biasTowards";
    const otherNamedAction = nameAction(action, otherName);
    expect(namedReducer(state, otherNamedAction)).toEqual(state);
  });

  it("responds to the action when the name matches", () => {
    expect(namedReducer(state, namedAction)).toEqual(newValue);
  });
});
