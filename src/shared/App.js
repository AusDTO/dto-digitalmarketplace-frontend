import React from 'react'
import { Switch, Route, Router } from 'react-router'
import { routes } from '../../server/routes/routes'
import Bundle from './Bundle'
import NotFound from './NotFound'

const App = () => (
    <html lang="en">
    <head>
      <link type="text/css" rel="stylesheet" media="screen" href="/bundle/main.css"/>
    </head>
    <body>
      <Switch>
      	{routes.map(route => (
      		<Route key={route} component={Bundle} {...route}/>
    	))}
    	<Route component={NotFound}/>
      </Switch>
    </body>
  </html>
)

export default App