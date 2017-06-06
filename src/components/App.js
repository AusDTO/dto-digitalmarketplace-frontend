import React from 'react'
import Head from './Head'

const App = ({component, initialState}) => (
  <div id="content">
	<Head />
    <div id={`react-bundle-${component.slug}-state`} style={{display:'none'}} dangerouslySetInnerHTML={{ __html: JSON.stringify(initialState) }} />
    <div id={`react-bundle-${component.slug}`} dangerouslySetInnerHTML={{ __html: component.markup }} />
    <script type="text/javascript" src={`/bundle/${component.files[component.slug]}`} defer></script>
    <link type="text/css" rel="stylesheet" media="screen" href={`/bundle/${component.files['stylesheet']}`}/>
  </div>
)

export default App