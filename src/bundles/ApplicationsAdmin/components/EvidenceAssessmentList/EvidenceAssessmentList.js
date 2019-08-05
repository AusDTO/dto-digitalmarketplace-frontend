import React from 'react'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import './EvidenceAssessmentList.css'

class EvidenceAssessmentList extends React.Component {
  render() {
    const { evidence } = this.props

    if (evidence && evidence.length > 0) {
      return (
        <div styleName="evidenceList">
          <h1 className="au-display-xl">Submitted evidence assessments</h1>
          <table className="content-table">
            <thead>
              <tr>
                <th>submitted_at</th>
                <th>supplier</th>
                <th>brief</th>
                <th>domain</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {evidence.map(e => (
                <tr key={e.id}>
                  <td>{format(e.submitted_at, 'DD-MM-YYYY')}</td>
                  <td>{e.supplier_name}</td>
                  <td>
                    {e.brief_id && (
                      <a href={`//${this.props.meta.server_name}/2/digital-marketplace/opportunities/${e.brief_id}`}>
                        ID: {e.brief_id} (closing on {format(e.brief_closed_at, 'DD-MM-YYYY')})
                      </a>
                    )}
                  </td>
                  <td>{e.domain_name}</td>
                  <td>
                    <a href={`/admin/evidence-assessments/${e.id}`}>Assess</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <div>
        <h1 className="au-display-xl">Submitted evidence assessments</h1>
        <p>🎉🎉🎉 There are currently no evidence submissions awaiting assessment. 🎉🎉🎉</p>
      </div>
    )
  }
}

const mapStateToProps = ({ evidence, meta }) => {
  return { evidence, meta }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceAssessmentList)
