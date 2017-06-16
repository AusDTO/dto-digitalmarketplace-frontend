import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './BriefChoice.css';

const BriefChoice = props => {
  return (
    <div styleName="brief-choice-container">
      <h1>Start a New Brief</h1>
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
  }

  handleChange(type) {
    this.setState({briefType: type})
  }

  render() {
    return (
      <div>
        <div
          styleName={`form-radio-container ${ (this.state.briefType === 'digital-professionals')
          ? 'checked'
            : ''}`}>
          <form>
            <label
              htmlFor="digitalProfessionals"
              onClick={() => this.handleChange('digital-professionals')}
              onKeyUp={() => { }}
              role="presentation" tabIndex="0">
            <span>Digital Specialist</span>
            </label>
          </form>  
        </div>
        <div
          styleName={`form-radio-container ${ (this.state.briefType === 'digital-outcome')
          ? 'checked'
            : ''}`}>
          <form>
            <label
              htmlFor="digitalOutcome"
              onClick={() => this.handleChange('digital-outcome')}
              onKeyUp={() => { }}
              role="presentation" tabIndex="0"> 
            <span>Digital Outcome</span>
            </label>
          </form>  
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



