import React from 'react';
import isEmpty from 'lodash/isEmpty';

const TeamOverview = ({members}) => (
  <div className="content-main">
    <h2>Active team members</h2>
    {(isEmpty(members) ?
        "You are the only registered buyer in your team" :
    <table className="content-table summary-item-body">
      <thead className="summary-item-field-headings-visible">
      <tr>
        <th className="summary-item-field-heading-first">Name</th>
        <th className="summary-item-field-heading">Email</th>
      </tr>
      </thead>
      <tbody>
      {members.map((member, i) => {
        return (
          <tr className="summary-item-row" key={i}>
            <td className="summary-item-field">{member.name}</td>
            <td className="summary-item-field">
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