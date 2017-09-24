[![npm version](https://img.shields.io/npm/v/dextrous.svg?style=flat-square)](https://www.npmjs.com/package/dextrous)
[![npm downloads](https://img.shields.io/npm/dm/dextrous.svg?style=flat-square)](https://www.npmjs.com/package/dextrous)
[![build status](https://api.travis-ci.org/aakashns/dextrous.svg?branch=master)](https://travis-ci.org/aakashns/dextrous)

# dextrous
A tiny library with utilities for reducing Redux boilerplate and reusing reducer logic.

## Objectives

- Reduce the amount of boilerplate involved defining reducers and action creators in Redux(using `makeReducer`, `makeObjectReducer`, `makeListReducer` etc.). 

- Reuse reducers to handle multiple parts of the state without defining a whole new set of action types and action creators. (using `nameReducer`, `nameAction`, `nameActionCreators`, `nameAndCombineReducers` etc.)

## Installation
Install using `npm` or `yarn`:
```bash
npm install dextrous --save
```
or 
```bash
yarn add dextrous
```

## Usage

### Quick Links
* [`makeMultiReducer`](#makeMultiReducer)
* [`nameReducer`](#nameReducer)
* [`nameAction`](#nameAction)
* [`nameActionCreator`](#nameActionCreator)
* [`makeReducer`](#makeReducer)
* [`makeObjectReducer`](#makeObjectReducer)
* [`objectReducer`](#objectReducer)
* [`makeListReducer`](#makeListReducer)
* [`listReducer`](#listReducer)


<a name="makeMultiReducer"></a>

### makeMultiReducer(reducer, [keyExtractor])
Creates a key-based reducer that can be used to manage different parts of the state using the same `reducer`. The key must be provided by setting the `key` property on actions. Alternatively, you can provide a custom `keyExtractor` function to extract the key from an action.

`makeMultiReducer` is ideal for cases where you want to use the same reducer to manage the state for multiple components, especially when the number of components is not known beforehand e.g. showing 5 independent counters on a page, with an 'Add Counter' button to add new counters.

#### Example ([Try Online](https://stackblitz.com/edit/react-gtd76c))

```javascript
import { makeMultiReducer, makeMultiGetter } from 'dextrous';

// Reducer to manage state for one counter
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

// Reducer to manage state for multiple counters.
const counters = makeMultiReducer(counter);
const getCounter = makeMultiGetter(counter);

let state = counters(undefined, { type: "@@INIT" });
console.log('State:', state); // {}
console.log('Counter a:', getCounter(state, 'a')); // 10
console.log('Counter b:', getCounter(state, 'b')); // 10
console.log('Counter c:', getCounter(state, 'c')); // 10

state = counters(state, { type: "INCREMENT", key: "a" });
console.log('State:', state); // {a: 11}
console.log('Counter a:', getCounter(state, 'a')); // 11
console.log('Counter b:', getCounter(state, 'b')); // 10
console.log('Counter c:', getCounter(state, 'c')); // 10

state = counters(state, { type: "DECREMENT", key: "c" });
console.log('State:', state); // {a: 11, c: 9}
console.log('Counter a:', getCounter(state, 'a')); // 11
console.log('Counter b:', getCounter(state, 'b')); // 10
console.log('Counter c:', getCounter(state, 'c')); // 9

// Using a custom key extractor
const counters2 = makeMultiReducer(counter, action => action.id);
let state2 = counters2(undefined, { type: '@@INIT'});
const action = { type: 'INCREMENT', id: 'd' }; // Providing 'id' instead of 'key'

console.log(getCounter(state2, 'd')); // 10
state2 = counters2(state2, action);
console.log(getCounter(state2, 'd')) // 11

```

**NOTE**: Always use `makeMultiReducer` in conjunction with `makeMultiGetter` to retrieve the state correctly (as shown in the example above). If you try to acess the state for a particular key directly, you may get `undefined`.

<a name="nameReducer"></a>

### `nameReducer(reducer, name, whitelist = [])`

Wraps the given `reducer` and returns a new reducer that only responds to actions that actions that contain a `name` matching the given `name`. 

#### Example ([Try online](https://stackblitz.com/edit/react-gdmtuu))

```javascript
import { nameReducer } from 'dextrous';

// A simple counter reducer supporting increment and decrement.
const counter = (state = 0, { type }) => {
  switch(type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// Create two named reducers using counter.
const counter1 = nameReducer(counter, 'counter1');
const counter2 = nameReducer(counter, 'counter2');

// Test behavior by passing named actions
console.log(counter1(0, { type: 'INCREMENT' })); // 0
console.log(counter1(0, { type: 'INCREMENT', name: 'counter2' })); // 0
console.log(counter1(0, { type: 'INCREMENT', name: 'counter1' })); // 1
```

Additionally, you can use the `whitelist` argument in `nameReducer` to provide a list of action types that should be handled even if they do not contain a `name` property.

<a name="nameAction"></a>

### `nameAction(action, name)`

Utility function to add a `name` property to an action.

#### Example
```javascript
import { nameAction } from 'dextrous';

console.log(nameAction({ type: 'INCREMENT'}, 'counter2'));
// { type: 'INCREMENT', name: 'counter' }

```

<a name="nameActionCreator"></a>

### `nameActionCreator(actionCreator, name)` 

Given an `actionCreator` and a name, returns a new action creator which adds the `name` property to the resulting action. 

#### Example
```javascript 
import { nameActionCreator } from 'dextrous';

const actionCreator = (email, password) => ({
  type: 'EDIT_LOGIN_DATA',
  payload: { email, password }
});

const namedCreator = nameActionCreator(actionCreator, 'loginForm');

console.log(namedCreator('test@example.com', 'password123'));
/*
{
  type: 'EDIT_LOGIN_DATA',
  name: 'loginForm',
  payload: {
    email: 'test@example.com',
    password: 'password123'
  }
}
*/
```

<a name="makeReducer"></a>

### `makeReducer(initialState)`

Creates a reducer with the given initial state, supporting two actions:
1. `SET`: Change the state to a new value provided with the action.
2. `RESET`: Reset the state back to `initialState`.

The action creators `setValue` and `resetValue` can be used to create `SET` and `RESET` actions respectively.

#### Example
```javascript
import { makeReducer, setValue, resetValue } from 'dextrous';

const reducer = makeReducer('nothing');

console.log(reducer('Hello', setValue('world'))); // 'world'
console.log(reducer('Hello', resetValue())); // 'nothing'

```

Use `makeReducer` in conjuction with `nameReducer` and `nameActionCreator` to easily create multiple reducers for handling different parts of the state.

#### Example
```javascript
import {
  makeReducer,
  setValue,
  resetValue,
  nameReducer,
  nameActionCreator
} from 'dextrous';
import { combineReducers } from 'redux';

const ReducerNames = {
  age: 'age',
  location: 'location'
};

// Reducer and action creators for managing state.age
const age = nameReducer(makeReducer(18), ReducerNames.age);
const setAge = nameActionCreator(setValue, ReducerNames.age);
const resetAge = nameActionCreator(resetValue, ReducerNames.age);

// Reducer and action creators for managing state.location
const location = nameReducer(makeReducer('London'), ReducerNames.location);
const setLocation = nameActionCreator(setValue, ReducerNames.location);
const resetLocation = nameActionCreator(resetValue, ReducerNames.location);

// Create a combined reducer
const rootReducer = combineReducers({
  age,
  location
});

// Check the initial state
const initialState = rootReducer(undefined, { type: 'IGNORED_ACTION'});
console.log(initialState);
// { age: 18, location: 'London' }

// Dispatch an action to change the age (but not location)
console.log(rootReducer(initialState, setAge(23)));
// { age: 23, location: 'London' }

// Dispatch an action to change the location (but not age)
console.log(rootReducer(initialState, setLocation('Paris')));
// { age: 18, location: 'Paris' }

```

**NOTE**: Never use `makeReducer` without `nameReducer`, otherwise every action with the type `SET` or `RESET` will change the state managed by the reducer. 

For example, if we do not use `nameReducer` in the above example while defining `age` and `location`, then dispatching the action `setAge` will change both `state.age` and `state.location` to the given value, which is not the desired behavior.

<a name="makeObjectReducer"></a>

### `makeObjectReducer(initialState = {})`
Create a reducer that allows setting and removing entries in a plain Javascript object. It supports the following actions:
1. `EDIT`: Change the values of one or more keys in the state object.
2. `REMOVE`: Clear one or more keys in the state object.
1. `SET`: Change the state to a new value provided with the action.
2. `RESET`: Reset the state back to `initialState`.

The action creators `editObject`, `removeKeys`, `setValue` and `resetValue` can be used to create the above actions. `makeObjectReducer` is ideal for managing the state of HTML forms.

### Example
```javascript
import { 
  makeObjectReducer, 
  editObject, 
  removeKeys,
  resetValue,
  nameReducer,
  nameActionCreator
} from 'dextrous';

const reducerName = 'signupForm';
const initialState = { name: '', email: '', age: 18};

// Define a named reducer
const signupForm = nameReducer(makeObjectReducer(initialState), reducerName);

// Define some named action creators
const editSignupForm = nameActionCreator(editObject, reducerName);
const removeSignupFields = nameActionCreator(removeKeys, reducerName);
const clearSignupForm = nameActionCreator(resetValue, reducerName);

console.log(signupForm(undefined, { type: 'IGNORED_ACTION' }));
// { name: '', email: '', age: 18}

const editAction = editSignupForm({
  email: 'name@example.com',
  age: 23
});
const newState1 = signupForm(initialState, editAction)
console.log(newState1);
// {name: "", email: "name@example.com", age: 23}

const removeAction = removeSignupFields(['age', 'name'])
const newState2 = signupForm(newState1, removeAction);
console.log(newState2);
// {email: "name@example.com"}

const resetAction = clearSignupForm();
const newState3 = signupForm(newState2, resetAction);
console.log(newState3);
// { name: '', email: '', age: 18}
```

**NOTE**: As with `makeReducer`, never use `makeObjectReducer` without `nameReducer`.

<a name="objectReducer"></a>

### `objectReducer`
If the `initialState` of your reducer is the empty object `{}`, you can use `objectReducer` instead of `makeObjectReducer({})`. It supports all the actions that `makeObjectReducer` supports.

#### Example
```javascript
import { objectReducer, nameReducer } from 'dextrous';

const loginForm = nameReducer(objectReducer, 'loginForm');
/* Equivalent to:
const loginForm = nameReducer(makeObjectReducer({}), 'loginForm');
*/

```

<a name="makeListReducer"></a>

### `makeListReducer(initialState = [])`
Create a reducer that allows adding and removing items in a Javascript array. It supports the following actions:
1. `ADD`: Add one or more item at the end of the list.
2. `REMOVE`: Clear one or more items from the list.
1. `SET`: Change the state to a new value provided with the action.
2. `RESET`: Reset the state back to `initialState`.

The action creators `addItem`, `addItems`, `removeItem`, `removeItems`, `setValue` and `resetValue` can be used to create the above actions. `makeListReducer` is ideal for cases where the state is variable list of items.

#### Example
```javascript
import { 
  makeListReducer, 
  addItem, 
  removeItem,
  resetValue,
  nameReducer,
  nameActionCreator
} from 'dextrous';

const reducerName = 'locations';
const defaultLocations = ['London', 'Paris'];

// Define the reducer and action creators
const locations = nameReducer(makeListReducer(defaultLocations), reducerName);
const addLocation = nameActionCreator(addItem, reducerName);
const removeLocation = nameActionCreator(removeItem, reducerName);
const resetLocations = nameActionCreator(resetValue, reducerName);

// Check the initial state
const initialState = locations(undefined, { type: 'IGNORED_ACTION' });
console.log(initialState);
// ["London", "Paris"]

// Add a location
const newState1 = locations(initialState, addLocation('San Francisco'));
console.log(newState1);
// ["London", "Paris", "San Francisco"]

// Remove a location
const newState2 = locations(newState1, removeLocation('Paris'));
console.log(newState2);
// ["London", "San Francisco"]

// Reset to the initial state
const newState3 = locations(newState2, resetLocations());
console.log(newState3);
// ["London", "Paris"]
```

**NOTE**: As with `makeReducer`, never use `makeListReducer` without `nameReducer`.

<a name="listReducer"></a>

### `listReducer`
If the `initialState` of your reducer is the empty list `[]`, you can use `listReducer` instead of `makeListReducer([])`. It supports all the actions that `makeListReducer` supports.

#### Example
```javascript
import { listReducer, nameReducer } from 'dextrous';

const locations = nameReducer(listReducer, 'locations');
/* Equivalent to:
const locations = nameReducer(makeListReducer([]), 'locations');
*/

```
