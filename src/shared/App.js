import React from 'react'
import Widget from './Widget'

const App = (props) => (
	<html lang="en">
	<head>
	  <link type="text/css" rel="stylesheet" media="screen" href="/bundle/main.css"/>
	</head>
	<body>
		<Widget {...props}/>
	</body>
	</html>
)

export default App