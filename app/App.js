import React from 'react'
import { render } from 'react-dom'
import Head from './Head'
import GovAuBanner from './components/GovAuBanner/GovAuBanner'
import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'
import Footer from './components/Footer/PageFooter'
import {Provider} from 'react-redux';
import configureStore from './store';
import SignupForm from './components/SignupForm/SignupForm'

const store = configureStore();

render (
    <Provider store={store}>
        <div id="Application" className="uikit-grid uikit-body">
		  <header role="banner">
			  	<Banner />
			  	<GovAuBanner />
		  		<Header />
		  </header>
		  <main id="content">
		  	<SignupForm />
		  </main>
		  <Footer />
	  	</div>
    </Provider>,
    document.getElementById('appReact')
);
