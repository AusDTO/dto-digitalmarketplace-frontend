import React from 'react'
import { connect } from 'react-redux'
import { convertApplicationToSeller, rejectApplication } from '../../redux/modules/applications'
import format from 'date-fns/format';


const AppList = ({meta = {}, applications, onRejectClick, onAcceptClick}) => (
  <div><h2>{meta.heading}</h2>
  <table className="content-table">

  <thead>
    <tr>
      <th>created_at/submitted_at</th>
      <th>name</th>
      <th>status</th>
      <th>jira</th>
      <th>actions</th>
    </tr>
  </thead>

  <tbody>

  {applications.map((a, i) => {
    var latestDate = a.created_at;
    if (a.submitted_at) {
        latestDate = a.submitted_at;
    }
    return (
    <tr key={a.id}>
      <td>{format(new Date(latestDate), 'YYYY-MM-DD HH:mm')}</td>
      <td><a target="_blank" href={meta.url_preview.concat(a.id) }>{a.name || "[no name]"}
        {a.supplier_code && (<span className="badge--default">Existing</span>)}
        {a.recruiter === 'yes' && (<span className="badge--beta">Recruiter</span>)}
      </a></td>
      <td>{a.status}</td>
      <td>
        {a.tasks && a.tasks.subtasks.map((t, i) =>
          <a target="_blank" rel="external" className={t.status} key={t.key} href={t.link}>{t.summary}</a>
        )}
      </td>
        <td>{ a.status === 'submitted' &&
          <button onClick={e => {
                 e.preventDefault();
                 onRejectClick(a.id);
               }} name="Reject">Reject</button>
          }
          { a.status === 'submitted' &&
        <button onClick={e => {
               e.preventDefault();
               onAcceptClick(a.id);
             }} name="Accept">Accept</button>
        }</td>
    </tr>
  )})}
  </tbody></table></div>
)

const mapStateToProps = ({applications, meta}, ownProps) => {
  return {
    ...ownProps,
    applications,
    meta
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAcceptClick: (id) => {
      dispatch(convertApplicationToSeller(id))
    },
    onRejectClick: (id) => {
      dispatch(rejectApplication(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
