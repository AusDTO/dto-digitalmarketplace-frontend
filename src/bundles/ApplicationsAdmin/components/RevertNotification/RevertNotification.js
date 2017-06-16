import React, {Component} from 'react';
import {connect} from 'react-redux';
import {revertApplication} from '../../redux/modules/applications';
import './RevertNotification.css';
import {templateString} from '../../revertEmailTemplate';


export default class RevertedNotificationForm extends Component {

  static propTypes = {
    appID: React.PropTypes.number.isRequired,
    onClose: React.PropTypes.func.isRequired,
    defaultMessage: React.PropTypes.string.isRequired,
    onRevertClick: React.PropTypes.func.isRequired,
    revertStatus: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      message: templateString,
      revertStatus: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  updateRevertStatus(status) {
    this.setState({
      revertStatus: status,
      message: this.props.defaultMessage
    })
  }

  // parent component receives revertStatus via an action, as a result of successfully hitting
  // the revert api
  // use this to toggle which message will be seen on the email modal next time it opens
  // instead of relying on handle button click which had no api response validation
  componentWillReceiveProps(newProps) {
    if (this.props.revertStatus !== newProps.revertStatus) {
      this.updateRevertStatus(newProps.revertStatus)
    }
  }

  render() {
    const {
      appID,
      onClose,
      onRevertClick
    } = this.props;

    return (
      <form>
        <label htmlFor="formHeading">
          <h3>
            Revert application with optional email to seller
          </h3>
          <b>
            {`Provide a short clear reason, starting with a hyphen. Eg "${"- ABN missing a digit"}"`}
          </b>
          <textarea value={this.state.message} onChange={this.handleChange}/>
        </label>
        <div styleName="form-button-group">
          <div styleName="form-button-wrapper">
            <button
              type="button"
              style={{width: '200px'}}
              onClick={() => {
                onRevertClick(appID, this.state.message);
              }}>Revert & Send Email
            </button>
          </div>
          <div styleName="form-button-wrapper">
            <button
              type="button"
              style={{width: '200px'}}
              onClick={() => {
                onRevertClick(appID, '');
              }}>Revert Without Email
            </button>
          </div>
        </div>
        <a
          styleName="close-modal-prompt"
          tabIndex="0"
          onClick={() => {
            onClose(appID, this.state.message);
          }}
          onKeyUp={() => {
            onClose(appID, this.state.message);
          }}
          role="button">close
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
    onRevertClick: (id, msg = '') => {
      onClose(id, msg);
      dispatch(revertApplication(id, msg));
    }
  }
};

export const ConnectedRevertedForm = connect(mapStateToProps, mapDispatchToProps)(RevertedNotificationForm);


