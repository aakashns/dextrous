# composable-redux
Utilities for reducer composition

## Installation
Install using `npm` or `yarn`:
```bash
npm install composable-redux --save
```
or 
```bash
yarn add composable-redux
```

## Usage

### `nameReducer(reducer, name, whitelist = [])`

Wraps `reducer` and returns a new reducer function that only responds to actions that actions that contain a `name` property that matches the given `name`. Additionally, you can use the `whitelist` argument to provide a list of action types that should be handled even if they do not contain a name property.

#### Example
```javascript
import { nameReducer } from 'composable-redux';

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

### `nameAction(action, name)`

Utility function to add a `name` property to an action.

### Example
```javascript
import { nameAction } from 'composable-redux';

console.log(nameAction({ type: 'INCREMENT'}, 'counter2'));
// { type: 'INCREMENT', name: 'counter' }

```

### `makeReducer(initialState)`

Creates a reducer with the given initial state, supporting two actions:
1. `SET`: Change the state to a new value provided with the action.
2. `RESET`: Reset the state back to `initialState`.

### Example
```javascript
import { makeReducer, setValue, resetValue } from 'composable-redux';

const reducer = makeReducer('nothing');

console.log(reducer('Hello', setValue('world'))); // 'world'
console.log(reducer('Hello', resetValue())); // 'nothing'

```