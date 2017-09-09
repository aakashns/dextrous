import makeReducer, { setValue, resetValue } from "../makeReducer";

const initialState = 0;
const initAction = { type: "@@INIT" };
const sampleReducer = makeReducer(initialState);
const sampleState = 23;

describe("makeReducer", () => {
  test("sets the initial value correctly", () => {
    expect(sampleReducer(undefined, initAction)).toEqual(initialState);
  });

  test("sets a new value correctly using SET", () => {
    const newValue = 45;
    const setAction = setValue(newValue);
    expect(sampleReducer(sampleState, setAction)).toEqual(newValue);
  });

  test("resets the value to initial state with RESET", () => {
    const resetAction = resetValue();
    expect(sampleReducer(sampleState, resetAction)).toEqual(initialState);
  });
});
