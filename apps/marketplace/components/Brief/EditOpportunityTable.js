import React from 'react'

const EditOpportunityTable = props => {
  const { brief, isOpenToAll, location } = props

  return (
    <table className="col-xs-12">
      <tbody>
        <tr>
          <th scope="row">Opportunity title</th>
          <td>{brief.title}</td>
          <td>
            <a href={`${location.pathname}/title`}>Edit title</a>
          </td>
        </tr>
        {!isOpenToAll && (
          <tr>
            <th scope="row">Invited sellers</th>
            <td>
              <ul>
                {Object.values(brief.sellers).map(seller => (
                  <li key={seller.name}>{seller.name}</li>
                ))}
              </ul>
            </td>
            <td>
              <a href={`${location.pathname}/sellers`}>Add sellers</a>
            </td>
          </tr>
        )}
        <tr>
          <th scope="row">Summary</th>
          <td>
            <p>{brief.summary}</p>
          </td>
          <td>
            <a href={`${location.pathname}/summary`}>Edit summary</a>
          </td>
        </tr>
        <tr>
          <th scope="row">Documents</th>
          <td>
            <ul>
              {Object.values(brief.attachments).map(attachment => (
                <li key={attachment}>{attachment}</li>
              ))}
            </ul>
          </td>
          <td>
            <a href={`${location.pathname}/documents`}>Edit documents</a>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default EditOpportunityTable
