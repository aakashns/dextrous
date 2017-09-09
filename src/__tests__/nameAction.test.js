import nameAction from "../nameAction";
import { setValue } from "../makeReducer";

const name = "lightsCamera";
const action = setValue(43);
const namedAction = nameAction(action, name);

describe("nameAction", () => {
  it("sets the 'name' key on an action", () => {
    expect(namedAction).toEqual({ name, ...action });
  });
});
