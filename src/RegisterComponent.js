import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

class RegisterComponent {

  SERVER = 'server';
  CLIENT = 'client';

  instance = null;
  key = '';
  env;

  constructor(widget, env) {
    this.setEnv(env);

    for (let key in widget ) {
      if (widget.hasOwnProperty(key)) {

        // JSX to render
        this.instance = widget[key];
        // Slug for widget
        this.key = key;

        // If a server render exit early, dont process client side rendering functions
        // We need the key and instance for server rendering though
        if (this.env === this.SERVER) {
          return this;
        }

        let stateNode = document.getElementById(`react-bundle-${key}-state`);
        let initialState = { _serverContext: {} };

        try {
          // Try and get the state otherwise be empty
          initialState = JSON.parse(stateNode.innerText);
          // If state is escaped as a string, may need to parse twice.
          if (typeof initialState === 'string') {
            initialState = JSON.parse(initialState)
          }
        } catch (e) {}

        delete initialState._serverContext;

        let basename;
        if (initialState.basename) {
          basename = initialState.basename;
          delete initialState.basename;
        }

        let options = Object.assign({}, initialState.options || {}, {
          serverRender: false
        });

        initialState = Object.assign({}, initialState, { options });

        const history = createBrowserHistory({
          basename
        });

        let result = this.instance(initialState, history);

        ReactDOM.hydrate(
          <Router history={history}>
            {result}
          </Router>,
          document.getElementById(`react-bundle-${key}`)
        );
      }
    }

    return this;
  }

  setEnv(env) {
    if (!env) {
      env = typeof window === 'undefined' ? this.SERVER : this.CLIENT;
    }

    let validEnvs = [
      this.CLIENT,
      this.SERVER
    ];

    if (validEnvs.indexOf(env) === -1) {
      throw new Error(`'${env}' is not a valid env.`);
    }

    this.env = env;
  }
}

export default RegisterComponent
