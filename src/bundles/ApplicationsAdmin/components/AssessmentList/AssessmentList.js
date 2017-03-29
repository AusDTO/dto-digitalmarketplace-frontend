import React from 'react'
import { connect } from 'react-redux'

import format from 'date-fns/format';

import '../AppList/AppList.css'

const AssessmentList = ({ assessments }) => (
  <div styleName="appList">
    <h2>Assessments</h2>
    <table className="content-table">
      <thead>
        <tr>
          <th>created</th>
          <th>name</th>
          <th>domain</th>
          <th>briefs</th>
          <th>status</th>
          <th>jira</th>
          <th>actions</th>
        </tr>
      </thead>

      <tbody>
        {assessments && assessments.map((a, i) => {
          return (
          <tr key={a.id}>
            <td>{format(new Date(a.created_at), 'YYYY-MM-DD HH:mm')}</td>
            <td>{a.supplier_domain.supplier.name}</td>
            <td>{a.supplier_domain.domain.name}</td>
            <td>{a.briefs.map((b, i) => {return `${b.title} `})}</td>
            <td>{a.supplier_domain.status}</td>
            <td></td>
            <td>
              <button name="Reject" styleName="reject">Reject</button>
              <button name="Accept">Accept</button>
            </td>
          </tr>
        )})}
      </tbody>
    </table>
  </div>
)

const mapStateToProps = ({assessments}, ownProps) => {
  return {
    ...ownProps,
    assessments,
  };
};


export default connect(mapStateToProps)(AssessmentList);
