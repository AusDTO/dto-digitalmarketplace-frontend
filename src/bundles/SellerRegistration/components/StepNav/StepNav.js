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
    const { buttonText, to, type } = this.props;

    return (
      <div styleName="nav-row">
            <button type="submit" styleName="nav-button">{buttonText || 'Save and continue'}</button>
            <button className="save-button" styleName="nav-button" onClick={this.onSave.bind(this)}>Save and finish later</button>
          {type === 'edit' ?
              <a className="button-secondary" styleName="nav-link skip-link" href="/sellers">Cancel update</a>
            :
              <button className="button-secondary" styleName="nav-link skip-button" onClick={this.onSkip.bind(this, to)}>Skip for now</button>
            }
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
    ...ownProps,
    type: state.application.type,

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions, }, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(StepNav);
