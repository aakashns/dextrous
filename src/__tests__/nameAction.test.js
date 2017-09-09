import nameAction, {
  nameActionCreator,
  nameActionCreators,
  nameAndBindActionCreators
} from "../nameAction";
import { setValue } from "../makeReducer";

const name = "lightsCamera";
const newValue = 43;
const action = setValue(newValue);

describe("nameAction", () => {
  it("sets the 'name' key on an action", () => {
    const namedAction = nameAction(action, name);
    expect(namedAction).toEqual({ name, ...action });
  });
});

describe("nameActionCreator", () => {
  it("sets the 'name' key on the resulting action", () => {
    const namedActionCreator = nameActionCreator(setValue, name);
    expect(namedActionCreator(newValue)).toEqual({ ...action, name });
  });
});

describe("nameActionCreators", () => {
  it("name the action creators with the given names", () => {
    const namedActionCreators = nameActionCreators({ setValue }, name);
    expect(namedActionCreators.setValue(newValue)).toEqual({ ...action, name });
  });
});

describe("nameAndBindActionCreators", () => {
  it("name and binds the action creators with the given names", () => {
    const mockDispatch = action => ({ action });
    const namedActionCreator = nameAndBindActionCreators(
      { setValue },
      name,
      mockDispatch
    ).setValue;
    const expectedResult = {
      action: { ...action, name }
    };
    expect(namedActionCreator(newValue)).toEqual(expectedResult);
  });
});
