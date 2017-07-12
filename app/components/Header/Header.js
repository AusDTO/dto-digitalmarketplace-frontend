import React from 'react'
import styles from './Header.css'

export default class Header extends React.Component {
  render() {
    return (
  		<section className="marketplace--header">
      		<div className="wrapper">
		        <div className="marketplace--logo">
          			<a href="/" title="Go to the Marketplace homepage" className="logo">Digital Marketplace</a> <span className="badge--beta">BETA</span>
		        </div>
		        <div className="user-nav">    
	          		<div id="react-bundle-auth-header-state"></div>
					<div id="react-bundle-auth-header">
						<ul data-reactroot="" id="main-navigation" className="inline-links--inverted">
							<li>
								<a href="/signup">Join the Marketplace</a>
							</li>
							<li>
								<a href="/login?next=/signup">Sign in</a>
							</li>
						</ul>
					</div>
		        </div>
      		</div>
    	</section>
    );
  }
}