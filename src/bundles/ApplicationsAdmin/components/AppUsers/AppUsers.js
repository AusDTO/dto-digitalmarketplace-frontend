import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Control, LocalForm } from 'react-redux-form';
import format from 'date-fns/format';
import {moveUser} from '../../redux/modules/users';


class AppUser extends Component {

  static propTypes = {
    meta: React.PropTypes.object.isRequired,
  };

  render() {
    const {users, meta, onMoveUser} = this.props;
    return (
      <article id="content" className="content-main">
        <header className="page-heading page-heading-without-breadcrumb">
          <h1>
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
            {users.map((user, i) =>
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
        <LocalForm onSubmit={onMoveUser}>
            <div className="grid-row">
                <div className="column-two-thirds">
                    <div className="question">
                        <label className="question-heading-with-hint" htmlFor="user_to_move_email_address">Move an existing user to this supplier</label>
                        <p className="hint">
                            Enter the email address of the existing user you wish to move to this supplier
                        </p>
                        
                        <Control.text autoComplete="off" className="text-box" id="user_to_move_email_address" model=".email"/>
                    </div>
                    <button className="button-save">Move user to this supplier</button>
                </div>
            </div>
        </LocalForm>      
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUser);
