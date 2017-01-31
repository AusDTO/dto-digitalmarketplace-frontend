## Ducks

This is a type of redux architecture that is used in this project

You can read further about this proposal [here](https://github.com/erikras/ducks-modular-redux) and [here](https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5#.b2zwyfqdn)

### High level summary 

Ducks is a proposal for bundling reducers, action types and actions in the same file leading to a reduced boilerplate.

Example:
```js
// widgets.js

// Actions
const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

export function createWidget(widget) {
  return { type: CREATE, widget };
}

export function updateWidget(widget) {
  return { type: UPDATE, widget };
}

export function removeWidget(widget) {
  return { type: REMOVE, widget };
}
```

A sample file structure would look like inside a bundle folder:

```
├── BundleWidget.js
├── components
│   └── ComponentOne
│       ├── ComponentOne.css
│       ├── ComponentOne.js
│       ├── ComponentOne.json
│       └── index.js
└── redux
    ├── create.js
    └── modules
        ├── reducer.js
        ├── moduleOne.js
        └── moduleOne.test.js
```