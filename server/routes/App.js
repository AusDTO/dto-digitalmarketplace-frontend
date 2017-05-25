import React from 'react'
import { Switch, Route, Router } from 'react-router'
import { routes } from './routes'
import Bundle from './Bundle'

const App = () => {
	return (
    <html lang="en">
    <head>
      <link type="text/css" rel="stylesheet" media="screen" href="/bundle/main.css"/>
    </head>
    <body>
      <Switch>
    	<Route path="/collaborate" render={() => <Bundle widgetPath="bundles/Collaborate/CollaborateLandingWidget.js"/>} />
      </Switch>
    </body>
  </html>
)}

export default App