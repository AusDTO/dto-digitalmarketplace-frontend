import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { actions } from '../../redux/modules/application';
import { focusHeading } from '../../redux/helpers';

import './StepNav.css';

class StepNav extends React.Component {
  onSave(e) {
      const { actions } = this.props;
      e.preventDefault();
      return actions.submitApplication()
        .then(() => { 
          focusHeading(); 
          actions.navigateToStep('/start');
        })
        .then(() => actions.saveApplication())
        .catch((e) => {
            console.error(`Error: ${e.message}`, e);
            actions.errorApplication();
        });
  }

  onSkip(to, e) {
      const { actions } = this.props;
      e.preventDefault();
      actions.navigateToStep(to);
      return;
  }

  render() {
    const { buttonText, to, error } = this.props;

    return (
      <div className="row">
        {error && 
          <div ref="box" className="callout--warning" aria-describedby="validation-masthead-heading" tabIndex="-1" role="alert">
            <h4 id="validation-masthead-heading">There was a problem saving your information.</h4>
              Please check your internet connection before closing the browser as any unsaved information will be lost.
          </div>
        }
        <div className="col-xs-12 col-sm-12">
            <button type="submit" className="button-width button-width-left">{buttonText || 'Save and continue'}</button>
            <button className="save-button button-width button-width-right" onClick={this.onSave.bind(this)}>Save and finish later</button>
        </div>
        <div className="col-xs-12 col-sm-12">
            <div styleName="skip">
              <button className="button-secondary" styleName="skip-link" onClick={this.onSkip.bind(this, to)}>Skip for now</button>
            </div>
        </div>
    </div>
    )
  }
}

StepNav.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  error: React.PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.application.error
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions, }, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(StepNav);
