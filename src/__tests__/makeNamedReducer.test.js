import makeNamedReducer from "../makeNamedReducer";
import { setValue, resetValue } from "../makeReducer";
import nameAction from "../nameAction";

const initAction = { type: "@@INIT" };

describe("makeNamedReducer", () => {
  const [
    firstName,
    { setValue: setFirstName, resetValue: resetFirstName }
  ] = makeNamedReducer("firstName", "");

  it("sets the intial state correctly", () => {
    expect(firstName(undefined, initAction)).toEqual("");
  });

  it("sets a new value correctly using a named SET", () => {
    const currentValue = "Adam";
    const newValue = "Roger";
    const setAction = setFirstName(newValue);
    expect(firstName(currentValue, setAction)).toEqual(newValue);
  });

  it("doesn't set a new value using an unnamed SET", () => {
    const currentValue = "Adam";
    const newValue = "Roger";
    const setAction = setValue(newValue);
    expect(firstName(currentValue, setAction)).toEqual(currentValue);
  });

  it("doesn't set a new value using an incorrectly named SET", () => {
    const currentValue = "Adam";
    const newValue = "Roger";
    const setAction = nameAction(setValue(newValue), "lastName");
    expect(firstName(currentValue, setAction)).toEqual(currentValue);
  });

  it("resets to initial value correctly using a named RESET", () => {
    const currentValue = "Adam";
    const resetAction = resetFirstName();
    expect(firstName(currentValue, resetAction)).toEqual("");

    const resetAction2 = resetValue();
    expect(firstName(currentValue, resetAction2)).toEqual(currentValue);

    const resetAction3 = nameAction(resetValue(), "lastName");
    expect(firstName(currentValue, resetAction3)).toEqual(currentValue);
  });
});
