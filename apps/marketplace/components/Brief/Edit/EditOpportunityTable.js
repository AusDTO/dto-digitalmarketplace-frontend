import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import format from 'date-fns/format'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { getClosingTime } from 'marketplace/components/helpers'
import { getSellersToInvite, itemWasEdited, getAllDocuments } from './helpers'

import styles from '../../../main.scss'

class EditOpportunityTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editClosingDateClicked: false,
      editSellersClicked: false,
      editTitleClicked: false
    }

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

    if (this.state.editTitleClicked) {
      return <Redirect to="/title" />
    }

    if (this.state.editSellersClicked) {
      return <Redirect to="/sellers" />
    }

    if (this.state.editClosingDateClicked) {
      return <Redirect to="/closing-date" />
    }

    return (
      <table className={`col-xs-12 ${styles.defaultStyle} ${styles.textAlignLeft}`}>
        <tbody>
          <tr>
            <th scope="row">Opportunity title</th>
            <td>{itemWasEdited(brief.title, edits.title) ? edits.title : brief.title}</td>
            <td>
              <AUbutton as="tertiary" onClick={() => this.setState({ editTitleClicked: true })}>
                Edit title
              </AUbutton>
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
                  <AUbutton as="tertiary" onClick={() => this.setState({ editSellersClicked: true })}>
                    {sellersToInvite.length > 0 ? 'Edit' : 'Add'} sellers
                  </AUbutton>
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
            <th scope="row">Documents</th>
            <td>
              {(getAllDocuments(brief).length > 0 || getAllDocuments(edits).length > 0) && (
                <ul>
                  {getAllDocuments(edits).length > 0
                    ? getAllDocuments(edits).map(document => (
                        <li key={document}>
                          <a href={`#${document}`}>{document}</a>
                        </li>
                      ))
                    : getAllDocuments(brief).map(document => (
                        <li key={document}>
                          <a href={`#${document}`}>{document}</a>
                        </li>
                      ))}
                </ul>
              )}
            </td>
            <td>
              <Link to="/documents" className="au-btn au-btn--tertiary">
                Edit documents
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
              <AUbutton as="tertiary" onClick={() => this.setState({ editClosingDateClicked: true })}>
                Extend closing date
              </AUbutton>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default EditOpportunityTable
