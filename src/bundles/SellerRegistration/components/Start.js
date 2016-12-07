import React from 'react';

const Start = ({ signup, onClick }) => (
  <div>
    <h1>Joining the Marketplace</h1>
    <p>The information you share in this application will be assessed against our <a href="/evaluation-criteria">evaluation criteria</a>  and to create your seller profile.
    </p>
      <p>Completing your application will take around <b>30 minutes</b>. Your information will be saved automatically if you need to come back later.</p>
    <h2>You'll need:</h2>
    <ul>
        <li>Your basic business information, for example</li>
        <li>A financial viability statement from your accountant</li>
        <li>Proof of worker’s compensation and public liability insurance</li>
    </ul>
      <h2>You'll be asked to provide:</h2>
      <ul>
          <li>Proof of successful projects and past client contact details</li>
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

export default Start;