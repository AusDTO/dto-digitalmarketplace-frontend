import React from 'react'
import { connect } from 'react-redux'

import './TeamView.css'

const TeamView = ({teammembers, meta = {}}) => (
  <div className="content-main">
  <h1>Team: {meta.teamname}</h1>

  <h2>Active team members</h2>
  <table className="content-table">
    <thead>
      <tr>
        <th>name</th>
        <th>email</th>
        {/* <th>briefs</th> */}
      </tr>
    </thead>
    <tbody>
    {teammembers.map((tm, i) => {
      return (
        <tr>
            <td>{tm.name}</td>
            <td><a href={"mailto:" + tm.email_address}>{tm.email_address}</a></td>
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
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);
