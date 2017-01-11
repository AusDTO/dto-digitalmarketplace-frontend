import React from 'react'
import { connect } from 'react-redux'
import { convertApplicationToSeller, rejectApplication } from '../../redux/modules/applications'
import format from 'date-fns/format';


const AppList = ({meta = {}, applications, onRejectClick, onAcceptClick}) => (
  <div><h2>{meta.heading}</h2>
  <table style={{margin: '0 auto', width: '100%'}}><tbody>
  <tr>
    <th>created_at</th>
    <th>name</th>
    <th>status</th>
    <th>reject</th>
    <th>accept</th>
  </tr>
  {applications.map((a, i) =>
    <tr key={a.id}>
      <td>{format(new Date(a.created_at), 'YYYY-MM-DD HH:mm')}</td>
      <td width="45%"><a href={meta.url_preview.concat(a.id) }>{a.name || "[no name]"}
        {a.supplier_code && (<span className="badge--default">Existing Seller</span>)}</a></td>
      <td>{a.status}</td>
        <td>{ a.status === 'submitted' &&
          <button type="button" onClick={e => {
                 e.preventDefault();
                 onRejectClick(a.id);
               }} style={{margin: '0.1rem', display: 'inline-block'}} type="button" name="Reject">Reject</button>
          }</td>
      <td>{ a.status === 'submitted' &&
        <button type="button" onClick={e => {
               e.preventDefault();
               onAcceptClick(a.id);
             }} style={{margin: '0.1rem', display: 'inline-block'}} type="button" name="Accept">Accept</button>
        }</td>
    </tr>
  )}
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
