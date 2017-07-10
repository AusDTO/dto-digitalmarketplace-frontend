import React from 'react'
import Head from './Head'
import GovAuBanner from './GovAuBanner'
import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'
import PageFooter from './components/Footer/PageFooter'

const App = ({component, initialState}) => (
  <div id="Application" className="uikit-grid uikit-body">
	  <Head />
	  <header role="banner">
		  	<Banner />
		  	<GovAuBanner />
	  		<Header />
	  </header>
	  <main id="content">
	    <div id={`react-bundle-${component.slug}-state`} style={{display:'none'}} dangerouslySetInnerHTML={{ __html: JSON.stringify(initialState) }} />
	    <div id={`react-bundle-${component.slug}`} dangerouslySetInnerHTML={{ __html: component.markup }} />
	    <script type="text/javascript" src={`/bundle/${component.files[component.slug]}`} defer></script>
	    <link type="text/css" rel="stylesheet" media="screen" href={`/bundle/${component.files['stylesheet']}`}/>
	  </main>
	  <PageFooter />
  </div>
)

export default App