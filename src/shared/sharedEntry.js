import React from 'react'
import ReactDOM from 'react-dom'

import { Body, ReviewHeader } from './SellerProfile';

const header = {
  contact_: "Paul Ashson",
  name: "Zeta interactive",
  contact_phone: "02 8394 0000",
  contact_email: "example@domain.com",
  summary: "Zeta Interactive’s many services include digital strategy, user research/stories, requirements, personas, design, user testing, HTML prototyping, website build and CMS implementation. Established in 1996, with over 160 staff worldwide, we are award-winning and widely known as a “go-to” digital consultancy for many agencies especially in service design and digital government.",
  website: "http://google.com",
  continueLink: <a role="button" href="#href">Continue editing</a>,
  sellerType: {
    Recruiter: true,
    'Indigenous supplier': true
  }
}

const body = {
    "representative": "Paul Ashson",
    "website": "http://google.com",
    "linkedin": "http://linkedin.com",
    "abn": "1234567890",
    "address": {
        "address_line": "241 Commonwealth Street",
        "suburb": "Sydney",
        "state": "NSW",
        "postal_code": "2000"
    },
    "provides": {
        "Content & publishing": true,
        "User research & design": true
    },
    "case_studies": {
        "c98932c6-b948-08f6-c782-6e3aa83451d4": {
            "approach": "app",
            "client": "client",
            "opportunity": "opp",
            "outcome": [
                "outcome"
            ],
            "projectLinks": [],
            "roles": "role",
            "service": "Content & publishing",
            "timeframe": "time frame",
            "title": "case study"
        },
        "c98932c6-b948-08f6-c782-6e3aa83451d5": {
            "approach": "app",
            "client": "client",
            "opportunity": "opp",
            "outcome": [
                "outcome"
            ],
            "projectLinks": [],
            "roles": "role",
            "service": "Content & publishing",
            "timeframe": "time frame",
            "title": "case study"
        }
    }
}

ReactDOM.render(
  <div className="row">
    <div className="col-xs-12">
      <ReviewHeader {...header} />
      <div className="row">
        <div className="col-xs-9">
          <Body {...body} />
        </div>
      </div>
    </div>
  </div>,
  document.getElementById('react-bundle-shared')
);
