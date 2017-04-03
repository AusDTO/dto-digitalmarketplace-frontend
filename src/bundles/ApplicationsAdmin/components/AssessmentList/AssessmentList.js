import React from 'react'
import { connect } from 'react-redux'

import format from 'date-fns/format';
import distanceInWords from 'date-fns/distance_in_words';

import './AssessmentList.css'

const AssessmentList = ({ assessments }) => (
  <div>
    <h2>Assessments</h2>
    <table className="content-table">
      <thead>
        <tr>
          <th>closing</th>
          <th>applied</th>
          <th>name</th>
          <th>domain</th>
          <th>briefs</th>
          <th>jira</th>
          <th>actions</th>
        </tr>
      </thead>

      <tbody>
        {assessments && assessments.map((a, i) => {
          return (
          <tr key={a.id}>
            <td>
              {a.briefs.map((b, i) => {
                return `${distanceInWords(new Date(), new Date(b.dates.closing_time))} `
              })}
            </td>
            <td>{format(new Date(a.created_at), 'YYYY-MM-DD HH:mm')}</td>
            <td>{a.supplier_domain.supplier.name}</td>
            <td>{a.supplier_domain.domain.name}</td>
            <td>{a.briefs.map((b, i) => {return `${b.title} `})}</td>
            <td></td>
            <td styleName="buttons">
              <button name="Reject" styleName="reject">Reject</button>
              <button name="Accept">Accept</button>
            </td>
          </tr>
        )})}
      </tbody>
    </table>
  </div>
)

const mapStateToProps = ({assessments}) => {return {assessments}};

export default connect(mapStateToProps)(AssessmentList);
