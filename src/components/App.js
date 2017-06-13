import React from 'react'
import Head from './Head'
import GovAuBanner from './GovAuBanner'
import Banner from './Banner'
import Header from '@gov.au/header'

const App = ({component, initialState}) => (
  <div id="Application" className="uikit-body">
	  <Head />
	  <header>
		  <Banner />
		  <GovAuBanner />
		  <Header title="Digital Marketplace"/>
	  </header>
	  <div id="content">
	    <div id={`react-bundle-${component.slug}-state`} style={{display:'none'}} dangerouslySetInnerHTML={{ __html: JSON.stringify(initialState) }} />
	    <div id={`react-bundle-${component.slug}`} dangerouslySetInnerHTML={{ __html: component.markup }} />
	    <script type="text/javascript" src={`/bundle/${component.files[component.slug]}`} defer></script>
	    <link type="text/css" rel="stylesheet" media="screen" href={`/bundle/${component.files['stylesheet']}`}/>
	  </div>
  </div>
)

export default App