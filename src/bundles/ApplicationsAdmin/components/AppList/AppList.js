import React from 'react'
import { connect } from 'react-redux'
import { convertApplicationToSeller } from '../../redux/modules/applications'

const AppList = ({meta = {}, applications, onClick}) => (
  <div><h2>{meta.heading}</h2>
  <table style={{margin: '0 auto'}}><tbody>
  <tr>
    <th>name</th>
    <th>id</th>
    <th>email</th>
    <th>status</th>
    <th>convert</th>
  </tr>
  {applications.map((a, i) =>
    <tr key={a.id}>
      <td>{a.name}</td>
      <td>{a.id}</td>
      <td>{a.email}</td>
      <td>{a.status}</td>
      <td>{ a.status === 'submitted' &&
        <input onClick={e => {
                console.log('convertApplicationToSeller:' + a.id);
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
