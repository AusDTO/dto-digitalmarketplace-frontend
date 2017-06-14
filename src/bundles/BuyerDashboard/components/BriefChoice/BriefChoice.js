import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './BriefChoice.css';

const BriefChoice = props => {
  return (
    <div styleName="brief-choice-container">
      <h1>Post a brief</h1>
      <p>
        Create a new opportunity for a:
      </p>
      <div styleName="brief-choice-form">
        <BriefChoiceForm/>
        <a tabIndex={0} role="link" onClick={props.handleToggle}>Return to dashboard</a>
      </div>
    </div>
  )
}

class BriefChoiceForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      briefType: 'digital-professionals'
    };
    this.handleChange = this
      .handleChange
      .bind(this);
  }

  handleChange(e) {
    this.setState({briefType: e.target.value})
  }

  render() {
    return (
      <div>
        <div
          styleName={`form-radio-container ${ (this.state.briefType === 'digital-professionals')
          ? 'checked'
          : ''}`}>
          <label htmlFor="digitalProfessionals">
            <input
              type="radio"
              name="digital-professionals"
              value="digital-professionals"
              checked={this.state.briefType === "digital-professionals"}
              onChange={this.handleChange}/>
            <span styleName="form-label">Digital Specialist</span>
          </label>
        </div>
        <div
          styleName={`form-radio-container ${ (this.state.briefType === 'digital-outcome')
          ? 'checked'
          : ''}`}>
          <label htmlFor="digitalOutcome">
            <input
              type="radio"
              name="digital-outcome"
              value="digital-outcome"
              checked={this.state.briefType === "digital-outcome"}
              onChange={this.handleChange}/>
            <span styleName="form-label">Digital Outcome</span>
          </label>
        </div>
        <a
          href={`/buyers/frameworks/digital-marketplace/requirements/${this.state.briefType}`}>
          <button styleName="form-submit-button">
            Continue
          </button>
        </a>
      </div>
    );
  }
}

export default BriefChoice
