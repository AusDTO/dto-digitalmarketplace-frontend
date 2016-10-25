import React from 'react'
import RegisterComponent from '../../RegisterComponent'

export const StartWidget = (props) => (
        <div>
        <h1>Joining the Digital Marketplace</h1>
        <p>To join the Marketplace you need to:</p>
        <ul>
          <li>Tell us about your company</li>
          <li>Describe the digital services you'll offer and their rates.</li>
          <li>Provide evidence of your skills for assessment.</li>
          <li>Agree to the <a href={props.deed}>terms in the deed</a>.</li>
        </ul>
        <p>Registering takes about <b>30 mins</b>. You can save your application and continue it later.</p>
        <p>Before you start</p>
        <ul>
          <li>By completing this process you are signing the deed, so be sure the authorised person in the company completes this form.</li>
        </ul>
        <p>
          <a role="button" href={props.signup}>Start Now </a>
        </p>
        </div>
)

export default new RegisterComponent({ 'seller-registration-start': StartWidget })
