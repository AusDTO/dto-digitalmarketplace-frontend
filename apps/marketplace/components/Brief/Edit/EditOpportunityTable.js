import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

import AUheading from '@gov.au/headings/lib/js/react.js'

import { getClosingTime } from 'marketplace/components/helpers'
import SummaryPreview from './SummaryPreview'
import { getSellersToInvite, itemWasEdited, getAllDocuments } from './helpers'

import localStyles from './EditOpportunityTable.scss'
import styles from '../../../main.scss'

class EditOpportunityTable extends Component {
  constructor(props) {
    super(props)

    this.showInvitedSellers = this.showInvitedSellers.bind(this)
  }

  showInvitedSellers = () => {
    const { brief, isOpenToAll } = this.props
    return !isOpenToAll && brief.sellers
  }

  generateDocumentList = () => {
    const { brief, edits } = this.props
    const documentBaseURL = `/api/2/brief/${brief.id}/attachments/`
    return (
      <React.Fragment>
        {(getAllDocuments(brief).length > 0 || getAllDocuments(edits).length > 0) && (
          <ul>
            {edits.documentsEdited &&
              getAllDocuments(edits).map(document => (
                <li key={document}>
                  <a href={`${documentBaseURL}${document}`} target="_blank" rel="noopener noreferrer">
                    {document}
                  </a>
                </li>
              ))}
            {!edits.documentsEdited &&
              getAllDocuments(brief).map(document => (
                <li key={document}>
                  <a href={`${documentBaseURL}${document}`} target="_blank" rel="noopener noreferrer">
                    {document}
                  </a>
                </li>
              ))}
          </ul>
        )}
        {getAllDocuments(brief).length === 0 && getAllDocuments(edits).length === 0 && (
          <em className={styles.darkGrayText}>No documents have been uploaded</em>
        )}
      </React.Fragment>
    )
  }

  render = () => {
    const { brief, edits } = this.props
    const showInvited = this.showInvitedSellers()
    const sellersToInvite = getSellersToInvite(brief, edits)

    return (
      <React.Fragment>
        <table className={`col-xs-12 ${styles.hideMobile} ${styles.defaultStyle} ${styles.textAlignLeft}`}>
          <tbody>
            <tr>
              <th scope="row">Opportunity title</th>
              <td>{itemWasEdited(brief.title, edits.title) ? edits.title : brief.title}</td>
              <td>
                <Link to="/title" className="au-btn au-btn--tertiary">
                  Edit title
                </Link>
              </td>
            </tr>
            {showInvited && (
              <React.Fragment>
                <tr className={sellersToInvite.length > 0 ? styles.borderBottom0 : ''}>
                  <th scope="row">Invited sellers</th>
                  <td>
                    <ul>
                      {Object.values(brief.sellers).map(seller => (
                        <li key={seller.name}>{seller.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <Link to="/sellers" className="au-btn au-btn--tertiary">
                      {sellersToInvite.length > 0 ? 'Edit' : 'Add'} sellers
                    </Link>
                  </td>
                </tr>
                {sellersToInvite.length > 0 && (
                  <tr>
                    <th scope="row">Sellers to invite</th>
                    <td>
                      <ul>
                        {sellersToInvite.map(code => (
                          <li key={edits.sellers[code].name}>{edits.sellers[code].name}</li>
                        ))}
                      </ul>
                    </td>
                    <td aria-label="No value" />
                  </tr>
                )}
              </React.Fragment>
            )}
            <tr>
              <th scope="row">Summary</th>
              <td className={styles.tableColumnWidth19}>
                <SummaryPreview brief={brief} desktop edits={edits} previewHeight={64} />
              </td>
              <td>
                <Link to="/summary" className="au-btn au-btn--tertiary">
                  Edit summary
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Documents</th>
              <td>{this.generateDocumentList()}</td>
              <td>
                <Link to="/documents" className="au-btn au-btn--tertiary">
                  {getAllDocuments(brief).length > 0 || getAllDocuments(edits).length > 0 ? 'Edit' : 'Add'} documents
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Closing date</th>
              <td>
                {itemWasEdited(format(new Date(brief.dates.closing_time), 'YYYY-MM-DD'), edits.closingDate)
                  ? format(edits.closingDate, 'dddd DD MMMM YYYY [at 6pm (in Canberra)]')
                  : format(getClosingTime(brief), 'dddd DD MMMM YYYY [at] ha [(in Canberra)]')}
              </td>
              <td>
                <Link to="/closing-date" className="au-btn au-btn--tertiary">
                  Extend closing date
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={`${styles.hideDesktop} ${styles.marginTop2}`}>
          <div
            className={`${styles.greyBorderTop1} ${styles.greyBorderBottom1} ${styles.paddingTop1} ${styles.paddingBottom1} ${localStyles.editSection}`}
          >
            <div>
              <AUheading className={localStyles.editSectionHeading} level="2" size="sm">
                Opportunity title
              </AUheading>
              <Link to="/title" className={`au-btn au-btn--tertiary ${styles.floatRight} ${localStyles.editLink}`}>
                Edit
              </Link>
            </div>
            <div>
              <p>{itemWasEdited(brief.title, edits.title) ? edits.title : brief.title}</p>
            </div>
          </div>
          {showInvited && (
            <div
              className={`${styles.greyBorderBottom1} ${styles.paddingTop1} ${styles.paddingBottom1} ${localStyles.editSection}`}
            >
              <div>
                <AUheading className={localStyles.editSectionHeading} level="2" size="sm">
                  Invited sellers
                </AUheading>
                <Link to="/sellers" className={`au-btn au-btn--tertiary ${styles.floatRight} ${localStyles.editLink}`}>
                  {sellersToInvite.length > 0 ? 'Edit' : 'Add'}
                </Link>
              </div>
              <div>
                <ul className={`${styles.marginTop0} ${styles.marginBottom0}`}>
                  {Object.values(brief.sellers).map(seller => (
                    <li key={seller.name}>{seller.name}</li>
                  ))}
                </ul>
              </div>
              {sellersToInvite.length > 0 && (
                <div className={styles.marginTop1}>
                  <AUheading className={localStyles.editSectionHeading} level="2" size="sm">
                    Sellers to invite
                  </AUheading>
                  <ul className={`${styles.marginTop0} ${styles.marginBottom0}`}>
                    {sellersToInvite.map(code => (
                      <li key={edits.sellers[code].name}>{edits.sellers[code].name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <div
            className={`${styles.greyBorderBottom1} ${styles.paddingTop1} ${styles.paddingBottom1} ${localStyles.editSection}`}
          >
            <div>
              <AUheading className={localStyles.editSectionHeading} level="2" size="sm">
                Summary
              </AUheading>
              <Link to="/summary" className={`au-btn au-btn--tertiary ${styles.floatRight} ${localStyles.editLink}`}>
                Edit
              </Link>
            </div>
            <div>
              <SummaryPreview brief={brief} edits={edits} previewHeight={80} />
            </div>
          </div>
          <div
            className={`${styles.greyBorderBottom1} ${styles.paddingTop1} ${styles.paddingBottom1} ${localStyles.editSection}`}
          >
            <div>
              <AUheading className={localStyles.editSectionHeading} level="2" size="sm">
                Documents
              </AUheading>
              <Link to="/documents" className={`au-btn au-btn--tertiary ${styles.floatRight} ${localStyles.editLink}`}>
                {getAllDocuments(brief).length > 0 || getAllDocuments(edits).length > 0 ? 'Edit' : 'Add'}
              </Link>
            </div>
            <div>{this.generateDocumentList()}</div>
          </div>
          <div
            className={`${styles.greyBorderBottom1} ${styles.paddingTop1} ${styles.paddingBottom1} ${localStyles.editSection}`}
          >
            <div>
              <AUheading className={localStyles.editSectionHeading} level="2" size="sm">
                Closing date
              </AUheading>
              <Link
                to="/closing-date"
                className={`au-btn au-btn--tertiary ${styles.floatRight} ${localStyles.editLink}`}
              >
                Extend
              </Link>
            </div>
            <div>
              <p>
                {itemWasEdited(format(new Date(brief.dates.closing_time), 'YYYY-MM-DD'), edits.closingDate)
                  ? format(edits.closingDate, 'dddd DD MMMM YYYY [at 6pm (in Canberra)]')
                  : format(getClosingTime(brief), 'dddd DD MMMM YYYY [at 6pm (in Canberra)]')}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

EditOpportunityTable.defaultProps = {
  brief: {
    dates: {
      closing_time: ''
    },
    sellers: {},
    title: ''
  },
  edits: {
    closingDate: '',
    sellers: {},
    title: ''
  },
  isOpenToAll: false
}

EditOpportunityTable.propTypes = {
  brief: PropTypes.shape({
    dates: PropTypes.shape({
      closing_time: PropTypes.string.isRequired
    }).isRequired,
    sellers: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }),
  edits: PropTypes.shape({
    closingDate: PropTypes.string.isRequired,
    sellers: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }),
  isOpenToAll: PropTypes.bool.isRequired
}

export default EditOpportunityTable
