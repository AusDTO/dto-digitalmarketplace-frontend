import React from 'react'

const Bundle = (props) => {

  console.log(props)
  location = props.location
  widgetPath = props.widgetPath
  let props2 = {_serverContext: {location: location}, form_options: {}, options: {serverRender: true}};
  let clonedProps = Object.assign({}, props2);
  const component = renderComponent(widgetPath, props2, false);
  return (
	  <div id="content">
	    <div id={`react-bundle-${component.slug}-state`} style={{display:'none'}} dangerouslySetInnerHTML={{ __html: JSON.stringify(state) }} />
	    <div id={`react-bundle-${component.slug}`} dangerouslySetInnerHTML={{ __html: component.markup }} />
	    <script type="text/javascript" src={`/bundle/${component.files[component.slug]}`} defer></script>
	    <link type="text/css" rel="stylesheet" media="screen" href={`/bundle/${component.files['stylesheet']}`}/>
	  </div>
  )
}

export default Bundle