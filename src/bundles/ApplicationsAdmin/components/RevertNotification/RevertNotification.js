import React, {Component} from 'react';
import {connect} from 'react-redux';
import {revertApplication} from '../../redux/modules/applications';
import './RevertNotification.css';
import {templateString} from '../../revertEmailTemplate';


export default class RevertedNotificationForm extends Component {

  static propTypes = {
    appID: React.PropTypes.number.isRequired,
    onClose: React.PropTypes.func.isRequired,
    message: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      message: templateString
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  resetMessageText(propsMessage) {
    this.setState({
      message: propsMessage
    });
  }

  render() {
    const {
      message,
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
                onClose(appID, this.state.message);
                this.resetMessageText(message);
              }}>Revert & Send Email
            </button>
          </div>
          <div styleName="form-button-wrapper">
            <button
              type="button"
              style={{width: '200px'}}
              onClick={() => {
                onRevertClick(appID, '');
                onClose(appID, '');
                this.resetMessageText(message);
              }}>Revert Without Email
            </button>
          </div>
        </div>
        <div
          styleName="close-modal-prompt"
          onClick={() => {
              onClose(appID, this.state.message);
              this.resetMessageText(message);
            }}
          onKeyUp={() => {
              onClose(appID, this.state.message);
              this.resetMessageText(message);
            }}
          role="presentation">close
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onRevertClick: (id, msg = '') => {
      dispatch(revertApplication(id, msg));
    }
  }
};

export const ConnectedRevertedForm = connect(mapStateToProps, mapDispatchToProps)(RevertedNotificationForm);


