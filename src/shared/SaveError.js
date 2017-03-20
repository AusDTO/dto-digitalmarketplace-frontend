import React from 'react';
import { connect } from 'react-redux';

const SaveError = ({error}) => (
	<div>
		{error && 
		  <div className="callout--warning" aria-describedby="validation-masthead-heading" tabIndex="-1" role="alert">
		    <h4 id="validation-masthead-heading">We couldn't save your information.</h4>
		      Check your internet connection and if there's still a problem email marketplace@digital.gov.au
		  </div>
		 }
	</div>
);

const mapStateToProps = state => {
  return {
    error: state.application.error
  }
}

export default connect(mapStateToProps)(SaveError);