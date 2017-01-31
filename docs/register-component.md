## RegisterComponent

[View Source](/src/RegisterComponent.js)

This file is crucial to how everything is render, both client and server. This simple abstraction allows us to target the same file.

The syntax is quite simple:
```js
import React from 'react'
import RegisterComponent from '../../RegisterComponent'

const HelloWorldWidget = (props) => {
  return <h1 {...props}>Hello World</h1>
}

export default new RegisterComponent({ helloworld: HelloWorldWidget })

```

This is another occurance of the `slug`, which **must** match the slug provided in `entryPoints`.

When the render service uses this file it only requires the instance (component function) and slug of the bundle for rendering to happen. Where as when called on the client side it will search the document for a pre-defined `div` (`#react-bundle-<slug>-state`) which should hold the initial state for the bundle; the initial state usually supplied by the callee.

The bundle is always rendered into a `div` just below the state `div` called `#react-bundle-<slug>`.

One other thing to note is that every bundle is wrapped in a Router. No need to wrap your component or Redux Provider as its the route, you may use all routing internals freely.