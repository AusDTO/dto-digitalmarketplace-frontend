import React from 'react'

const EditOpportunityTable = props => {
  const { brief } = props

  return (
    <table className="col-xs-12">
      <tbody>
        <tr>
          <th>Opportunity title</th>
          <td>{brief.title}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default EditOpportunityTable
