import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router'

class Registry {
  instance = null
  key = ''

  add(widgets) {
    for (let widget in widgets ) {
      if (widgets.hasOwnProperty(widget)) {

        // JSX to render
        this.instance = widgets[widget]
        // Slug for widget
        this.key = widget

        // If a server render exit early, dont process client side rendering functions
        // We need the key and instance for server rendering though
        if (typeof window === 'undefined') {
          return
        }

        let stateNode = document.getElementById(`react-bundle-${widget}-state`)
        let initialState = { _serverContext: {} }

        try {
          // Try and get the state otherwise be empty
          initialState = JSON.parse(stateNode.innerText)
        } catch (e) {}

        /*FIXME temporary hack for local harness*/
        const basename = window.__ROUTER_BASENAME__

        let result = this.instance(initialState)
        ReactDOM.render(
          <BrowserRouter basename={basename}>
            {result}
          </BrowserRouter>,
          document.getElementById(`react-bundle-${widget}`))
      }
    }
  }
}

export default new Registry()
