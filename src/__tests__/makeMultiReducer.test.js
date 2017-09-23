import makeMultiReducer, { makeMultiGetter } from "../makeMultiReducer";

const counter = (state = 10, { type }) => {
  switch (type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const counters = makeMultiReducer(counter);
const getCounter = makeMultiGetter(counter);
const currentState = { a: 5, b: 9, c: 19 };

describe("makeMultiReducer", () => {
  it("creates a reducer with initial state {}", () => {
    expect(counters(undefined, "@@INIT")).toEqual({});
  });

  it("multiplexes actions correctly using the default key extractor", () => {
    const action1 = { type: "INCREMENT", key: "a" };
    const expectedState1 = { ...currentState, a: 6 };
    expect(counters(currentState, action1)).toEqual(expectedState1);

    const action2 = { type: "DECREMENT", key: "c" };
    const expectedState2 = { ...currentState, c: 18 };
    expect(counters(currentState, action2)).toEqual(expectedState2);
  });

  it("multiplexes actions correctly using a custom key extractor", () => {
    const counters2 = makeMultiReducer(counter, action => action.payload.id);

    const action1 = { type: "INCREMENT", payload: { id: "a" } };
    const expectedState1 = { ...currentState, a: 6 };
    expect(counters2(currentState, action1)).toEqual(expectedState1);

    const action2 = { type: "DECREMENT", payload: { id: "c" } };
    const expectedState2 = { ...currentState, c: 18 };
    expect(counters2(currentState, action2)).toEqual(expectedState2);
  });
});

describe("makeMultiGetter", () => {
  it("returns the initial state for a uninitialized key", () => {
    expect(getCounter(currentState, "d")).toEqual(10);
  });

  it("returns the current state for an initialized key", () => {
    expect(getCounter(currentState, "c")).toEqual(19);
  });
});
