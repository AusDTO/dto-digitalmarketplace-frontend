import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Control, LocalForm } from 'react-redux-form';
import format from 'date-fns/format';
import {moveUser, inviteUser} from '../../redux/modules/users';
import './AppUsers.css';


class AppUser extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
  };

  render() {
    const {users, meta, onMoveUser, onInviteUser} = this.props;
    debugger;
    return (
      <article id="content" className="content-main">
        <header className="page-heading page-heading-without-breadcrumb">
          <h1 className="au-display-xl">
            {meta.application.name}
          </h1>
        </header>
        <table className="content-table summary-item-body">
          <caption className="visuallyhidden">Users</caption>
          <thead className="summary-item-field-headings-visible">
            <tr>
              <th scope="col" className="summary-item-field-heading-first">Name</th>
              <th scope="col" className="summary-item-field-heading">Email address </th>
              <th scope="col" className="summary-item-field-heading">Last login</th>
              <th scope="col" className="summary-item-field-heading">Pwd changed</th>
              <th scope="col" className="summary-item-field-heading">Locked</th>
            </tr>
          </thead>
          <tbody>
            {
             users.filter(user => !user.invited).map((user, i) =>
              <tr key={i} className="summary-item-row">
                <td  className="summary-item-field-first">
                  <span>{user.name}</span>
                </td>
                <td  className="summary-item-field summary-item-free-text">
                  <span>{user.email_address}</span>
                </td>
                <td  className="summary-item-field">
                  <span>{format(user.logged_in_at, 'YYYY-MM-DD HH:mm')}</span>
                </td>
                <td  className="summary-item-field">
                  <span>{format(user.password_changed_at, 'YYYY-MM-DD HH:mm')}</span>
                </td>
                <td  className="summary-item-field">
                  <span>{user.locked.toString()}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {meta.application.type === 'new' && (meta.application.status === 'saved' || meta.application.status === 'submitted') &&
          <div>
            <LocalForm onSubmit={onInviteUser}>
                <div className="grid-row">
                    <div className="column-two-thirds">
                        <div className="question">
                            <label className="question-heading-with-hint" htmlFor="user_to_invite_name">Name</label>
                            <p className="hint">
                                Enter the name of the person you wish to invite
                            </p>
                            <Control.text autoComplete="off" className="text-box" id="user_to_invite_name" model=".name"/>
                        </div>
                        <div className="question">
                            <label className="question-heading-with-hint" htmlFor="user_to_invite_email_address">Email address</label>
                            <p className="hint">
                                Enter the email address of the person you wish to invite
                            </p>
                            <Control.text autoComplete="off" className="text-box" id="user_to_invite_email_address" model=".email"/>
                        </div>
                        <button className="button-save">Send Invitation</button>
                    </div>
                </div>
            </LocalForm>
            <div>
              {users.filter(user => user.invited).map((user, i) => 
                  <div styleName="invited-message" key={i}>{`Invitation sent to ${user.email}`}</div>
              )}
            </div>
            <LocalForm onSubmit={onMoveUser}>
                <div className="grid-row">
                    <div className="column-two-thirds">
                        <div className="question">
                            <label className="question-heading-with-hint" htmlFor="user_to_move_email_address">Move an existing user to this application</label>
                            <p className="hint">
                                Enter the email address of the existing user you wish to move to this application
                            </p>
                            <Control.text autoComplete="off" className="text-box" id="user_to_move_email_address" model=".email"/>
                        </div>
                        <button className="button-save">Move user to this application</button>
                    </div>
                </div>
            </LocalForm>
          </div>
        }
      </article>
    )
  }
}

const mapStateToProps = (ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMoveUser: (email) => {
      dispatch(moveUser(email))
    },
    onInviteUser: (user) => {
      dispatch(inviteUser(user))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUser);
