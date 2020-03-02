import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

import { getClosingTime } from 'marketplace/components/helpers'
import SummaryPreview from './SummaryPreview'
import { getSellersToInvite, itemWasEdited } from './helpers'

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

  render = () => {
    const { brief, edits } = this.props
    const showInvited = this.showInvitedSellers()
    const sellersToInvite = getSellersToInvite(brief, edits)

    return (
      <table className={`col-xs-12 ${styles.defaultStyle} ${styles.textAlignLeft}`}>
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
            <SummaryPreview brief={brief} edits={edits} />
            <td>
              <Link to="/summary" className="au-btn au-btn--tertiary">
                Edit summary
              </Link>
            </td>
          </tr>
          <tr>
            <th scope="row">Closing date</th>
            <td>
              {itemWasEdited(brief.dates.closing_date, edits.closingDate)
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
    )
  }
}

export default EditOpportunityTable
