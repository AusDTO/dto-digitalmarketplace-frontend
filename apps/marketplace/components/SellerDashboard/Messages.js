import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { getSupplierMessages } from 'marketplace/actions/MessagesActions'
import styles from './SellerDashboard.scss'

export class Messages extends Component {
  formatMessage = item => {
    const { message, links } = item

    let messages = [message]
    if (links) {
      Object.keys(links).forEach(link => {
        const temp = []
        messages.forEach(m => {
          if (m.split) {
            m.split(`{${link}}`).forEach((v, i, a) => {
              temp.push(v)
              if (a.length !== i + 1) {
                temp.push(<a href={links[link]}>{link}</a>)
              }
            })
          } else {
            temp.push(m)
          }
        })
        messages = temp
      })
    }
    return messages
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    const { supplier, messages } = this.props

    let items = []

    if (supplier.code) {
      if (messages) {
        items = [...messages.errors, ...messages.warnings]
      } else {
        this.props.getSupplierMessages(supplier.code)
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          {items ? (
            <table className={`${styles.resultListing} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={styles.colMessage}>
                    Notification
                  </th>
                  <th scope="col" className={styles.colSeverity}>
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={`item.${item.id}`}>
                    <td className={styles.colMessage}>{this.formatMessage(item)}</td>
                    <td className={styles.colSeverity}>{item.severity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            'No messages'
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loadedMessages: state.sellerDashboard.loadedMessages,
  currentlySending: state.app.currentlySending,
  supplier: state.sellerDashboard.supplier,
  messages: state.messages.data
})

const mapDispatchToProps = dispatch => ({
  getSupplierMessages: supplierCode => dispatch(getSupplierMessages(supplierCode))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
