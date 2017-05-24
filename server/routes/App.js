import React from 'react'

const App = ({ state, component }) => (
    <html>
    <head>
      <link type="text/css" rel="stylesheet" media="screen" href="/bundle/main.css"/>
    </head>
    <body>
      <a id="content"></a>
      <div id={`react-bundle-${component.slug}-state`} style={{display:'none'}} dangerouslySetInnerHTML={{ __html: JSON.stringify(state) }} />
      <div id={`react-bundle-${component.slug}`} dangerouslySetInnerHTML={{ __html: component.markup }} />
      <noscript><img src="/nojs" alt=""/></noscript>
      <script type="text/javascript" src={`/bundle/${component.files[component.slug]}`} defer></script>
      <link type="text/css" rel="stylesheet" media="screen" href={`/bundle/${component.files['stylesheet']}`}/>
    </body>
  </html>
)

export default App