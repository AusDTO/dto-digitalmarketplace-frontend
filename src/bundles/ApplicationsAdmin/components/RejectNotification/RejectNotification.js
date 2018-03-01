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
          <h3>
            Reject domain assessment with optional email to seller
          </h3>
          <p>The email will begin with:</p>
          <p>
            <pre>
            Thanks for your interest in <em>opportunity name</em> which was posted on the Digital Marketplace, and for requesting assessment.

            We've now reviewed your case study against our assessment criteria for <em>domain name</em>.
            </pre>
          </p>
          <b>
            Then the following text will be used:
          </b>
          <textarea value={this.state.message} onChange={this.handleChange}/>
          <b>
            Followed by:
          </b>
          <p>
            <pre>
            This means that you will not be able to respond to this opportunity or others in the <em>domain name</em> area. If you want to provide this service through the marketplace in the future, you will need to be assessed again.
            
            Therefore, please update your current case study, or remove it and replace it with a more comprehensive case study. You can then request assessment again for a future opportunity. Please note that we will not reassess a case study for this particular opportunity.
            
            We strongly recommend you read our support guides before updating your case study, to understand the process and what is required:
            
            - create a compelling case study to showcase your digital expertise
            - understand the assessment criteria for each digital service
            - see the range of digital areas of expertise in the marketplace
            - read the useful Seller guide and FAQs to find out more
            
            Thanks,
            
            The Digital Marketplace team
            </pre>
          </p>
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


