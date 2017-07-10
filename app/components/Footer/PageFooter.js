import React from 'react'
import Footer, { FooterNav, FooterEnd } from '@gov.au/footer'

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
									<li><a href="https://www.dta.gov.au/tags/digital-marketplace/">DTA blog</a></li>
									<li><a href="https://twitter.com/DTA">DTA twitter</a></li>
									<li><a href="https://github.com/AusDTO">DTA github</a></li>
								</ul>
							</div>

							<div className="col-md-3 col-sm-6">
								<h3 className="uikit-display-1">DTA resources</h3>
								<ul className="uikit-link-list">
									<li><a href="https://www.dta.gov.au/our-work/">Our work</a></li>
									<li><a href="https://www.dta.gov.au/standard/">Our standard</a></li>
									<li><a href="https://www.dta.gov.au/design-guides/">Design guides</a></li>
								</ul>
							</div>
						</div>
					</FooterNav>

					<FooterEnd>
						<div className="row">
							<div className="col-sm-12">
								<img className="uikit-responsive-media-img" src="http://placehold.it/157x80" alt="Commonwealth Coat of Arms crest logo" />

								<p><small>&copy; Commonwealth of Australia, <a href="https://github.com/govau/uikit/blob/master/LICENSE.md" rel="external license">MIT licensed</a></small></p>
								<li>
									<div>
										This program forms part of the National Innovation and Science Agenda.<br/>Visit <a href="https://innovation.gov.au/">Innovation.gov.au</a> to find out more.
									</div>
								</li>
							</div>
						</div>
					</FooterEnd>
				</div>
			</Footer>
		</div>
    );
  }
}