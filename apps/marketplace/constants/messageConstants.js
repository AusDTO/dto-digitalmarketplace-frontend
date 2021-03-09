import React from 'react'
export const BRIEF_ID_NOT_FOUND = 'Brief does not exist.'
export const BRIEF_LOT_NOT_SUPPORTED = 'Lot not supported.'
export const BRIEF_MUST_BE_DRAFT = 'Only draft briefs can be deleted.'
export const DUPLICATE_USER = 'An account with this email address already exists.'
export const USER_NOT_CREATED = 'The Digital Marketplace encountered an error trying to create your account.'
export const INVITE_NOT_SENT = 'The Digital Marketplace encountered an error trying to send the invite.'
export const REGISTRATION_NOT_FOUND =
  'The Digital Marketplace encountered an error trying to load user registration details.'
export const GENERAL_ERROR = 'The Digital Marketplace encountered an error.'
export const ACCOUNT_TAKEN =
  'An account with this email domain already exists. Someone in your team may have already created an account with the Marketplace.'
export const UNABLE_TO_RESET = 'The Digital Marketplace encountered an error trying to reset your password.'
export const UNABLE_TO_SEND = 'The Digital Marketplace encountered an error trying to send the reset password email.'
export const LOGIN_FAILED = (
  <React.Fragment>
    <p>
      Make sure you've entered the right email address and password. Accounts are locked after 5 failed attempts.
      <br />
      <br />
      <li>
      Please <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360001050936">contact our support team </a>
      if you need to unlock your account
        </li>
    </p>

  </React.Fragment>
)
export const EMAIL_NOT_WHITELISTED =
  'Your email domain is not registered for use on Digital Marketplace. ' +
  'Please request approval from marketplace@dta.gov.au'
