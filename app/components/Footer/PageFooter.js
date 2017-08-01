import React from 'react'
import Footer, { FooterNav, FooterEnd } from '@gov.au/footer'
import './PageFooter.scss'
import logoGovCrest from "./logo_govcrest.svg";
import logoNisa from "./logo_nisa.svg";

export default class PageFooter extends React.Component {
	render() {
	    return (
	  		<div className="uikit-grid uikit-body">
  				<Footer>
  					<div className="wrapper">
  						<FooterNav>
  							<div className="row">
  								<div className="col-md-3 col-sm-6">
  									<h3 className="uikit-display-1">About</h3>
  									<ul className="uikit-link-list">
  										<li><a href="/about-us">About us</a></li>
  										<li><a href="/contact-us">Contact us</a></li>
  										<li><a href="/terms-of-use">Terms of Use</a></li>
  										<li><a href="/privacy-policy">Privacy</a></li>
  										<li><a href="/security">Security</a></li>
  										<li><a href="/disclaimer">Disclaimer</a></li>
  									</ul>
  								</div>

  								<div className="col-md-3 col-sm-6">
  									<h3 className="uikit-display-1">Using the Digital Marketplace</h3>
  									<ul className="uikit-link-list">
  										<li><a href="/">Home</a></li>
  										<li><a href="/search/sellers">Seller catalogue</a></li>
  										<li><a href="/buyers-guide">Buyer&apos;s guide</a></li>
  										<li><a href="/sellers-guide">Seller&apos;s guide</a></li>
  										<li><a href="/faqs">FAQs</a></li>
  									</ul>
  								</div>

  								<div className="col-md-3 col-sm-6">
  									<h3 className="uikit-display-1">Digital Marketplace brought to you by the DTA</h3>
  									<ul className="uikit-link-list">
  										<li><a rel="external" href="https://www.dta.gov.au/tags/digital-marketplace/">DTA blog</a></li>
  										<li><a rel="external" href="https://twitter.com/DTA">DTA twitter</a></li>
  										<li><a rel="external" href="https://github.com/AusDTO">DTA github</a></li>
  									</ul>
  								</div>

  								<div className="col-md-3 col-sm-6">
  									<h3 className="uikit-display-1">DTA resources</h3>
  									<ul className="uikit-link-list">
  										<li><a rel="external" href="https://www.dta.gov.au/our-work/">Our work</a></li>
  										<li><a rel="external" href="https://www.dta.gov.au/standard/">Our standard</a></li>
  										<li><a rel="external" href="https://www.dta.gov.au/design-guides/">Design guides</a></li>
  									</ul>
  								</div>
  							</div>
  						</FooterNav>

  						<FooterEnd>
  							<div className="row">
  								<div className="col-sm-12">
  									<div className='logo-govcrest'>
  										<div dangerouslySetInnerHTML={{__html: logoGovCrest}} />
  									</div>
  									<div className='logo-nisa'>
  										<div dangerouslySetInnerHTML={{__html: logoNisa}} />
  									</div>
  									<div className="footer-small-text">
  										This program forms part of the National Innovation and Science Agenda.<br/>Visit <strong><a href="https://innovation.gov.au/">Innovation.gov.au</a></strong> to find out more.
  									</div>
  								</div>
  							</div>
  						</FooterEnd>
  					</div>
  				</Footer>
			 </div>
	    );
  }
}