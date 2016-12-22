import React from 'react';
import {connect} from 'react-redux';

const Start = ({ supplierCode, signup, onClick }) => (
  <div>
    <h1>Joining the Marketplace</h1>
    <p>
      Sign up to the Digital Marketplace so buyers can find your business and you can apply for new opportunities.
    </p>
    <p>
      It takes around 30 minutes to complete and your information is saved automatically. 24 hours later, your profile will be visible to government buyers.
    </p>
    <h2>You'll need:</h2>
    <ul>
        <li>Your basic business information, for example</li>
        <li>A financial viability statement from your accountant</li>
        <li>Proof of worker’s compensation and public liability insurance</li>
    </ul>
      <h2>You'll be asked to provide:</h2>
      <ul>
          <li>Proof of successful projects and past client contact details that will be assessed against <a href="/evaluation-criteria" target="_blank" rel="external">evaluation criteria</a></li>
      </ul>
    <p>
      <a role="button" href={signup} onClick={onClick}>Start Now </a>
    </p>
  </div>
);

Start.defaultProps = {
  onClick: () => {},
  signup: '#'
}

Start.propTypes = {
  signup: React.PropTypes.string,
  onClick: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return ownProps
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Start);