import React from 'react';
import { connect } from 'react-redux';

const SaveError = ({error}) => (
	<div>
		{error && 
		  <div className="callout--warning" aria-describedby="validation-masthead-heading" tabIndex="-1" role="alert">
		    <h4 id="validation-masthead-heading">There was a problem saving your information.</h4>
		      Please check your internet connection before closing the browser as any unsaved information will be lost.
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