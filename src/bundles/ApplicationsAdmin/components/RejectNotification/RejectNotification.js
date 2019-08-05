import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {rejectAssessment} from '../../redux/modules/assessments';
import './RejectNotification.css';
import {templateString} from '../../rejectEmailTemplate';


export default class RejectedNotificationForm extends Component {

  static propTypes = {
    application_id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    onRejectClick: PropTypes.func.isRequired,
    active: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      message: templateString,
      active: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  updateActive(status) {
    this.setState({
      active: status,
      message: this.props.defaultMessage
    })
  }

  // parent component receives active via an action, as a result of successfully hitting
  // the reject api
  // use this to toggle which message will be seen on the email modal next time it opens
  // instead of relying on handle button click which had no api response validation
  componentWillReceiveProps(newProps) {
    if (this.props.active !== newProps.active) {
      this.updateActive(newProps.active)
    }
  }

  render() {
    const {
      application_id,
      onClose,
      onRejectClick
    } = this.props;

    return (
      <form>
        <label htmlFor="formHeading">
          <h3 className="au-display-md">
            Reject domain assessment with optional email to seller
          </h3>
          <textarea value={this.state.message} onChange={this.handleChange}/>
        </label>
        <div styleName="form-button-group">
          <div styleName="form-button-wrapper">
            <button
              type="button"
              style={{width: '220px'}}
              onClick={() => {
                onRejectClick(application_id, this.state.message);
              }}>Reject & Send Email
            </button>
          </div>
          <div styleName="form-button-wrapper">
            <button
              type="button"
              style={{width: '250px'}}
              onClick={() => {
                onRejectClick(application_id, '');
              }}>Reject Without Email
            </button>
          </div>
        </div>
        <a
          styleName="close-modal-prompt"
          tabIndex="0"
          onClick={() => {
            onClose(application_id, this.state.message);
          }}
          onKeyUp={() => {
            onClose(application_id, this.state.message);
          }}
          className="button">close
        </a>
      </form>
    )
  }
}


export const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  }
};

const mapDispatchToProps = (dispatch, {onClose}) => {
  return {
    onRejectClick: (id, msg = '') => {
      onClose(id, msg);
      dispatch(rejectAssessment(id, msg));
    }
  }
};

export const ConnectedRejectedForm = connect(mapStateToProps, mapDispatchToProps)(RejectedNotificationForm);


