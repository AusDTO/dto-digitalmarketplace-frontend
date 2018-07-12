import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';

import './BriefChoice.css';

const BriefChoice = props => {
  return (
    <div styleName="brief-choice-container">
      <h1 className="au-display-xl">Start a new brief</h1>
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
      briefType: null
    };
  }

  handleChange(type) {
    this.setState({briefType: type})
  }

  render() {
    return (
      <div>
        <div
          styleName={classNames(
            'form-radio-container',
            { 'checked': this.state.briefType === 'digital-professionals' }
          )}>
          <form>
            <label
              htmlFor="digitalProfessionals"
              onClick={() => this.handleChange('digital-professionals')}
              onKeyUp={() => { }}
              role="presentation" tabIndex="0">
              <span>Digital Specialist</span>
              <p>
                Get seller responses to your criteria plus candidate resumes for shortlisting.  
              </p>
            </label>
          </form>  
        </div>
        <div
          styleName={classNames(
            'form-radio-container',
            { 'checked': this.state.briefType === 'digital-outcome' }
          )}>
          <form>
            <label
              htmlFor="digitalOutcome"
              onClick={() => this.handleChange('digital-outcome')}
              onKeyUp={() => { }}
              role="presentation" tabIndex="0"> 
              <span>Digital Outcome</span>
              <p>
                Get a summary of seller responses to your criteria, in spreadsheet format, for shortlisting. Once your shortlist is complete you can request sellers to provide full proposals for you to evaluate.
              </p>
            </label>
          </form>  
        </div>
        <a
          href={`/buyers/frameworks/digital-marketplace/requirements/${this.state.briefType}`}>
          <button styleName={classNames(
            'form-submit-button',
            { 'disabled': !this.state.briefType }
          )}
            disabled= {(!this.state.briefType)
          }>
            Continue
          </button>
        </a>
      </div>
    );
  }
}

export default BriefChoice



