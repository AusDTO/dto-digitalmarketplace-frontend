import React from 'react'
import { connect } from 'react-redux'
import { convertApplicationToSeller } from '../../redux/modules/applications'

const AppList = ({meta = {}, applications, onClick}) => (
  <div><h2>{meta.heading}</h2>
  <table style={{margin: '0 auto'}}><tbody>
  <tr>
    <th>name&nbsp;&nbsp;&nbsp;</th>
    <th>id&nbsp;&nbsp;&nbsp;</th>
    <th>email&nbsp;&nbsp;&nbsp;</th>
    <th>status&nbsp;&nbsp;&nbsp;</th>
    <th>CONVERT&nbsp;&nbsp;&nbsp;</th>
    <th>converted&nbsp;&nbsp;&nbsp;</th>
  </tr>
  {applications.map((a, i) =>
    <tr key={a.id}>
      <td>{a.name}</td>
      <td>{a.id}</td>
      <td>{a.email}</td>

      <td style={{padding: '1rem'}}>Approved by somebody@digital.gov.au</td>
      <td>  <input onClick={e => {
                console.log('convertApplicationToSeller:' + a.id);
               e.preventDefault()
               onClick(a.id);
             }} style={{margin: '1rem', display: 'inline-block'}} type="button" value="Convert to seller" /></td>
      <td>{a.converted && 'converted'}</td>
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

//
// function convertApplicationToSeller(id) {
//   console.log('convertApplicationToSeller');
//   return {
//     type: CONVERT_TO_SELLER,
//     id
//   }
// }
// const convertApplicationToSeller = (id) => {
//   console.log(id)
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => {
      dispatch(convertApplicationToSeller(id))
    }
  }
}

// const state = {
//   applications: {}
//   meta: {},
//   options: {}
// }

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
