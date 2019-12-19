import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { getClosingTime } from 'marketplace/components/helpers'

import styles from '../../../main.scss'

const itemWasEdited = (item, edit) => edit !== '' && edit !== item

class EditOpportunityTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editSellersClicked: false,
      editTitleClicked: false
    }
  }

  render = () => {
    const { brief, edits, isOpenToAll, location } = this.props
    const sellersToInvite = Object.keys(edits.sellers).filter(code => !(code in brief.sellers))

    if (this.state.editTitleClicked) {
      return <Redirect to="/title" />
    }

    if (this.state.editSellersClicked) {
      return <Redirect to="/sellers" />
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
          {!isOpenToAll && (
            <React.Fragment>
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
                </tr>
              )}
            </React.Fragment>
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
          <tr>
            <th scope="row">Closing date</th>
            <td>
              <span>{format(getClosingTime(brief), 'dddd DD MMMM YYYY [at] ha')}</span>
            </td>
            <td>
              <a href={`${location.pathname}/closing-date`}>Extend closing date</a>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default EditOpportunityTable
