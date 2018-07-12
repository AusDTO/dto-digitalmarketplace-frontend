import React from 'react'
import {connect} from 'react-redux'

const TeamView = ({teammembers, meta = {}}) => (
  <div className="content-main">
    <a href="/buyers">Back to briefs</a>
    <h1 className="au-display-xl">{meta.teamname}</h1>

    <h2 className="au-display-lg">Active team members</h2>
    <table className="content-table summary-item-body">
      <thead className="summary-item-field-headings-visible">
      <tr>
        <th className="summary-item-field-heading-first">Name</th>
        <th className="summary-item-field-heading">Email</th>
        {/* <th>briefs</th> */}
      </tr>
      </thead>
      <tbody>
      {teammembers.map((tm, i) => {
        return (
          <tr className="summary-item-row">
            <td className="summary-item-field">{tm.name}</td>
            <td className="summary-item-field"><a href={"mailto:" + tm.email_address}>{tm.email_address}</a></td>
            {/* <td>{tm.briefs.map((b, i) => (
             <div>{b.title}</div>
             ))}</td> */}
          </tr>
        )
      })}
      </tbody>
    </table>
  </div>
)

const mapStateToProps = ({meta, teammembers}, ownProps) => {
  return {
    ...ownProps,
    teammembers,
    meta
  };
};

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);
