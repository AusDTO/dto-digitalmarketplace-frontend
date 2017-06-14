import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './BriefChoice.css';

const BriefChoice = props => {
  return (
    <div styleName="brief-choice-container">
      <h1>Post a brief</h1>
      Create a new opportunity for a:
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
      briefType: 'digital-specialist'
    };
    this.handleChange = this
      .handleChange
      .bind(this);
  }

  handleSubmit(e) {
    
  }

  handleChange(e) {
    this.setState({briefType: e.target.value})
  }

  render() {
    return (
      <div>
        <div styleName={
          `form-radio-container ${(this.state.briefType === 'digital-specialist') ? 'checked' : ''}`}>
          
          <label htmlFor="digitalSpecialist">
            <input
            type="radio"
            name="digital-specialist"
            value="digital-specialist"
            checked={this.state.briefType === "digital-specialist"}
            onChange={this.handleChange}/>
            <span styleName="form-label">Digital Specialist</span>
          </label>
        </div>
        <div styleName={
          `form-radio-container ${(this.state.briefType === 'digital-outcome') ? 'checked' : ''}`
        }>
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
        <input styleName="form-submit-button" type="submit" value="Continue" onClick={() => this.handleSubmit()}/>
      </div>
    );
  }
}

export default BriefChoice
