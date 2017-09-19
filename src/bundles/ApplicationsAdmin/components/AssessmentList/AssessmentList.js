import React from 'react'
import { connect } from 'react-redux'

import format from 'date-fns/format'
import distanceInWords from 'date-fns/distance_in_words'
import isBefore from 'date-fns/is_before'

import has from 'lodash/has'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import values from 'lodash/values'
import { Modal } from '../../../../shared/Modal/Modal'
import { templateString } from '../../rejectEmailTemplate'
import { ConnectedRejectedForm } from '../RejectNotification/RejectNotification'
import { approveAssessment, rejectAssessment } from '../../redux/modules/assessments'

import './AssessmentList.css'

class AssessmentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      msg: '',
      updated: false,
      responseModalOpen: false
    }
  }
  toggleModal(application_id, msg) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      application_id: application_id || null,
      msg: msg
    })
  }

  toggleResponseModal() {
    this.setState({
      responseModalOpen: !this.state.responseModalOpen
    })
  }
  render() {
    const { assessments, onApproveClick} = this.props
    let brief_assessments = {}

    assessments.forEach(assessment => {
      if (assessment.briefs) {
        assessment.briefs.forEach(brief => {
          if (!has(brief_assessments, brief.id)) {
            brief_assessments[brief.id] = {
              title: brief.title,
              closing_at: brief.dates.closing_date,
              assessments: []
            }
          }
          if (assessment.supplier_domain.status !== 'assessed' && assessment.active) {
            brief_assessments[brief.id].assessments.push(assessment)
          }
        })
      }
    })
    let sorted_brief_assessments = orderBy(
      values(brief_assessments).filter(v => !isEmpty(v.assessments)),
      'closing_at',
      'asc'
    )

    let rejectedAppID = this.state.application_id || null
    let rejectedApp = !rejectedAppID ? null : assessments.filter(x => x.id === rejectedAppID)[0]

    let { active } = !rejectedApp ? {} : rejectedApp

    return (
      <span>
        <Modal show={this.state.responseModalOpen}>
          <div >
            {!active
              ? this.state.msg !== ''
                ? <h4>{`Domain rejection email sent successfully `}</h4>
                : <h4>{`Domain assessment successfully rejected without email notification`}</h4>
              : <h4>{`Domain rejection email was not sent due to error, domain not yet rejected`}</h4>}
          </div>
          <button type="button" style={{ width: '90px', height: '30px' }} onClick={() => this.toggleResponseModal()}>
            close
          </button>
        </Modal>

        <div id="modal-wrapper">
          <Modal show={ this.state.modalOpen }>
            <ConnectedRejectedForm
              defaultMessage={templateString}
              onClose={(app, msg) => this.toggleModal(app, msg)}
              application_id={this.state.application_id}
              active={active}
            />
          </Modal>
        </div>
        {sorted_brief_assessments.map((brief, i) => {
          let closingTime = new Date(brief.closing_at + ' UTC').setHours(18)
          let date = isBefore(closingTime, new Date())
            ? 'closed on ' + brief.closing_at
            : `${distanceInWords(new Date(), closingTime, { addSuffix: true })} (${format(
                closingTime,
                'YYYY-MM-DD HH:mm Z'
              )} AEST)`
          return (
            <div key={i}>
              <strong> {brief.title}</strong> <small>{date}</small>
              <table className="content-table">
                <thead>
                  <tr>
                    <th>applied</th>
                    <th>supplier</th>
                    <th>domain</th>
                    <th>actions</th>
                  </tr>
                </thead>

                <tbody>
                  {brief.assessments.map((a, i) => {
                    return (
                      <tr key={a.id}>
                        <td width="10%">
                          {format(new Date(a.created_at), 'YYYY-MM-DD HH:mm')}
                        </td>
                        <td width="20%">
                          <a href={'/admin/assessments/supplier/' + a.supplier_domain.supplier.code}>
                            {a.supplier_domain.supplier.name}
                            (#{a.supplier_domain.supplier.code})
                          </a>
                        </td>
                        <td width="60%">
                          {a.supplier_domain.domain.name}
                        </td>
                        <td styleName="buttons" width="10%">
                          <button
                            onClick={e => {
                              e.preventDefault()
                              this.toggleModal(a.id, undefined)
                              this.toggleResponseModal()
                            }}
                            name="Reject"
                            styleName={a.supplier_domain.status === 'unassessed' ? 'reject' : undefined}
                          >
                            Reject
                          </button>

                          <button
                            onClick={e => {
                              e.preventDefault()
                              if (
                                window.confirm(
                                  'Do you want to approve supplier "' +
                                    a.supplier_domain.supplier.name +
                                    "' for '" +
                                    a.supplier_domain.domain.name +
                                    "'?"
                                )
                              ) {
                                onApproveClick(a.id)
                              }
                            }}
                            name="Approve"
                            className={a.supplier_domain.status === 'unassessed' ? '' : 'disabled'}
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </span>
    )
  }
}

const mapStateToProps = ({ assessments, meta }) => {
  return { assessments, meta }
}

const mapDispatchToProps = dispatch => {
  return {
    onApproveClick: id => {
      dispatch(approveAssessment(id))
    },
    onRejectClick: (id, message) => {
      dispatch(rejectAssessment(id, message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentList)
