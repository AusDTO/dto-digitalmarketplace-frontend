import React, { Component } from 'react'
import { AUradio } from '@gov.au/control-input/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BriefChoice.scss'

export class BriefChoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      briefType: ''
    }
  }

  handleChange(type) {
    this.setState({
      briefType: type
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="au-display-xl">Start a New Brief</h1>
            <p>Create a new opportunity for a:</p>
          </div>
        </div>
        <div className="row">
          <div className={`${styles.choice} col-xs-12`}>
            <AUradio
              id="choice-digital-specialist"
              label="Digital Specialist"
              name="brief_choice"
              value="digital-professionals"
              onChange={() => {
                this.handleChange('digital-professionals')
              }}
            />
            <p>Get seller responses to your criteria plus candidate resumes for shortlisting.</p>
          </div>
        </div>
        <div className="row">
          <div className={`${styles.choice} col-xs-12`}>
            <AUradio
              id="choice-digital-outcome"
              label="Digital Outcome"
              name="brief_choice"
              value="digital-outcome"
              onChange={() => {
                this.handleChange('digital-outcome')
              }}
            />
            <p>
              Get a summary of seller responses to your criteria, in spreadsheet format, for shortlisting. Once your
              shortlist is complete you can request sellers to provide full proposals for you to evaluate.
            </p>
          </div>
        </div>
        <div className="row">
          <div className={`${styles.choice} col-xs-12`}>
            <AUradio
              id="choice-training"
              label="Training"
              name="brief_choice"
              value="training"
              onChange={() => {
                this.handleChange('training')
              }}
            />
            <p>
              Get a summary of seller responses to your criteria, in spreadsheet format, for shortlisting. Once your
              shortlist is complete you can request sellers to provide full proposals for you to evaluate.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <a href={`/buyers/frameworks/digital-marketplace/requirements/${this.state.briefType}`}>
              <button className="au-btn" disabled={!this.state.briefType && 'disabled'}>
                Continue
              </button>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
          </div>
        </div>
      </div>
    )
  }
}

export default BriefChoice
