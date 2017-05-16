import React from 'react';
import isEmpty from 'lodash/isEmpty';

import './TeamOverview.css'

const TeamOverview = ({members}) => (
  <div styleName="teamoverview-main">
    <h2>Active team members</h2>
    {(isEmpty(members) ?
        "You are the only registered buyer in your team" :
    <table className="content-table summary-item-body">
      <thead>
      <tr styleName="teamoverview-table-row">
        <th styleName="teamoverview-table-heading">Name</th>
        <th styleName="teamoverview-table-heading">Email</th>
      </tr>
      </thead>
      <tbody>
      {members.map((member, i) => {
        return (
          <tr styleName="summary-item-row" key={i}>
            <td styleName="summary-item-field-name">{member.name}</td>
            <td styleName="summary-item-field">
              <a href={"mailto:" + member.email_address}>{member.email_address}</a>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
      )}
  </div>
)

TeamOverview.propTypes = {
  members: React.PropTypes.array.isRequired
}

export default TeamOverview