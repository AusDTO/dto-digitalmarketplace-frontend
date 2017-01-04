import React from 'react'
import { connect } from 'react-redux'
import { convertApplicationToSeller } from '../../redux/modules/applications'

const AppList = ({meta = {}, applications, onClick}) => (
  <div><h2>{meta.heading}</h2>
  <table style={{margin: '0 auto', width: '100%'}}><tbody>
  <tr>
    <th>name</th>
    <th>id</th>
    <th>email</th>
    <th>status</th>
    <th>action</th>
  </tr>
  {applications.map((a, i) =>
    <tr key={a.id}>
      <td width="45%"><a href={meta.url_preview.concat(a.id) }>{a.name || "[no name]"}
        {a.supplier_code && (<span className="badge--default">Existing Seller</span>)}</a></td>
      <td>{a.id}</td>
      <td>{a.email}</td>
      <td>{a.status}</td>
      <td>{ a.status === 'submitted' &&
        <input onClick={e => {
               e.preventDefault()
               onClick(a.id);
             }} style={{margin: '1rem', display: 'inline-block'}} type="button" value="Convert to seller" />
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
    onClick: (id) => {
      dispatch(convertApplicationToSeller(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
