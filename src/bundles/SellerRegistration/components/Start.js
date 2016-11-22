import React from 'react';

const Start = ({ signup, deed, onClick }) => (
  <div>
    <h1>Become a seller</h1>
    <p>To join the Marketplace you need to:</p>
    <ul>
      <li>Tell us about your company</li>
      <li>Describe the digital services you'll offer and their rates.</li>
      <li>Provide evidence of your skills for assessment.</li>
      <li>Agree to the <a href={deed}>terms in the deed</a>.</li>
    </ul>
    <p>Registering takes about <b>30 mins</b>. You can save your application and continue it later.</p>
    <p>Before you start</p>
    <ul>
      <li>By completing this process you are signing the deed, so be sure the authorised person in the company completes this form.</li>
    </ul>
    <p>
      <a role="button" href={signup} onClick={onClick}>Start Now </a>
    </p>
  </div>
);

Start.defaultProps = {
  onClick: () => {},
  deed: '#',
  signup: '#'
}

Start.propTypes = {
  signup: React.PropTypes.string,
  deed: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Start;