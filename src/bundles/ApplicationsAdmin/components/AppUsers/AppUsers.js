import React, {Component} from 'react';
import {connect} from 'react-redux';
import format from 'date-fns/format';

class AppUser extends Component {

  static propTypes = {
    meta: React.PropTypes.object.isRequired,
  };

  render() {
    const {users, meta} = this.props;
    return (
      <div>
        <header class="page-heading page-heading-without-breadcrumb">
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
              <tr className="summary-item-row">
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
      </div>
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
    onClick: (id) => {
      // dispatch(convertApplicationToSeller(id))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUser);
