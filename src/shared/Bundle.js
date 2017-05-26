import React from 'react'
import { renderComponent } from '../../server/routes/render'
import { routes } from '../../server/routes/routes'

const Bundle = ({location, match}) => {
  let widgetPath = routes.find(route => route.path === match.path).widgetPath;
  let props = {_serverContext: {location: location.pathname}, form_options: {}, options: {serverRender: true}};
  let clonedProps = Object.assign({}, props);
  const component = renderComponent(widgetPath, props, false);

  return (
	  <div id="content">
	    <div id={`react-bundle-${component.slug}-state`} style={{display:'none'}} dangerouslySetInnerHTML={{ __html: JSON.stringify(clonedProps) }} />
	    <div id={`react-bundle-${component.slug}`} dangerouslySetInnerHTML={{ __html: component.markup }} />
	    <script type="text/javascript" src={`/bundle/${component.files[component.slug]}`} defer></script>
	    <link type="text/css" rel="stylesheet" media="screen" href={`/bundle/${component.files['stylesheet']}`}/>
	  </div>
  )
}

export default Bundle