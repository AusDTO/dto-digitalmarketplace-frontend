import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { actions } from '../../redux/modules/application';

import './StepNav.css';

class StepNav extends React.Component {
  onSave(e) {
      const { actions } = this.props;
      e.preventDefault();
      actions.submitApplication();
      actions.saveApplication();
      actions.navigateToStep('/start');
      return;
  }

  onSkip(to, e) {
      const { actions } = this.props;
      e.preventDefault();
      actions.navigateToStep(to);
      return;
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.clearApplication();
  }

  render() {
    const { buttonText, to } = this.props;

    return (
      <div className="row">
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
  buttonText: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
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
