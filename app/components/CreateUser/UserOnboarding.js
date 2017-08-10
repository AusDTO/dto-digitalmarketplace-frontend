import React from 'react'
import PageAlert from '@gov.au/page-alerts'

const UserOnboarding = () =>
  <div className="row">
    <div className="col-sm-push-2 col-sm-8 col-xs-12">
      <PageAlert as="success">
        <h4>Congratulations on creating an account with the Digital Marketplace!</h4>
        <p>
          Please<a href="/login">
            <strong> login </strong>
          </a>to your account to get started
        </p>
      </PageAlert>
    </div>
  </div>

export default UserOnboarding
