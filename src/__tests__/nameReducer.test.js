import nameReducer, {
  nameReducers,
  nameAndCombineReducers,
  makeNamedReducers,
  getReducerName,
  getWhitelist
} from "../nameReducer";
import nameAction from "../nameAction";
import makeReducer, { setValue, RESET, resetValue } from "../makeReducer";

const initAction = { type: "@@INIT" };
const state = 23;
const name = "lightsCamera";

const initialValue = 5;
const reducer = makeReducer(initialValue);
const namedReducer = nameReducer(reducer, name, [RESET]);

const newValue = 45;
const action = setValue(newValue);
const namedAction = nameAction(action, name);

describe("nameReducer", () => {
  it("sets the name of the reducer correctly", () => {
    expect(getReducerName(namedReducer)).toEqual(name);
  });

  it("returns the initial state correctly", () => {
    expect(namedReducer(undefined, initAction)).toEqual(initialValue);
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

  it("responds to the action when it matches the whitelist", () => {
    expect(namedReducer(state, resetValue())).toEqual(initialValue);
  });

  it("attaches an empty whitelist when one isn't provided", () => {
    const namedReducer2 = nameReducer(reducer, name);
    expect(getWhitelist(namedReducer2)).toEqual([]);
    expect(namedReducer2(state, resetValue())).toEqual(state);
    expect(getWhitelist(reducer)).toEqual([]);
  });
});

describe("nameReducers", () => {
  it("sets the names of the provided reducers correctly", () => {
    const namedReducers = nameReducers({
      reducer1: reducer,
      reducer2: reducer
    });
    expect(getReducerName(namedReducers.reducer1)).toEqual("reducer1");
    expect(getReducerName(namedReducers.reducer2)).toEqual("reducer2");
  });
});

describe("makeNamedReducers", () => {
  it("creates reducers with the provided names", () => {
    const namedReducers = makeNamedReducers(reducer, ["reducer3", "reducer4"]);
    expect(getReducerName(namedReducers.reducer3)).toEqual("reducer3");
    expect(getReducerName(namedReducers.reducer4)).toEqual("reducer4");
  });
});

describe("nameAndCombineReducers", () => {
  it("creates a combined reducer with the provided names", () => {
    const combinedReducer = nameAndCombineReducers({
      reducer5: reducer,
      reducer6: reducer
    });
    const initialState = combinedReducer(undefined, initAction);
    expect(initialState).toEqual({
      reducer5: initialValue,
      reducer6: initialValue
    });

    const namedAction = nameAction(action, "reducer6");
    const newState = combinedReducer(initialState, namedAction);
    expect(newState).toEqual({
      ...initialState,
      reducer6: newValue
    });
  });
});
