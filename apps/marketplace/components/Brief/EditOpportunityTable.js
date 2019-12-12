import React from 'react'

const EditOpportunityTable = props => {
  const { brief, location } = props

  return (
    <table className="col-xs-12">
      <tbody>
        <tr>
          <th>Opportunity title</th>
          <td>{brief.title}</td>
          <td>
            <a href={`${location.pathname}/title`}>Edit title</a>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default EditOpportunityTable