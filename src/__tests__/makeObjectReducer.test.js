import makeObjectReducer, {
  editObject,
  removeKeys,
  removeKey
} from "../makeObjectReducer";

const initAction = { type: "@@INIT" };
const initialState = { a: 1, b: 2 };
const reducer = makeObjectReducer(initialState);
const state = { a: 3, c: 7, f: 73 };

describe("makeObjectReducer", () => {
  it("sets the initial state correctly", () => {
    expect(reducer(undefined, initAction)).toEqual(initialState);
  });

  it("edits the state object correctly with EDIT", () => {
    const edits = { c: 45, d: 97 };
    const editAction = editObject(edits);

    const expectedState = {
      ...state,
      ...edits
    };
    expect(reducer(state, editAction)).toEqual(expectedState);
  });

  it("removes keys correctly with REMOVE", () => {
    const removeAction = removeKeys(["a", "f"]);
    const expectedState = { c: 7 };
    expect(reducer(state, removeAction)).toEqual(expectedState);
  });

  it("removes keys correctly with REMOVE", () => {
    const removeAction = removeKey(["a"]);
    const expectedState = { c: 7, f: 73 };
    expect(reducer(state, removeAction)).toEqual(expectedState);
  });
});
