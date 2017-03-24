import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { actions } from '../../redux/modules/application';
import { focusHeading } from '../../redux/helpers';

import SaveError from '../../../../shared/SaveError';

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
    const { buttonText, to } = this.props;

    return (
      <div className="row">
        <SaveError />
        <div className="col-xs-12 col-sm-12 col-md-9">
            <button type="submit" className="button-width button-width-left">{buttonText || 'Save and continue'}</button>
            <button className="save-button button-width button-width-right" onClick={this.onSave.bind(this)}>Save and finish later</button>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-3">
            <div styleName="skip">
              <button className="button-secondary" styleName="skip-link" onClick={this.onSkip.bind(this, to)}>Skip for now</button>
            </div>
        </div>
    </div>
    )
  }
}

StepNav.propTypes = {
  buttonText: React.PropTypes.string,
  to: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions, }, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(StepNav);
