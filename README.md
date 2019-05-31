# Marketplace React Frontend

**This documentation is now outdated and applies to legacy server-rendered react.  Current documentation can be found [here](/CONTRIBUTING.md)**.

Read the documentation
* [Docs](/docs)

## Getting started

This project is an ejected [CRA](https://github.com/facebookincubator/create-react-app) project, with some heavy modifications to the build scripts to allow integrated and local development

### Local Development

The local environment is the basic webpack dev server (watching included), with some baked in routing config to allow easier integration with [React Router v4](https://github.com/ReactTraining/react-router/tree/v4)

To boot up the basic environment run `npm start`. Navigate to [localhost:3000](http://localhost:3000) and you will be prompted with a list of bundles to preview.
Bundle is just a fancy term for an entry point.

Another important feature of the local environment is mocks. You have the ability to define an initial state / mock (meant to replicate the servers datamodel). The only caveat is you can only have one mock per entry point and they are cache per run of the start command - as the are included via require at boot up time.

### Integrated Development

The integrated environment is the provides a development build of both assets and the rendering service. This allows us to test local features before they reach an integrated environment.

This style relies on two commands running: `npm build:development` and `npm server:development`, both these tasks come with watchers so you should never need to restart either. The development build command will log out webpack stats and any linter errors into your console as you are working.

The server will load up on port `60000`, this a server side rendering service for React bundles. [Read More]()


Further information about this project can be found in the [docs](/docs).
  
